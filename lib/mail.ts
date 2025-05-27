import { Resend } from "resend";

// Log API key presence (not the actual key) for debugging
console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY);
console.log("FROM_EMAIL_ADDRESS:", process.env.FROM_EMAIL_ADDRESS);

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML email templates
const createVerificationEmailHtml = (link: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .container { padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
    .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .content { padding: 20px 0; }
    .button { display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; margin: 20px 0; }
    .footer { padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p>Thank you for registering with CourseBotics. Please verify your email address by clicking the button below:</p>
      <div style="text-align: center;">
        <a href="${link}" class="button">Verify Email Address</a>
      </div>
      <p>Or copy and paste this link into your browser:</p>
      <p style="word-break: break-all;">${link}</p>
      <p>This link will expire in 60 minutes.</p>
    </div>
    <div class="footer">
      <p>If you did not request this email, you can safely ignore it.</p>
      <p>&copy; ${new Date().getFullYear()} CourseBotics. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const createPasswordResetEmailHtml = (link: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .container { padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
    .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .content { padding: 20px 0; }
    .button { display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; margin: 20px 0; }
    .footer { padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset</h1>
    </div>
    <div class="content">
      <p>You requested to reset your password. Click the button below to create a new password:</p>
      <div style="text-align: center;">
        <a href="${link}" class="button">Reset Password</a>
      </div>
      <p>Or copy and paste this link into your browser:</p>
      <p style="word-break: break-all;">${link}</p>
      <p>This link will expire in 60 minutes.</p>
      <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CourseBotics. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const createTwoFactorEmailHtml = (token: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Two-Factor Authentication Code</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .container { padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; }
    .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .content { padding: 20px 0; }
    .code { font-size: 32px; font-weight: bold; text-align: center; letter-spacing: 4px; margin: 20px 0; color: #4F46E5; }
    .footer { padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Two-Factor Authentication</h1>
    </div>
    <div class="content">
      <p>Your two-factor authentication code is:</p>
      <div class="code">${token}</div>
      <p>This code will expire in 10 minutes.</p>
      <p>If you did not request this code, please ignore this email or contact support if you have concerns about your account security.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} CourseBotics. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const sendVarificationEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXT_PUBLIC_DOMAIN}/new-verification?token=${token}`;
  
  try {
    // For testing purposes, you can uncomment this line to send to your email instead
    // const recipientEmail = 'neelbhungaliya2004@gmail.com';
    const recipientEmail = email; // Use the provided email address
    
    console.log("Attempting to send verification email to:", {recipientEmail});
    
    // Validate email format
    if (!recipientEmail || !recipientEmail.includes('@')) {
      throw new Error(`Invalid email address: ${recipientEmail}`);
    }
    
    const { data, error } = await resend.emails.send({
      from: `CourseBotics <${process.env.FROM_EMAIL_ADDRESS}>`,
      to: [recipientEmail], // Always use array format for consistency
      subject: "Verify Your Email Address",
      html: createVerificationEmailHtml(link),
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(`Error sending email: ${error.name} - ${error.message}`);
    }
    
    console.log("Email sent successfully:", data);
    return data;
  } catch (error: any) {
    console.error("Exception in sendVarificationEmail:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendResendPasswordEmail = async (email: string, token: string) => {
  const link = `${process.env.NEXT_PUBLIC_DOMAIN}/new-password?token=${token}`;
  
  try {
    // For testing purposes, you can uncomment this line to send to your email instead
    // const recipientEmail = 'neelbhungaliya2004@gmail.com';
    const recipientEmail = email; // Use the provided email address
    
    console.log("Attempting to send password reset email to:", recipientEmail);
    
    // Validate email format
    if (!recipientEmail || !recipientEmail.includes('@')) {
      throw new Error(`Invalid email address: ${recipientEmail}`);
    }
    
    const { data, error } = await resend.emails.send({
      from: `CourseBotics <${process.env.FROM_EMAIL_ADDRESS}>`,
      to: [recipientEmail], // Always use array format for consistency
      subject: "Reset Your Password",
      html: createPasswordResetEmailHtml(link),
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(`Error sending email: ${error.name} - ${error.message}`);
    }
    
    console.log("Password reset email sent successfully:", data);
    return data;
  } catch (error: any) {
    console.error("Exception in sendResendPasswordEmail:", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  try {
    // For testing purposes, you can uncomment this line to send to your email instead
    // const recipientEmail = 'neelbhungaliya2004@gmail.com';
    const recipientEmail = email; // Use the provided email address
    
    console.log("Attempting to send 2FA email to:", recipientEmail);
    
    // Validate email format
    if (!recipientEmail || !recipientEmail.includes('@')) {
      throw new Error(`Invalid email address: ${recipientEmail}`);
    }
    
    const { data, error } = await resend.emails.send({
      from: `CourseBotics <${process.env.FROM_EMAIL_ADDRESS}>`,
      to: [recipientEmail], // Always use array format for consistency
      subject: "Your Two-Factor Authentication Code",
      html: createTwoFactorEmailHtml(token),
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(`Error sending email: ${error.name} - ${error.message}`);
    }
    
    console.log("2FA email sent successfully:", data);
    return data;
  } catch (error: any) {
    console.error("Exception in sendTwoFactorEmail:", error);
    throw new Error(`Failed to send 2FA email: ${error.message}`);
  }
};
