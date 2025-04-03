const catchAsync = require("../utils/catchAsync");
const Notice = require("../models/Notice");
const googleDriveService = require("../services/googleDriveService");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

exports.uploadFile = [
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const userFileName = req.body.fileName || req.file.originalname;

      const autoArchive = Boolean(req.body.autoArchive) || false;

      const { fileName, fileUrl } = await googleDriveService.uploadToDrive(
        req.file,
        userFileName
      );

      const fileData = new Notice({ fileName, fileLink: fileUrl, autoArchive });
      await fileData.save();

      res.status(201).json({ message: "File uploaded successfully", fileUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  },
];

exports.getNotices = catchAsync(async (req, resp) => {
  const notices = await Notice.find({ archive: false });
  resp.status(200).json({
    status: "success",
    results: notices?.length,
    data: {
      notices,
    },
  });
});

exports.archiveUnarchiveNotice = catchAsync(async (req, resp, next) => {
  const id = req.params.id;
  const { archive } = req.body;
  const notice = await Notice.findByIdAndUpdate(
    id,
    { archive },
    { new: true, runValidators: true }
  );

  if (!notice) {
    return next(new AppError(`Cannot find notice with id: ${id}`, 404));
  }
  resp.status(200).json({
    status: "success",
    data: {
      notice,
    },
  });
});
