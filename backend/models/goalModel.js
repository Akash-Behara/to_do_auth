const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    goal: {
        type: String,
        required: [true, "Please fill in the goal"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);