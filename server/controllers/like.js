import db from "../connect.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const getLikes = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT "userid" FROM likes WHERE "postid" = $1`,
      [req.query.postid]
    );
    return res.status(200).json(result.rows.map((like) => like.userid));
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addLike = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json("Token not valid!");
    try {
      await db.query(`INSERT INTO likes ("userid", "postid") VALUES ($1, $2)`, [
        userInfo.id,
        req.body.postid,
      ]);
      return res.status(200).json("Post Liked!");
    } catch (error) {
      return res.status(500).json("Internal Server Error: " + error.message);
    }
  });
};

export const deleteLike = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, process.env.SECRET_KEY, async (error, userInfo) => {
    if (error) return res.status(403).json("Token not valid!");
    try {
      await db.query(
        `DELETE FROM likes WHERE "userid" = $1 AND "postid" = $2`,
        [userInfo.id, req.query.postid]
      );
      return res.status(200).json("Like Removed!");
    } catch (error) {
      return res.status(500).json("Internal Server Error: " + error.message);
    }
  });
};
