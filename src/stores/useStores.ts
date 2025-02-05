import { atom } from "nanostores";

// Define a store for favorites
export const favoritesStore = atom<Array<any>>([]);
// Check if window is defined (ensuring it's running in the browser)
const storedShowFavorites =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("showFavorites") || "false")
    : false;

// Define a store for showFavorites
export const showFavoritesStore = atom(storedShowFavorites);

// Update localStorage whenever the store changes
if (typeof window !== "undefined") {
  showFavoritesStore.subscribe((value) => {
    localStorage.setItem("showFavorites", JSON.stringify(value));
  });
}
// Function to update favorites
export const setFavorites = (newFavorites: Array<any>) => {
  favoritesStore.set(newFavorites);
};

// Function to toggle showFavorites
export const toggleShowFavorites = () => {
  showFavoritesStore.set(!showFavoritesStore.get());
};
