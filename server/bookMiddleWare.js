import BookModel from "./book.js";

// Middleware to requests and fetch all books
export const bookMiddleware = async (req , res, next) => {
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    next();
}