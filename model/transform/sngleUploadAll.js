const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const sharp = require("sharp");

function rastgeleTokenUretuzunluk(uzunluk) {
  return crypto.randomBytes(uzunluk).toString("hex");
}

const stronge = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/ProfilPicture/exstraImg"));
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

const uploadsAll = multer({
  storage: stronge,
  fileFilter: fileFilter,
}).array("files",20);




module.exports = { uploadsAll };
