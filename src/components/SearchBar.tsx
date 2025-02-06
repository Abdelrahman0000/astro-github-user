import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import { useUserSearch } from "../hooks/useUserSearch";
import { useDebounce } from "../hooks/useDebounce";
import UserCard from "./UserCard";
import { useStore } from "@nanostores/react";
import {
  favoritesStore,
  showFavoritesStore,
  toggleShowFavorites,
  setFavorites,
} from "../stores/useStores";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const showFavorites = useStore(showFavoritesStore);
  const favorites = useStore(favoritesStore);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    isFetchingNextPage,
  } = useUserSearch(debouncedQuery);

  const allUsers = data?.pages.flat() || [];

  const toggleFavorite = (user) => {
    setFavorites(
      favorites.some((fav) => fav.id === user.id)
        ? favorites.filter((fav) => fav.id !== user.id)
        : [...favorites, user]
    );
  };
  return (
    <div className="searchContainer">
      <div className="searchBar">
        {!showFavorites ? (
          <div className="searchBarInner">
            <span>
              <img
                src="/search.svg"
                className="searchIcon"
                alt="Search Icon"
                loading="lazy"
              />
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search GitHub Users"
            />
          </div>
        ) : (
          <div className="searchBarInner">
            <span onClick={toggleShowFavorites}>
              <img src="/arrow.svg" className="searchIcon" alt="Back Icon" />
            </span>
            <h3>Favorites</h3>
          </div>
        )}
        <button
          onClick={toggleShowFavorites}
          style={{ marginLeft: "10px" }}
          aria-label={showFavorites ? "Show search" : "Show favorites"}
        >
          <img
            src={showFavorites ? "/star-active.svg" : "/star.svg"}
            className="star"
            alt="Star Icon"
            loading="lazy"
          />
        </button>
      </div>

      {isError ? (
        <div className="usersContainer" style={{ justifyContent: "center" }}>
          <p>Error fetching users. Try again!</p>
        </div>
      ) : (
        <div className="usersContainer activeUsersContainer">
          {!showFavorites && debouncedQuery.trim().length >= 3 ? (
            <UserList
              users={allUsers}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ) : showFavorites ? (
            favorites.length > 0 ? (
              <div className="usersContainer fav activeUsersContainer">
                {favorites.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    isFavorite
                    onToggleFavorite={() => toggleFavorite(user)}
                  />
                ))}
              </div>
            ) : (
              <div
                className="usersContainer"
                style={{ justifyContent: "center" }}
              >
                <p>No favorites yet.</p>
              </div>
            )
          ) : (
            <div
              className="usersContainer"
              style={{ justifyContent: "center" }}
            >
              {isLoading ? <p>Loading...</p> : <p>No users found.</p>}
            </div>
          )}
        </div>
      )}

      {(isLoading || isFetchingNextPage) && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p>Loading more...</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
