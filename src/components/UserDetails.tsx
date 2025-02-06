import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import Followers from "./Followers";
import {
  favoritesStore,
  setFavorites,
  showFavoritesStore,
} from "../stores/useStores";

const fetchUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) throw new Error("Failed to fetch user details");
  return response.json();
};

const UserDetails: React.FC = () => {
  const { username } = useParams();
  const favorites = useStore(favoritesStore);
  const showFavorites = useStore(showFavoritesStore);

  const toggleFavorite = (user: { id: number }) => {
    setFavorites(
      favorites.some((fav) => fav.id === user.id)
        ? favorites.filter((fav) => fav.id !== user.id)
        : [...favorites, user]
    );
  };

  const toggleShowFavorites = (isTrue: boolean) => {
    showFavoritesStore.set(isTrue);
  };

  const {
    data: userDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["githubUserDetails", username],
    queryFn: () => fetchUserDetails(username!),
    enabled: !!username,
  });

  const navigate = useNavigate();

  const isFavorite = userDetails
    ? favorites.some((fav) => fav.id === userDetails.id)
    : false;

  const handleNavigation = () => {
    toggleShowFavorites(false);
    navigate("/");
  };

  const handleNavigationFav = () => {
    toggleShowFavorites(true);
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching user details. Try again!</p>;

  return (
    <>
      <div className="searchBar">
        <div className="searchBarInner">
          <span onClick={handleNavigation}>
            <img
              src="/arrow.svg"
              loading="lazy"
              className="searchIcon"
              alt="Back"
            />
          </span>
          <h3>{userDetails?.name || userDetails?.login}</h3>
        </div>
        <button
          onClick={() => handleNavigationFav()}
          style={{ marginLeft: "10px" }}
        >
          <img
            src="/star.svg"
            loading="lazy"
            className="star"
            alt="Favorites"
          />
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <div className="userDetails">
          <img
            src={userDetails?.avatar_url}
            alt={`${userDetails?.login} avatar`}
            loading="lazy"
          />
          <div className="userDetailsInner">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1>{userDetails?.name || userDetails.login}</h1>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(userDetails);
                }}
                style={{ backgroundColor: "transparent", border: "none" }}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <img
                  src={isFavorite ? "/star-active.svg" : "/star.svg"}
                  className="star"
                  style={{ height: "20px" }}
                  alt="Favorite toggle"
                />
              </button>
            </div>
            <a href={`https://github.com/${username}`}>@{userDetails?.login}</a>
            <p>Bio: {userDetails?.bio || "No bio available"}</p>
            <div className="detailsFollower">
              <Followers name="Followers" followers={userDetails?.followers} />
              <Followers name="Following" followers={userDetails?.following} />
              <Followers
                name="Public Repos"
                followers={userDetails?.public_repos}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
