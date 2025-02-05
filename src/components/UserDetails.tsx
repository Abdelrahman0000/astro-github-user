import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Followers from "./Followers";
import { navigate } from "astro:transitions/client";
import { toggleShowFavorites } from "../stores/useStores";

const fetchUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) throw new Error("Failed to fetch user details");
  return response.json();
};

interface UserDetailsProps {
  username: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ username }) => {
  const {
    data: userDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["githubUserDetails", username],
    queryFn: () => fetchUserDetails(username!),
    enabled: !!username,
  });

  const [favorites, setFavorites] = useState<any[]>([]);

  // Load favorites from localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavorites(storedFavorites);
    }
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const isFavorite = userDetails
    ? favorites.some((fav) => fav.id === userDetails.id)
    : false;

  const toggleFavorite = (user: any) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== user.id)
        : [...prevFavorites, user];

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      }

      return updatedFavorites;
    });
  };

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
          <h3>{userDetails.name || userDetails.login}</h3>
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
            src={userDetails.avatar_url}
            alt={`${userDetails.login} avatar`}
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
              <h1>{userDetails.name || userDetails.login}</h1>
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
            <a href={`https://github.com/${username}`}>@{userDetails.login}</a>
            <p>Bio: {userDetails.bio || "No bio available"}</p>
            <div className="detailsFollower">
              <Followers name="Followers" followers={userDetails.followers} />
              <Followers name="Following" followers={userDetails.following} />
              <Followers
                name="Public Repos"
                followers={userDetails.public_repos}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
