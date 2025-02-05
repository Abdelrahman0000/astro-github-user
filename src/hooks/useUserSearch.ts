// src/hooks/useUserSearch.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { Users } from "../api/users";

export const useUserSearch = (query: string) => {
  console.log("useUserSearch", query);

  return useInfiniteQuery({
    queryKey: ["githubUsers", query],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      Users(query, pageParam),
    enabled: query.trim().length >= 3,
    getNextPageParam: (lastPage: any, allPages) =>
      lastPage.length === 30 ? allPages.length + 1 : undefined,
  });
};
