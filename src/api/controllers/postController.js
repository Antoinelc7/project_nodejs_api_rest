const Post = require("../models/postModel");

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
    const newPost = new Post(req.body);
    try {
        const post = await newPost.save();
        res.status(201);
        res.json(post);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })
    }
}

exports.getAPost = async (req, res) => {
    try {

        const getPost = await Post.findById(req.params.postid);
        res.status(200);
        res.json(getPost);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." })

    }
}