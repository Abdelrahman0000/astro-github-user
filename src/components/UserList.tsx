import React, { useCallback, useRef } from "react";
import UserCard from "./UserCard";
import { User } from "../api/users";

interface UserListProps {
  users: User[];
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  favorites: User[];
  toggleFavorite: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  favorites,
  toggleFavorite,
}) => {
  const intObserver = useRef<IntersectionObserver>();

  const lastUserRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) intObserver.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );
  return (
    <div className="usersContainer activeUsersContainer">
      {users.map((user, index) => {
        const isLastUser = index === users.length - 1;
        return isLastUser ? (
          <div ref={lastUserRef} key={user.id}>
            <UserCard
              user={user}
              isFavorite={favorites.some((fav) => fav.id === user.id)}
              onToggleFavorite={() => toggleFavorite(user)}
            />
          </div>
        ) : (
          <UserCard
            key={user.id}
            user={user}
            isFavorite={favorites.some((fav) => fav.id === user.id)}
            onToggleFavorite={() => toggleFavorite(user)}
          />
        );
      })}
    </div>
  );
};

export default UserList;
