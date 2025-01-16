import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export const getYoutubeVideos = async(query:string)=>{
    const params = {
        part: "snippet",
        maxResults: 1,
        q: query,
        type: "video",
        key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,  
    }
    const response = await axios.get(YOUTUBE_BASE_URL,{params});
    return response.data.items;
}