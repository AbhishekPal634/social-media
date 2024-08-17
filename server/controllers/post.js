import moment from "moment/moment.js";
import jwt from "jsonwebtoken";
import db from "../connect.js";

// Retrieve posts
export const getPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (error, userInfo) => {
    if (error) return res.status(403).json("Token not valid!");
    try {
      const data = await db.query(
        `SELECT p.*, u.id AS "userid", u.name, u."profilepic" 
         FROM posts AS p 
         JOIN users AS u ON (u.id = p."userid") 
         LEFT JOIN relationships AS r ON (p."userid" = r."followeduserid") 
         WHERE r."followeruserid" = $1 OR p."userid" = $2 
         ORDER BY p."createdat" DESC`,
        [userInfo.id, userInfo.id]
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  });
};

// Add a post
export const addPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (error, userInfo) => {
    if (error) return res.status(403).json("Token not valid!");
    try {
      const data = await db.query(
        `INSERT INTO posts ("desc", img, "createdat", "userid") 
         VALUES ($1, $2, $3, $4)`,
        [
          req.body.desc,
          req.body.img,
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          userInfo.id,
        ]
      );
      return res.status(200).json("Posted Successfully!");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  });
};
