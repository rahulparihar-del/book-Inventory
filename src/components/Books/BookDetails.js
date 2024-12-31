import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publication_year: "",
  });
  useTitle(book ? book.title : "Book Details");

  useEffect(() => {
    fetch(`http://localhost:5000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setNewBook({
          title: data.title,
          author: data.author,
          publication_year: data.publication_year,
        });
      })
      .catch((error) => console.error("Error fetching book:", error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        setBook(updatedBook);
        navigate("/");
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  // Handle Delete
  const handleDelete = () => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error deleting book:", error));
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8">
        Book Details
      </h1>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-8 flex space-x-8">
        <div className="flex-1">
          <p className="text-lg text-gray-700">
            <strong>Title:</strong> {book.title}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-lg text-gray-700">
            <strong>Author:</strong> {book.author}
          </p>
        </div>
        <div className="flex-1">
          <p className="text-lg text-gray-700">
            <strong>Publication Year:</strong> {book.publication_year}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Edit Book</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <label className="text-lg text-gray-600 mb-2 block">
              Book-Title
            </label>
            <input
              type="text"
              placeholder="Enter book title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="text-lg text-gray-600 mb-2 block">Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex mb-6">
          <div className="flex-1">
            <label className="text-lg text-gray-600 mb-2 block">
              Publication Year
            </label>
            <input
              type="number"
              placeholder="Enter publication year"
              value={newBook.publication_year}
              onChange={(e) =>
                setNewBook({ ...newBook, publication_year: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md text-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-slate-500 text-white px-6 py-2 rounded-md text-lg transition"
          >
            Update Book
          </button>
          <button
            onClick={handleDelete}
            className="bg-slate-800 text-white px-6 py-2 rounded-md text-lg transition"
          >
            Delete Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookDetail;
