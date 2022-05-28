
const { findByIdAndUpdate, findById } = require("../model/post");
const post = require("../model/post");

exports.getUpvote = async (req,res) =>{
     try{
        
         const id = req.params.id;
        const blog = await post.findById({_id: id});

        const userid = req.session.user._id;
        const newupvote = [];

        blog.upvote.map( id =>{
            if(userid.toString()!= id)
            {
                newupvote.push(id);
            }     
        });
        //console.log(newupvote);
        if(blog.upvote.length == newupvote.length)
        {
            blog.upvote.push(userid.toString());
        }
         else{
            blog.upvote = newupvote;
        }
       const updatedblog = await blog.save();
        //console.log(updatedblog);
        let data = await JSON.stringify({upvote:blog.upvote.length-1});
        res.send(data);
        
        //let data = JSON.stringify({upvote: updatedblog.upvote})
     } catch (err){
        res.render("error.ejs");
     }
};


// exports.getdownvote = async (req,res) =>{
//     try{
       
//         const id = req.params.id;
//        const blog = await post.findById({_id: id});
//        blog.downvote +=1;
//        const updatedblog = await blog.save();

//        let data = JSON.stringify({downvote: updatedblog.downvote})

//        res.send(data);

//     } catch (err){
//         console.log(err);
//     }
// };


exports.getsingleBlog = async (req, res) => {

    try {

        const id = req.params.id;
        
        const blog = await post.findById({ _id: id });
       
        res.render("singleBlog.ejs", {blog:blog});
    } catch (err) {
        res.render("error.ejs");
    }
};



exports.getAllblogs = async (req, res) => {

    try {

        const blogs = await post.find({ type: "Blog" });
        res.render("blog.ejs", { blogs });

    } catch (err) {
        res.render("error.ejs");
    }
};

exports.getAllnotices = async (req, res) => {
    try {
        const notices = await post.find({ type: "Notice" });
        res.render("notice.ejs", { notices });
    } catch (err) {
        res.render("error.ejs");
    }
};
