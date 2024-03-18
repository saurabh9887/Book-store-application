import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreateBook from "./Pages/CreateBook";
import EditBook from "./Pages/EditBook";
import ShowBook from "./Pages/ShowBook";
import DeleteBook from "./Pages/DeleteBook";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/createbook" element={<CreateBook />} />
        <Route path="/books/editbook/:id" element={<EditBook />} />
        <Route path="/books/showbook/:id" element={<ShowBook />} />
        <Route path="/books/deletebook/:id" element={<DeleteBook />} />
      </Routes>
    </div>
  );
};

export default App;
