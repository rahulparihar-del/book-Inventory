const API_URL = "http://localhost:5000/books";

// Fetch all books
export const fetchBooks = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

export const fetchBookById = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching book by id:", error);
    }
  };

// Add a new book
export const addBook = async (newBook) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

// Update an existing book
export const updateBook = async (id, updatedBook) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating book:", error);
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};
