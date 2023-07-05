const express = require("express");
const controllers = require("../controllers/admin");

const router = express.Router();

router.post("/login", controllers.userLogin);

module.exports = router;
