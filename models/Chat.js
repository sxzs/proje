const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    chatdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = Chat = mongoose.model('chat', ChatSchema);