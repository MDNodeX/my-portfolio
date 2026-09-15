import cloudinary from "../config/cloudinary.js";
import { mySqlDB } from "../config/db.js";
import bcryptjs from "bcryptjs";
import { handleError } from "../helpers/handleError.js";
import fs from "fs";

export const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const [rows] = await mySqlDB.query(
      "SELECT id, name, email, bio, avatar FROM users WHERE id = ?",
      [userId],
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User profile retrieved successfully",
      user: rows[0],
    });
  } catch (error) {
    return next(handleError(res, 500, error.message));
  }
};

// updateUser
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // FIX (security): previously ANY request could update ANY user's
    // profile by passing a different userId in the URL — no check that
    // the caller was updating their own account. This assumes an auth
    // middleware sets req.user on this route; if it doesn't yet, add it,
    // otherwise this will always fail closed (safe) rather than silently
    // being insecure.
    if (req.user.id !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
      });
    }

    const data = JSON.parse(req.body.data);

    // Fetch user first
    const [rows] = await mySqlDB.query(
      "SELECT id, name, email, bio, avatar FROM users WHERE id = ?",
      [userId],
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = rows[0];

    // Prepare updated fields
    const updatedFields = {
      name: data.name || user.name,
      email: data.email || user.email,
      bio: data.bio ?? user.bio, // allow empty string
    };

    if (data.password && data.password.length >= 8) {
      updatedFields.password = bcryptjs.hashSync(data.password);
    }

    if (req.file) {
      // FIX: previously this had a .catch() on the upload promise that
      // called next() once, but execution then fell through to the
      // safety-check below which could throw and call next() a SECOND
      // time — causing "Cannot set headers after they are sent". Now
      // any upload failure propagates once to the outer catch below.
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "swiftweb",
        resource_type: "auto",
      });

      if (!uploadResult || !uploadResult.secure_url) {
        throw new Error("Cloudinary upload failed, no secure_url returned");
      }
      updatedFields.avatar = uploadResult.secure_url;

      // FIX: clean up the local temp file after a successful upload —
      // previously this was never deleted, so the uploads/ folder would
      // grow unbounded over time.
      fs.unlinkSync(req.file.path);
    }

    // Build dynamic SET query
    const setQuery = Object.keys(updatedFields)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updatedFields);

    // Update database
    await mySqlDB.query(`UPDATE users SET ${setQuery} WHERE id = ?`, [
      ...values,
      userId,
    ]);

    // Fetch updated user
    const [updatedRows] = await mySqlDB.query(
      `SELECT id, name, email, bio, avatar, role, created_at, updated_at 
   FROM users WHERE id = ?`,
      [userId],
    );

    res.status(200).json({
      success: true,
      message: "Data updated",
      user: updatedRows[0],
    });
  } catch (error) {
    return next(handleError(res, 500, error.message));
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const [rows] = await mySqlDB.query(`
      SELECT 
        id,
        name,
        email,
        role,
        avatar,
        created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      users: rows,
      total: rows.length,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // FIX (security): same missing ownership check as updateUser — any
    // request could previously delete any account by ID.
    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this account",
      });
    }

    const [user] = await mySqlDB.query("SELECT id FROM users WHERE id = ?", [
      id,
    ]);

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mySqlDB.query("DELETE FROM users WHERE id = ?", [id]);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
