const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

});
const {uploadImage,} = require( "../controllers/upload.controller");

router.post(
  "/",
  upload.single("image"),
  uploadImage

);

module.exports = router;