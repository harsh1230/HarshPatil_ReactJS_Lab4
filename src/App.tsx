import "./App.css";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ShowData from "./components/ShowData";
import ExpenseTracker from "./components/ExpenseTracker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowData />} />
          <Route path="/add" element={<ExpenseTracker onTrue={undefined} onClose={undefined} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
