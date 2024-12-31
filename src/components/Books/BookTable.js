import React from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";

const BookTable = ({ bookData, handleEdit, handleDelete }) => {
  const navigate = useNavigate(); 

  const handleView = (id) => {
    navigate(`/book/${id}`);
  };

  useTitle("Book Inventory Home");

  return (
    <div className="overflow-x-auto">
      <div className="max-h-[700px] overflow-y-auto border border-gray-200 rounded-md">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">Book-Title</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Author</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Publication Year</th>
              <th className="border border-gray-200 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
        </table>
        
        <div className="overflow-y-auto max-h-[400px]">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <tbody>
              {bookData.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-200 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-200 px-4 py-2">{book.publication_year}</td>
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-slate-500 text-white px-3 py-1 rounded mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="bg-slate-800 text-white px-3 py-1 rounded mr-3"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleView(book.id)}
                      className="bg-slate-900 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
