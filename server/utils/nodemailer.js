const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();

const OAuth2 = google.auth.OAuth2;

// Create OAuth2 client
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

// Set credentials (refresh token)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Function to get access token asynchronously
const getAccessToken = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    return accessToken;
  } catch (error) {
    console.error("Error retrieving access token:", error.message);
    throw error;
  }
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: getAccessToken(), // Use async function to get access token
  },
});

module.exports = transporter;
