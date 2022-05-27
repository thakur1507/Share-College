const express = require("express");
const path = require("path");
const { getsingleBlog, getAllblogs, getAllnotices, getUpvote  }= require("../controllers/postcontroller");
const router = express.Router();
const auth = require("../middleware/auth");


router.get("/singleBlog/:id",auth.isauth,getsingleBlog);
router.get("/singleBlog/upvote/:id", getUpvote);
//router.get("/singleBlog/downvote/:id", getdownvote);
router.get("/blog", auth.isauth ,getAllblogs);
router.get("/notice", auth.isauth ,getAllnotices);


module.exports =router;