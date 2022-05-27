const { create } = require("domain");
const express = require("express");
const path = require("path");
const { getPostInput,createPost } = require("../controllers/createcontroller");
const router = express.Router();
const {isauth} = require("../middleware/auth");
router.get("/create", isauth, getPostInput );


router.post("/create",isauth , createPost);
module.exports = router;