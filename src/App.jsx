import { useState } from "react";
import "./App.css";

import { Routes, BrowserRouter, Route } from "react-router-dom";
import Auth from "./screens/auth/Auth";
import Landing from "./screens/landing/Landing";
import Customers from "./components/customers/Customers";
import Cars from "./components/cars/Cars";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Landing />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
