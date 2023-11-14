const Commentaire = require("../models/commentModel");

exports.listAllComments = async (req, res) => {
    try {

        const comments = await Commentaire.find({ post_id: req.params.post_id });
        res.status(200);
        res.json(comments);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });

    }
};

exports.createAComment = async (req, res) => {
    const newComment = new Commentaire({
        name: req.body.name,
        message: req.body.message,
        post_id: req.params.post_id
    });

    try {

        const comment = await newComment.save();
        res.status(201);
        res.json(comment);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });

    }
};

exports.getAComment = async (req, res) => {
    try {

        const comment = await Commentaire.findById(req.params.comment_id);

        if (!comment) {
            res.status(404);
            res.json({ message: "Comment not found." });
            return;
        }

        res.status(200);
        res.json(comment);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });

    }
};

exports.updateAComment = async (req, res) => {
    try{

        const updatedComment = await Commentaire.findByIdAndUpdate(
            req.params.comment_id, 
            req.body,
            {new: true}
        );
        
        if(!updatedComment){
            res.status(404);
            res.json({message: "Comment not found."});
            return;
        }
        
        res.status(200);
        res.json(updatedComment);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });

    }
};

exports.deleteAComment = async (req, res) => {
    try{
        
        const deletedComment = await Commentaire.findByIdAndDelete(req.params.comment_id);
        
        if(!deletedComment){
            res.status(404);
            res.json({message: "Comment not found."});
            return;
        }
        
        res.status(200);
        res.json(deletedComment);

    } catch (error) {

        res.status(500);
        console.log(error);
        res.json({ message: "Erreur serveur." });

    }
}