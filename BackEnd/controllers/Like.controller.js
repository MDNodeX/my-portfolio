import { handleError } from "../helpers/handleError.js";
import { mySqlDB } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// NOTE (flagged, not changed): user_id is taken from req.body rather
// than the authenticated user (req.user.id). If liking requires login,
// switch to req.user.id so a client can't like/unlike as someone else.

export const doLike = async (req, res, next) => {
  try {
    const { blog_id, user_id } = req.body;

    if (!blog_id || !user_id) {
      return res.status(400).json({ message: "blog_id and user_id required" });
    }

    const [like] = await mySqlDB.query(
      "SELECT id FROM likes WHERE blog_id = ? AND user_id = ?",
      [blog_id, user_id],
    );

    // FIX: the toggle outcome is fully determined by whether `like`
    // existed before the mutation, so we no longer need to re-query
    // for isUserLiked afterward — saves one DB round trip per request.
    let isUserLiked;
    if (like.length === 0) {
      const id = uuidv4();
      await mySqlDB.query(
        "INSERT INTO likes (id, blog_id, user_id) VALUES (?, ?, ?)",
        [id, blog_id, user_id],
      );
      isUserLiked = true;
    } else {
      await mySqlDB.query(
        "DELETE FROM likes WHERE blog_id = ? AND user_id = ?",
        [blog_id, user_id],
      );
      isUserLiked = false;
    }

    const [total] = await mySqlDB.query(
      "SELECT COUNT(*) AS likeCount FROM likes WHERE blog_id = ?",
      [blog_id],
    );

    res.status(200).json({
      likeCount: total[0].likeCount,
      isUserLiked,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};

export const likeCount = async (req, res, next) => {
  try {
    const { blog_id, user_id } = req.params;

    const [total] = await mySqlDB.query(
      "SELECT COUNT(*) AS likeCount FROM likes WHERE blog_id = ?",
      [blog_id],
    );

    let isUserLiked = false;
    if (user_id) {
      const [userLike] = await mySqlDB.query(
        "SELECT id FROM likes WHERE blog_id = ? AND user_id = ?",
        [blog_id, user_id],
      );
      isUserLiked = userLike.length > 0;
    }

    res.status(200).json({
      likeCount: total[0].likeCount,
      isUserLiked,
    });
  } catch (error) {
    next(handleError(res, 500, error.message));
  }
};
