import React, { useState, useEffect } from 'react';
import './BookPage.css';


// Component to display the list of books
const BookList = ({ books, onDelete }) => (
    <div className="book-list">
        {books.map((book) => (
            <div key={book._id} className="book-item">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Year:</strong> {book.year}</p>
                <button className="btn-danger" onClick={() => onDelete(book._id)}>Delete</button>
            </div>
        ))}
    </div>
);

// Component for the book addition form
const BookForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [year, setYear] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, author, isbn, year: parseInt(year) });
        setTitle('');
        setAuthor('');
        setIsbn('');
        setYear('');
    };
    return (
        <form className="book-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
            <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
            <button type="submit" className="btn-primary">Add Book</button>
        </form>
    );
}

// Main BookPage component
const BookPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/books');
            if (!response.ok) throw new Error('Failed to fetch books');
            const data = await response.json();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async (bookData) => {
        try {
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
            if (!response.ok) throw new Error('Failed to add book');
            await fetchBooks();
            setShowForm(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/books/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete book');
            await fetchBooks();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="book-page">
            <header className="page-header">
                <h1>Book Management</h1>
                <br />
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Book'}
                </button>
            </header>

            {error && <div className="error-message">{error}</div>}

            {showForm && <BookForm onSubmit={handleAddBook} />}

            {loading ? (
                <div className="loading">Loading books...</div>
            ) : (
                <BookList books={books} onDelete={handleDeleteBook} />
            )}
        </div>
    );
};

export default BookPage;