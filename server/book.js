import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
});

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;