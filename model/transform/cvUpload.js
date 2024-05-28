const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const sharp = require("sharp");

function rastgeleTokenUretuzunluk(uzunluk) {
  return crypto.randomBytes(uzunluk).toString("hex");
}

const stronge = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/cv"));
  },
  filename: async (req, file, cb) => {
    const uniqueSuffix = rastgeleTokenUretuzunluk(10);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const uploads = multer({
  storage: stronge,
  fileFilter: fileFilter,
}).single("file");




module.exports = { uploads };
