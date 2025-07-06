import React, { useState, useEffect } from 'react';
import { libraryBooks, getBookCategories, searchBooks } from '../../data/libraryData';
import './Library.css';

const Library = () => {
    const [books, setBooks] = useState(libraryBooks);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showAllBooks, setShowAllBooks] = useState(false);
    const categories = getBookCategories();

    useEffect(() => {
        let filteredBooks;
        if (searchTerm.trim() === '' && selectedCategory === 'All') {
            filteredBooks = libraryBooks;
        } else if (searchTerm.trim() === '') {
            filteredBooks = libraryBooks.filter(book => book.category === selectedCategory);
        } else {
            const results = searchBooks(searchTerm);
            filteredBooks = selectedCategory !== 'All' ? 
                results.filter(book => book.category === selectedCategory) : 
                results;
        }
        setBooks(filteredBooks);
    }, [searchTerm, selectedCategory]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="library-container">
            <div className="library-header">
                <h1>Campus Library</h1>
                <p>Browse and discover books available in our campus library</p>
                <div className="library-controls">
                    <div className="category-select">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="category-dropdown"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search books..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        <div className="search-icon">
                            <i className="ri-search-line"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="books-container">
                <div className="books-grid">
                    {books.length > 0 ? (
                        (showAllBooks ? books : books.slice(0, 3)).map((book) => (
                            <div key={book.id} className="book-card">
                                <div className="book-cover">
                                    <img src={book.coverImage} alt={book.title} />
                                    <div className={`availability-badge ${book.available ? 'available' : 'unavailable'}`}>
                                        {book.available ? 'Available' : 'Checked Out'}
                                    </div>
                                </div>
                                <div className="book-content">
                                    <h3 className="book-title">{book.title}</h3>
                                    <p className="book-author">by {book.author}</p>
                                    <div className="book-details">
                                        <div className="book-year">
                                            <span className="icon">📅</span>
                                            {book.publishYear}
                                        </div>
                                        <div className="book-category">
                                            <span className="icon">📚</span>
                                            {book.category}
                                        </div>
                                    </div>
                                    <p className="book-location">
                                        <span className="icon">📍</span>
                                        {book.location}
                                    </p>
                                    <p className="book-description">{book.description.substring(0, 100)}...</p>
                                    <button className="borrow-btn">
                                        {book.available ? 'Borrow Book' : 'Join Waitlist'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <i className="ri-book-2-line empty-icon"></i>
                            <h3>No books found</h3>
                            <p>Try adjusting your search or category filter</p>
                        </div>
                    )}
                </div>
                {!showAllBooks && books.length > 3 && (
                    <div className="show-all-container">
                        <button className="show-all-btn" onClick={() => setShowAllBooks(true)}>
                            Show All Books ({books.length})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Library;
