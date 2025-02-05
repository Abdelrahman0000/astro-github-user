// src/components/SearchBarQueryClint.jsx
import React from "react";
import ClientProvider from "../hooks/ClientProvider";
import RouterProvider from "../hooks/RouterProvider";
import SearchBar from "./SearchBar";

export default function SearchBarQueryClint() {
  return (
    <ClientProvider>
      <SearchBar />
    </ClientProvider>
  );
}
