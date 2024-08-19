import db from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";

export const getComments = async (req, res) => {
  try {
    const data = await db.query(
      `SELECT c.*, u.id AS "userid", u.name, u."profilepic" 
         FROM comments AS c 
         JOIN users AS u ON (u.id = c."userid") 
         WHERE c."postid" = $1 
         ORDER BY c."createdat" DESC`,
      [req.query.postid]
    );
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const addComment = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (error, userInfo) => {
    if (error) return res.status(403).json("Token not valid!");
    try {
      const data = await db.query(
        `INSERT INTO comments ("desc", "createdat", "userid", "postid") 
         VALUES ($1, $2, $3, $4)`,
        [
          req.body.desc,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          userInfo.id,
          req.body.postid,
        ]
      );
      return res.status(200).json("Comment added Successfully!");
    } catch (error) {
      return res.status(500).json("Internal Server Error: " + error.message);
    }
  });
};
