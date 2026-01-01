import mongoose from "mongoose";


// Define the schema for Book
const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    isbn: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
});

// Create the Book model
const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;