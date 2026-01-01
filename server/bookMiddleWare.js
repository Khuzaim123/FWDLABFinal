import BookModel from "./book.js";

export const bookMiddleware = async (req , res, next) => {
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    next();
}