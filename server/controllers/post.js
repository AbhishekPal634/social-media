import { db } from "../connect.js";

export const getPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (error, userInfo) => {
    if (error) return res.status(403).json("Token not valid!");
    try {
      const data = await db.query(
        "SELECT p.*, u.id AS userId, u.name, u.profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = $1 OR p.userId = $2 ORDER BY p.createdAt DESC",
        [userInfo.id, userInfo.id]
      ); //check query later
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
};
