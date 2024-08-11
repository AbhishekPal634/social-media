import db from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  //Check user if exists
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    if (result.rows.length) return res.status(409).json("User already exists.");
    //Create new user
    //Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    try {
      await db.query(
        "INSERT INTO users (username, email, password, name) VALUES ($1, $2, $3, $4)",
        [req.body.username, req.body.email, hashedPassword, req.body.name]
      );
      return res.status(200).json("User has been created.");
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    if (result.rows.length === 0) return res.status(404).json("User not found");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      result.rows[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: result.rows[0].id }, "secretkey"); //store secretkey in .env later

    const { password, ...others } = result.rows[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};
