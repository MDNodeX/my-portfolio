import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    // Never trust the client-supplied filename directly — it can contain
    // path traversal sequences or collide with/overwrite another file.
    // Generate a unique, safe name and keep only the (validated) extension.
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
    cb(null, uniqueName);
  },
});

const allowedMimeTypes = ["image/png", "image/jpeg", "image/webp"];
const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeOk = allowedMimeTypes.includes(file.mimetype);
  const extOk = allowedExtensions.includes(ext);

  if (!mimeOk || !extOk) {
    return cb(new Error("Only PNG, JPG, and WEBP images are allowed"), false);
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB — prevents disk-filling uploads
  },
});

export default upload;
