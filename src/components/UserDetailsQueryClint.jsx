// src/components/UserDetailsQueryClint.tsx
import React, { useState } from "react";
import ClientProvider from "../hooks/ClientProvider";
import UserDetails from "./UserDetails";

export default function UserDetailsQueryClint({ username }) {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (user) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === user.id)
        ? prev.filter((fav) => fav.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <ClientProvider>
      <UserDetails
        username={username}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setShowFavorites={setShowFavorites}
      />
    </ClientProvider>
  );
}
