const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const pool = require("../db");
const secretKey = "ZhQrZ951";

const userLogin = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let isValidPassword = false;
  let checkEmail;

  try {
    checkEmail = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);

    let adminResult = await pool.query("SELECT * FROM admin where email = $1", [
      email,
    ]);

    if (checkEmail.rows.length === 0 && adminResult.rows.length) {
      const error = new HttpError(
        "Invalid credentials, could not log you in.",
        403
      );
      return next(error);
    }

    try {
      isValidPassword = await bcrypt.compare(
        password,
        adminResult.rows[0].password
      );
    } catch (err) {
      const error = new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      );
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in....",
      403
    );
    return next(error);
  }

  //Add JWT token
  let token;
  try {
    token = jwt.sign({ email: email }, secretKey, {
      expiresIn: "1h",
    });
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  adminResult.rows[0].token = token;
  res.json(adminResult.rows);
};

exports.userLogin = userLogin;
