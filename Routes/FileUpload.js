const express = require("express");
const router = express.Router();

const { localFileUpload } = require("../controllers/fileUpload");
const { imageUpload } = require("../controllers/imageUpload");
const { imageFileReducer } = require("../controllers/imageFileReducer");
const { videoUpload } = require("../controllers/videoUpload");

router.post("/localFileUpload", localFileUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageUpload", imageUpload);
router.post("/imageUploadReducer", imageFileReducer);

module.exports = router;
