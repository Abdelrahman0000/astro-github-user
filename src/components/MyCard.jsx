import { useStore } from "@nanostores/react"; // Import useStore from the correct package

import {
  favoritesStore,
  showFavoritesStore,
  setFavorites,
  toggleShowFavorites,
} from "../stores/useStores";

export default function MyCard() {
  const favorites = useStore(favoritesStore);
  const showFavorites = useStore(showFavoritesStore);
  console.log("====================================");
  console.log(favorites);
  console.log("====================================");
  return <div>Card</div>;
}
