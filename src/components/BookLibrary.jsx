import React, { useState, useEffect } from "react";
import axios from "axios";

const BookLibrary = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    if (query.length > 2) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then((res) => setBooks(res.data.items || []))
        .catch(() => setBooks([]));
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-600">Book Library</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <ul className="space-y-3">
          {books.map((book) => (
            <li
              key={book.id}
              className="p-4 bg-yellow-50 border rounded-lg flex flex-col"
            >
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="mb-2"
                />
              )}
              <h3 className="font-bold text-yellow-800">{book.volumeInfo.title}</h3>
              <p className="text-yellow-700 text-sm">
                {book.volumeInfo.authors?.join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookLibrary;
