import { atom } from "nanostores";

// Define a store for favorites
export const favoritesStore = atom<Array<any>>([]);

// Define a store for showFavorites
export const showFavoritesStore = atom(false);

// Function to update favorites
export const setFavorites = (newFavorites: Array<any>) => {
  favoritesStore.set(newFavorites);
};

// Function to toggle showFavorites
export const toggleShowFavorites = () => {
  showFavoritesStore.set(!showFavoritesStore.get());
};
