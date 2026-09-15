import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

// Fail fast at startup instead of silently misbehaving later if a
// Cloudinary env var is missing or misnamed.
const requiredEnvVars = [
  "CLOUDINARY_APP_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];
const missing = requiredEnvVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(
    `Missing required Cloudinary env vars: ${missing.join(", ")}`,
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // always return https URLs for uploaded assets
});

export default cloudinary;
