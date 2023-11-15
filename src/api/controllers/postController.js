const Post = require("../models/postModel");
const textApiProvider = require("../providers/textApiProvider");

exports.listAllPosts = async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200);
        res.json(posts);

    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.createAPost = async (req, res) => {
    try{
        const newPost = new Post(req.body);

        let randomTextPromise = textApiProvider.getRandomText();
        let response = await randomTextPromise;

        if(!newPost.content){
            newPost.content = response;
        }

        let post = await newPost.save();
        res.status(201).json(post);
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Requete invalide." })
    }
}

exports.getAPost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.postId);

        if (!post) {
            res.status(404);
            res.json({ message: "Post not found." });
            return;
        }

        res.status(200);
        res.json(post);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });

    }
}

exports.updateAPost = async (req, res) => {
    try {

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true }
        );

        if (!updatedPost) {
            res.status(404);
            res.json({ message: "Post not found." });
            return;
        }

        res.status(200);
        res.json(updatedPost);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });

    }
}

exports.deleteAPost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);

        if (!deletedPost) {
            res.status(404);
            res.json({ message: "Post not found." });
            return;
        }

        res.status(204);
        res.json({ message: "Post deleted successfully." });

    } catch (error) {
        
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });
    }
}