const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentaireSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post', // Référence au modèle Post pour établir une relation
        required: true
    }
});

module.exports = mongoose.model('Commentaire', commentaireSchema);