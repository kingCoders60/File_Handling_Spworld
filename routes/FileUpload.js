const express = require("express");
const router = express.Router();

const {localFileUpload,imageUpload} = require("../controllers/fileUpload");
const {videoUpload}=require('../controllers/videoController');

//api route
router.post("/localFileUpload",localFileUpload );
router.post("/imageUpload",imageUpload );
router.post("/videoUpload",videoUpload );

module.exports = router;

