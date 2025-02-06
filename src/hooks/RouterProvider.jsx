import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientProvider from "./ClientProvider";
import SearchBar from "../components/SearchBar";
import UserDetails from "../components/UserDetails";
export default function RouterProvider() {
  return (
    <ClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
}
