const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cartify-Product-images", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExt = file.originalname.split(".").pop(); // Get file extension
      return `${uniqueSuffix}.${fileExt}`;
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
