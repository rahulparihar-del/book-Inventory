import { Routes, Route } from "react-router-dom";
import BookDetail from "../Books/BookDetails";
import BookList from "../Books/BookList";
export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
};
