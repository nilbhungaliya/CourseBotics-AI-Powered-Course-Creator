import { CourseType } from "@/types/types";
import axios from "axios";

const redirectToDropboxOAuth = () => {
    const dropboxAuthUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DROPBOX_APP_KEY}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
    window.location.href = dropboxAuthUrl;
  };
  

const DROPBOX_APP_KEY = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY!;
const DROPBOX_APP_SECRET = process.env.NEXT_PUBLIC_DROPBOX_APP_SECRET!;
const DROPBOX_REFRESH_TOKEN = process.env.NEXT_PUBLIC_DROPBOX_REFRESH_TOKEN!;

// Function to refresh the Dropbox access token
const refreshDropboxAccessToken = async (): Promise<string> => {
    const isTokenValid = await checkRefreshTokenActive();
    console.log(isTokenValid);
    
    try {
        const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: DROPBOX_REFRESH_TOKEN,
            },
            auth: {
                username: DROPBOX_APP_KEY,
                password: DROPBOX_APP_SECRET,
            },
        });

        // If successful, return the new access token
        const newAccessToken = response.data.access_token;
        return newAccessToken;
    } catch (error) {
        console.error('Failed to refresh Dropbox access token:', error);
        throw new Error('Could not refresh Dropbox access token');
    }
};

const checkRefreshTokenActive = async (): Promise<boolean> => {
    try {
        const response = await axios.post('https://api.dropboxapi.com/oauth2/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: DROPBOX_REFRESH_TOKEN,
            },
            auth: {
                username: DROPBOX_APP_KEY,
                password: DROPBOX_APP_SECRET,
            },
        });

        // If we get a successful response, the refresh token is active
        console.log('Refresh token is active');
        return true;
    } catch (error:any) {
        // If the refresh fails, the refresh token is invalid or expired
        if (error.response && error.response.data) {
            const errorDescription = error.response.data.error_description;
            if (errorDescription && errorDescription.includes('invalid_grant')) {
                console.error('Refresh token is invalid or expired');
            }
        } else {
            console.error('Failed to check refresh token status:', error);
        }
        return false;
    }
};

export const uploadFilesToDropbox = async (file: Blob, courseInfo: CourseType) => {
    const fileName = `${Date.now()}-${courseInfo?.courseId!}-${courseInfo?.category}.jpg`;
    const DROPBOX_ACCESS_TOKEN = await refreshDropboxAccessToken(); // Use server-side only environment variable
    const DROPBOX_UPLOAD_URL = "https://content.dropboxapi.com/2/files/upload";
    const DROPBOX_SHARED_LINK_URL = "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings";

    if (!file || !courseInfo) {
        throw new Error("File or Course Information is missing");
    }

    try {
        // Step 1: Upload file to Dropbox
        const uploadResponse = await fetch(DROPBOX_UPLOAD_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                "Dropbox-API-Arg": JSON.stringify({
                    path: `/ai-course-generator/${fileName}`, // Destination path in Dropbox
                    mode: "add",
                    autorename: true,
                }),
                "Content-Type": "application/octet-stream",
            },
            body: file, // File Blob
        });

        if (!uploadResponse.ok) {
            const errorDetails = await uploadResponse.text();
            throw new Error(`Failed to upload file to Dropbox: ${errorDetails}`);
        }

        const uploadData = await uploadResponse.json();
        const dropboxFilePath = uploadData.path_display;

        // Step 2: Generate a shareable link
        const sharedLinkResponse = await fetch(DROPBOX_SHARED_LINK_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                path: dropboxFilePath,
                settings: {
                    requested_visibility: "public",
                },
            }),
        });

        if (!sharedLinkResponse.ok) {
            const errorDetails = await sharedLinkResponse.text();
            throw new Error(`Failed to generate shared link for file: ${errorDetails}`);
        }

        const sharedLinkData = await sharedLinkResponse.json();
        const sharedUrl = sharedLinkData.url.replace("?dl=0", "?raw=1"); // Convert to a direct link

        console.log("Dropbox File URL:", sharedUrl);

        const response = await axios.post(`/api/course/${courseInfo?.courseId}/uploadBanner`, {
            id: courseInfo?.id,
            fileUrl: sharedUrl,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Error during Dropbox upload process:", error);
        throw error; // Re-throw for further handling
    }
};
