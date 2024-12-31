import React from "react";

const BookForm = ({
  newBook,
  setNewBook,
  handleAddOrUpdateBook,
  editBook,
  isFormEmpty,
}) => {
  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewBook({ ...newBook, title: value });
    }
  };

  const handleAuthorChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setNewBook({ ...newBook, author: value });
    }
  };

  const handlePublicationYearChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setNewBook({ ...newBook, publication_year: value });
    }
  };

  return (
    <form onSubmit={handleAddOrUpdateBook} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={newBook.title}
        onChange={handleTitleChange}
        className="border border-gray-200 p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Author"
        value={newBook.author}
        onChange={handleAuthorChange}
        className="border border-gray-200 p-2 mr-2"
      />
      <input
        type="number"
        placeholder="Publication Year"
        value={newBook.publication_year}
        onChange={handlePublicationYearChange}
        className="border border-gray-200 p-2 mr-2"
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded cursor-pointer ${
          isFormEmpty
            ? "bg-gray-500 text-white cursor-not-allowed"
            : "bg-black text-white"
        }`}
        disabled={isFormEmpty}
      >
        {editBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
