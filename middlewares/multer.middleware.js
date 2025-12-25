const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads/products");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG/PNG images allowed"));
    }
    cb(null, true);
  }
});

module.exports = upload;



































// const multer = require("multer");
// const path = require("path");

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   // fileFilter: (req, file, cb) => {
//   //   const allowed = ["image/jpeg", "image/png", "image/jpg"];
//   //   if (!allowed.includes(file.mimetype)) {
//   //     return cb(new Error("Only JPG/PNG images allowed"));
//   //   }
//   //   cb(null, true);
//   // },
// });

// module.exports = upload;
