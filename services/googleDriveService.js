const { google } = require("googleapis");
const stream = require("stream");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Listen for token refresh events
oauth2Client.on("tokens", (tokens) => {
  if (tokens.access_token) {
    console.log("Access token refreshed:", tokens.access_token);
    process.env.GOOGLE_ACCESS_TOKEN = tokens.access_token; // Update in-memory access token
  }
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

// Ensure token is refreshed before every request
const ensureFreshAccessToken = async () => {
  try {
    console.log("Refreshing access token...");
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(credentials);
    console.log("Access token refreshed successfully.");
  } catch (error) {
    console.error("Failed to refresh access token:", error.message);
    throw error;
  }
};

exports.uploadToDrive = async (file, fileName) => {
  try {
    await ensureFreshAccessToken(); // Ensure token is fresh before uploading

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    console.log("Uploading to Drive...");

    const response = await drive.files.create({
      requestBody: {
        name: fileName || file.originalname,
        mimeType: file.mimetype,
        parents: [process.env.DRIVE_FOLDER_ID],
      },
      media: {
        mimeType: file.mimetype,
        body: bufferStream,
      },
    });

    const fileId = response.data.id;

    // Set file to be publicly accessible
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
    console.log("File uploaded successfully:", fileUrl);

    return { fileName: fileName || file.originalname, fileUrl };
  } catch (error) {
    console.error("Error uploading file:", error.message);
    throw error;
  }
};
