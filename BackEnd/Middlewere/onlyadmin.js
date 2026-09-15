import JWT from "jsonwebtoken";
export const OnlyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decodeToken = JWT.verify(token, process.env.JWT_SECRET);

    if (decodeToken.role === "admin") {
      req.user = decodeToken;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log("OnlyAdmin error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// import JWT from "jsonwebtoken";
// export const OnlyAdmin = async (req, res, next) => {
//   try {
//     const token = req.cookies.access_token;
//     if (!token) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }
//     const decodeToken = JWT.verify(token, process.env.JWT_SECRET);

//     if (decodeToken.role === "admin") {
//       req.user = decodeToken;
//       next();
//     } else {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
