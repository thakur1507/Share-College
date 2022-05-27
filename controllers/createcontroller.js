const Post = require("../model/post");

exports.getPostInput =(req,res) =>{
    res.render("create.ejs");
};

exports.createPost = async (req, res) => {  
    
    
    try{
        
        let words = req.body.content.split(" ");
        let hashtag =words.filter(st => st.startsWith( "#"));
         
        
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            type: req.body.category,
            author: req.session.user.username,
            date: new Date(),
            upvote: 0,
            downvote: 0,
            hashtags:hashtag,
        });

        console.log(post);
        
       if(req.body.category =="Blog")
         res.redirect("/blog");
        else
          res.redirect("/notice"); 

    }catch (err){
        console.log(err);
    }
};
