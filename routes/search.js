const express = require("express");
const path = require("path");
const { getsearchcontroller, getsearchresults } = require("../controllers/searchcontroller");
const { isauth } = require("../middleware/auth");
const router = express.Router();

router.get("/search",isauth, getsearchcontroller);
router.post("/search",isauth, getsearchresults);

module.exports =router;