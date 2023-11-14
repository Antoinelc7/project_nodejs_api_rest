module.exports = (server) => {
    const commentaireController = require("../controllers/commentController");

    server.route("/posts/:post_id/comments")
    .get(commentaireController.listAllComments)
    .post(commentaireController.createAComment);
    
    server.route("/comments/:comment_id")
    .get(commentaireController.getAComment)
    .put(commentaireController.updateAComment)
    .delete(commentaireController.deleteAComment);
}