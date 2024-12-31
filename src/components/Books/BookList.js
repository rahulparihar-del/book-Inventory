import React, { useEffect, useState } from "react";
import BookForm from "./BookForm";
import BookTable from "./BookTable";
import { fetchBooks, addBook, updateBook, deleteBook } from "../../hooks/api";

const BookList = () => {
  const [bookData, setBookData] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", publication_year: "" });
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBookData(data);
    };
    getBooks();
  }, []);

  const handleEdit = (book) => {
    setEditBook(book);
    setNewBook({ title: book.title, author: book.author, publication_year: book.publication_year });
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBookData(bookData.filter((book) => book.id !== id));
  };

  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();

    if (editBook) {
      const updatedBook = await updateBook(editBook.id, newBook);
      setBookData(
        bookData.map((book) => (book.id === updatedBook.id ? updatedBook : book))
      );
      setEditBook(null);
      setNewBook({ title: "", author: "", publication_year: "" });
    } else {
      const addedBook = await addBook(newBook);
      setBookData([addedBook, ...bookData]);
      setNewBook({ title: "", author: "", publication_year: "" });
    }
  };

  const isFormEmpty = !newBook.title || !newBook.author || !newBook.publication_year;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Inventory</h1>
      <BookForm
        isFormEmpty={isFormEmpty}
        newBook={newBook}
        setNewBook={setNewBook}
        handleAddOrUpdateBook={handleAddOrUpdateBook}
        editBook={editBook}
      />
      <BookTable bookData={bookData} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default BookList;
