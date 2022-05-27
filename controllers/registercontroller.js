
const User = require("../model/user");
const bcrypt = require ('bcrypt');
const { findOne } = require("../model/user");

exports.logoutcontroller = async (req,res) =>{
    
   await req.session.destroy();
    res.redirect("/");
};


exports.postsigup = async (req,res) =>{
    let fullname = req.body.fname +' '+ req.body.lname , email = req.body.email , password = req.body.password;
    console.log(fullname,password,email);
    
    let check = User.findOne({email});

    if(check){
        await req.flash('message', "user already exists");
        res.redirect("/login");
    }
    else{

    let username = email.split("@")[0];

    let hashedpassword = await bcrypt.hash(password, 12);
    console.log(hashedpassword);
try{
    const user = await User.create({
        name : fullname,
        email,
        password : hashedpassword,
        admin: true,
        username,
        posts: [{}],
    });
    

    req.session.isloggedIn =true;
    req.session.user = user;
}catch (err){
    console.log(err);
}
    res.redirect("/");
};
};
exports.postlogin = async (req,res) =>{
    let username = req.body.email.split("@")[0];
    try{
    let user =  await User.findOne({username});

    if(user)
    {
        let hashedpassword = user.password , password = req.body.password;
        const result =  await bcrypt.compare(password, hashedpassword);
       if(result){
        req.session.isloggedIn = true;
        req.session.user = user;
        res.redirect("/");
       }
       else{
         await req.flash('message', "Invalid password");
         res.redirect("/login");
       }
    }
    else{
        await req.flash('message', "Invalid username");
        res.redirect("/login");
    }
  } catch(err)
     {
         console.log(err);
     }
};

exports.logincontroller = async (req,res) =>{
   const csrfToken = req.csrfToken(); 
    const message = await req.consumeFlash('message');
    res.render("login.ejs",{message:message[0]});
};

exports.signupcontroller = (req,res) =>{
    res.render("signup.ejs");
};





