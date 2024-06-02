const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const sharp = require("sharp");

function rastgeleTokenUretuzunluk(uzunluk) {
  return crypto.randomBytes(uzunluk).toString("hex");
}

const stronge = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/ProfilPicture/profileImg"));
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

const img = multer({
  storage: stronge,
  fileFilter: fileFilter,
}).single("profile");



const strongeBanner = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/ProfilPicture/banner"));
    },
    filename: async (req, file, cb) => {
      const uniqueSuffix = rastgeleTokenUretuzunluk(10);
      const fileExtension = path.extname(file.originalname);
      cb(null, uniqueSuffix + fileExtension);
    },
  });
  
  const fileFilterBanner = (req, file, cb) => {
    cb(null, true);
  };
  
  const imgBanner = multer({
    storage: strongeBanner,
    fileFilter: fileFilterBanner,
  }).single("banner");
  
  const strongeAll = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/ProfilPicture/extstraImg"));
    },
    filename: async (req, file, cb) => {
      const uniqueSuffix = rastgeleTokenUretuzunluk(10);
      const fileExtension = path.extname(file.originalname);
      cb(null, uniqueSuffix + fileExtension);
    },
  });
  
  const fileFilterAll = (req, file, cb) => {
    cb(null, true);
  };
  
  const imgAll = multer({
    storage: strongeAll,
    fileFilter: fileFilterAll,
  }).array("imgall",20);



  const strongecv = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../public/cv"));
    },
    filename: async (req, file, cb) => {
      const uniqueSuffix = rastgeleTokenUretuzunluk(10);
      const fileExtension = path.extname(file.originalname);
      cb(null, uniqueSuffix + fileExtension);
    },
  });
  
  const fileFiltercv = (req, file, cb) => {
    cb(null, true);
  };
  
  const uploadcv = multer({
    storage: strongecv,
    fileFilter: fileFiltercv,
  }).single("cv");




module.exports = { img, imgBanner, imgAll, uploadcv };
