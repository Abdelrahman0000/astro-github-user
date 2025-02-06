import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientProvider from "./ClientProvider";
import SearchBar from "../components/SearchBar";
import UserDetailsQueryClint from "../components/UserDetailsQueryClint";
export default function RouterProvider() {
  return (
    <ClientProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/user/:username" element={<UserDetailsQueryClint />} />
        </Routes>
      </Router>
    </ClientProvider>
  );
}
