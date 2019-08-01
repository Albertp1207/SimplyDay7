const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    text: {
        type: String,
        required:true
    },
    index: {
        type: Number,
        required: false
    }
})


mongoose.model("todos",TodoSchema);