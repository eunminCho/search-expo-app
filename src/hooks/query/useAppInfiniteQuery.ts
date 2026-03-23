import {
  InfiniteData,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { AppQueryKey } from "@/api/queryKeys";

export function useAppInfiniteQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends AppQueryKey = AppQueryKey,
  TPageParam = number,
>(
  queryKey: TQueryKey,
  queryFn: (
    context: QueryFunctionContext<TQueryKey, TPageParam>,
  ) => Promise<TQueryFnData>,
  options: Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>,
    "queryKey" | "queryFn"
  >,
) {
  return useInfiniteQuery({ queryKey, queryFn, ...options });
}
