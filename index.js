const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const mongoDBstore = require("connect-mongodb-session")(session);
const { flash } = require('express-flash-message');
const csrf = require("csurf");

const Post = require("./model/post.js");
const PORT = process.env.PORT || 3000;

const registerRoutes = require('./routes/register');
const postRoutes = require('./routes/post');
const createRoutes = require('./routes/create');
const searchRoutes = require('./routes/search');
const profileRoutes = require('./routes/profile');
const res = require("express/lib/response");
//const { render } = require("express/lib/response");
const req = require("express/lib/request");

//const { nextTick } = require("process");

const mongoDB_URI = "mongodb://localhost:27017/collegeApp";



const store = new mongoDBstore({
    uri: mongoDB_URI,
    collection: 'sessions',
});

const csrfProtection = csrf();

app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));     // allow to use the public file in the views folder 

app.use(session({ secret: 'my secret code', resave: false, saveUninitialized: false, store: store }));

app.set("view engine", "ejs");

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.isloggedIn = req.session.isloggedIn;

    if (req.session.user) {
        res.locals.username = req.session.user.username;
    }
    res.locals.csrfToken = req.csrfToken();
    next();
});


app.use(registerRoutes);
app.use(createRoutes);
app.use(postRoutes);
app.use(searchRoutes);
app.use(profileRoutes);


app.get("/", async (req, res) => {
    try {
        const blogs = await Post.find({ type: "Blog" });
        const notices = await Post.find({ type: "Notice" });
        res.render("home.ejs", { blogs, notices });
    } catch (err) {
        res.render("error.ejs");
    }
});


app.listen(PORT, () => {
    console.log("Listening at 3000")
});

mongoose.connect(mongoDB_URI, () => {
    console.log("connected to db");
});