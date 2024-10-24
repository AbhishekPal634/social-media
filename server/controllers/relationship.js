import db from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const q =
    "SELECT followeruserid FROM relationships WHERE followeduserid = $1";

  db.query(q, [req.query.followedUserId])
    .then((data) => {
      return res
        .status(200)
        .json(data.rows.map((relationship) => relationship.followeruserid));
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO relationships (followeruserid, followeduserid) VALUES ($1, $2)";
    const values = [userInfo.id, req.body.userId];

    db.query(q, values)
      .then(() => {
        return res.status(200).json("Following");
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM relationships WHERE followeruserid = $1 AND followeduserid = $2";

    db.query(q, [userInfo.id, req.query.userId])
      .then(() => {
        return res.status(200).json("Unfollowed");
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
};
