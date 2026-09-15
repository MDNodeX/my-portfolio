import { handleError } from "../helpers/handleError.js";
import { mySqlDB } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation so missing fields fail with a clear 400 instead
    // of an opaque 500 from bcrypt.hash(undefined).
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Check if user exists
    const [rows] = await mySqlDB.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length > 0) {
      return next(handleError(res, 400, "User already exists"));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const id = uuidv4();
    // Insert user into database
    const [result] = await mySqlDB.query(
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)",
      [id, name, email, hashedPassword],
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      userId: id,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [rows] = await mySqlDB.query(
      "SELECT id, name, email, password, role, avatar, is_verified, created_at FROM users WHERE email = ?",
      [email],
    );

    if (!rows || rows.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 3600000, // 1 hour
    });

    // FIX: removed the duplicate/undefined "user: newUser" key that was
    // throwing a ReferenceError on every successful login.
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.is_verified,
      },
      accessToken: token,
      expiresIn: "1h",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//google login
// TODO (flagged, not changed): this endpoint trusts name/email/avatar
// straight from the request body with no verification that the caller
// actually authenticated with Google. Anyone can POST an arbitrary email
// and receive a valid session for that account. Recommend verifying a
// real Google ID token server-side (e.g. via google-auth-library) before
// trusting these fields — let me know and I'll wire that in.
export const GoolgleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;
    const [rows] = await mySqlDB.query(
      "SELECT id, name, email, password, role, avatar, is_verified, created_at FROM users WHERE email = ?",
      [email],
    );
    //create new user if not exists
    let user;
    if (!rows || rows.length === 0) {
      // FIX: Math.random() is not cryptographically secure. Use crypto
      // for the placeholder password on Google-created accounts.
      const password = crypto.randomBytes(16).toString("hex");
      const hashPassword = bcrypt.hashSync(password);
      const [result] = await mySqlDB.query(
        "INSERT INTO users (id, name, email, password, avatar) VALUES (?, ?, ?, ?, ?)",
        [uuidv4(), name, email, hashPassword, avatar],
      );
      user = {
        id: result.insertId,
        name,
        email,
        avatar,
        role: null,
        is_verified: 0,
      };
    } else {
      user = rows[0];
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.is_verified,
      },
      accessToken: token,
      expiresIn: "1h",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GitHub login — same database flow as Google login

export const GithubFirebaseLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "GitHub email is required",
      });
    }

    const [rows] = await mySqlDB.query(
      "SELECT id, name, email, role, avatar, is_verified FROM users WHERE email = ?",
      [email],
    );

    let user;

    if (!rows || rows.length === 0) {
      const id = uuidv4();

      const password = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(password, 10);

      await mySqlDB.query(
        "INSERT INTO users (id, name, email, password, avatar) VALUES (?, ?, ?, ?, ?)",
        [id, name, email, hashedPassword, avatar],
      );

      user = {
        id,
        name,
        email,
        avatar,
        role: null,
        is_verified: 0,
      };
    } else {
      user = rows[0];
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 3600000,
    });

    return res.status(200).json({
      success: true,
      message: "GitHub login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.is_verified,
      },
      accessToken: token,
      expiresIn: "1h",
    });
  } catch (error) {
    console.error("GitHub login error:", error);
    next(handleError(res, 500, error.message));
  }
};

//logout
export const Logout = async (req, res, next) => {
  try {
    // Attempt to read token for logging (optional)
    const token = req.cookies.access_token;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        // Token invalid/expired — ignore
      }
    }

    // Clear cookie anyway
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
