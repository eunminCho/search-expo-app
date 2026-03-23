export const QUERY_KEYS = {
  search: (query: string) => ["search", query] as const,
} as const;

export type AppQueryKey = ReturnType<
  (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS]
>;
