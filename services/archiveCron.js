const cron = require("node-cron");
const Notice = require("../models/Notice");

console.log("✅ archiveJob.js is loaded!");

const archiveNotices = async () => {
  try {
    console.log("Running archive job...");

    const now = new Date();
    const archiveTime = parseInt(process.env.ARCHIVE_TIME_MINUTES, 10) || 1440;

    const threshold = new Date(now.getTime() - archiveTime * 60 * 1000);

    const noticesToArchive = await Notice.find({
      autoArchive: true,
      archive: false,
      uploadedAt: { $lte: threshold },
    });

    console.log(noticesToArchive);

    for (const notice of noticesToArchive) {
      notice.archive = true;
      await notice.save();
    }

    console.log("Archive job complete!");
  } catch {
    console.error("Error in archive job:", error);
  }
};

cron.schedule(process.env.ARCHIVE_CRON_EXPRESSION || "0 * * * *", async () => {
  await archiveNotices();
});
// cron.schedule("* * * * *", () => {
//   console.log("🕐 Cron job is running every minute...");
// });

module.exports = archiveNotices;
