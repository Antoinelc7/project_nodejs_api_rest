module.exports = (server) => {
    const postController = require("../controllers/postController");
    const commentaireRoute = require("../routes/commentRoute");
    
    server.route("/posts")
    .get(postController.listAllPosts)
    .post(postController.createAPost)

    server.route("/posts/:postId")
    .get(postController.getAPost)
    .put(postController.updateAPost)
    .delete(postController.deleteAPost);

    commentaireRoute(server);
}