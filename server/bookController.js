import BookModel from "./book.js";

export const addBook = async (req, res) => {
    try {
        const book = req.body;
        const newBook = new BookModel(book);
        await newBook.save();
        res.status(201).json(newBook);
        console.log("Book Added Sucessfully");
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log("Unsucessfull")
    }
};

export const getBooks = async (req, res) => {
    try {
        const books = await BookModel.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteBook = async (req , res) => {
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Book Deleted Successfully"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};