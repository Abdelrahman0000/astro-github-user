// src/api/users.ts
export interface User {
  id: number;
  login: string;
  avatar_url: string;
  [key: string]: any;
}

export const Users = async (
  query: string,
  page: number = 1
): Promise<User[]> => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=30`
  );
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = await response.json();

  return data.items || [];
};

export const User = async (
  query: string,
  page: number = 1
): Promise<User[]> => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=30`
  );
  if (!response.ok) throw new Error("Failed to fetch users");
  const data = await response.json();
  return data.items || [];
};
