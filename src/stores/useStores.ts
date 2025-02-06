import { atom } from "nanostores";

export const favoritesStore = atom<Array<any>>([]);

export const showFavoritesStore = atom(false);

export const setFavorites = (newFavorites: Array<any>) => {
  favoritesStore.set(newFavorites);
};

export const toggleShowFavorites = () => {
  showFavoritesStore.set(!showFavoritesStore.get());
};
