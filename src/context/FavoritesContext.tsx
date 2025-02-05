// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useState } from "react";
import { User } from "../api/users";

interface FavoritesContextType {
  favorites: User[];
  toggleFavorite: (user: User) => void;
  showFavorites: boolean;
  setShowFavorites: (value: boolean) => void;
}

const FavoritesContext = createContext<FavoritesContextType>(
  {} as FavoritesContextType
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<User[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = (user: User) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === user.id)
        ? prev.filter((fav) => fav.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, showFavorites, setShowFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
