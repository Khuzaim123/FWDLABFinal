import express from "express";
import {
    addBook,
    getBooks,
    deleteBook
} from './bookController.js';


// DEfine router for book routes
const router = express.Router();

router.post('/', addBook);
router.get('/', getBooks);
router.delete('/:id', deleteBook);

export default router;