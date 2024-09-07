import db from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const userId = req.params.userId; // Ensure the case matches the route parameter

  try {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    const { password, ...others } = result.rows[0]; // Omit password from the response
    return res.json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
};
