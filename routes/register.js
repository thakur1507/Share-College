const express = require("express");
const req = require("express/lib/request");
const { route } = require("express/lib/application");
const path = require("path");
const {logincontroller , signupcontroller , postlogin , postsigup , logoutcontroller} = require("../controllers/registercontroller");
const { isauth } = require("../middleware/registerAuth");
const router = express.Router();

router.get("/login", isauth,logincontroller);

router.get("/signup",isauth,signupcontroller);

router.post("/signup",isauth,postsigup);
router.post("/login",isauth,postlogin);

router.get("/logout",logoutcontroller);
module.exports = router;