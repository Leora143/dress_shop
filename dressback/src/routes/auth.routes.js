const express = require("express");
// console.log("AUTH ROUTES LOADED");

const {
  register,
  login
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;