import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder automatically
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, "uploads/");
    },

    filename: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        Date.now() +
          "-" +
          file.originalname
      );
    },
  });

const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, JPG, JPEG, PNG files are allowed"
      )
    );
  }
};

const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },
});

export default upload;