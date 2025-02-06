import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@nanostores/react";
import UserDetails from "./UserDetails";
import {
  favoritesStore,
  setFavorites,
  showFavoritesStore,
} from "../stores/useStores";

export default function UserDetailsQueryClint() {
  const { username } = useParams();
  const favorites = useStore(favoritesStore);
  const showFavorites = useStore(showFavoritesStore);

  const toggleFavorite = (user) => {
    setFavorites(
      favorites.some((fav) => fav.id === user.id)
        ? favorites.filter((fav) => fav.id !== user.id)
        : [...favorites, user]
    );
  };

  const toggleShowFavorites = (isTrue) => {
    showFavoritesStore.set(isTrue);
  };

  return (
    <UserDetails
      username={username}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      setShowFavorites={toggleShowFavorites}
    />
  );
}
