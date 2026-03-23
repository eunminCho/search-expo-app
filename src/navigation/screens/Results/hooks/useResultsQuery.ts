import { useEffect } from "react";

import { AppQueryKey } from "@/api/queryKeys";
import { fetchSearchDocuments } from "@/api/search/searchApi";
import { useErrorModal } from "@/contexts/ErrorModalContext";
import { useAppInfiniteQuery } from "@/hooks/query/useAppInfiniteQuery";

interface Params {
  keyword: string;
  resultListQueryKey: AppQueryKey;
}

const SEARCH_DOCUMENT_QUERY_SIZE = 20;

const useResultsQuery = (params: Params) => {
  const { keyword, resultListQueryKey } = params;

  const { showError } = useErrorModal();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useAppInfiniteQuery(
    resultListQueryKey,
    ({ pageParam }) =>
      fetchSearchDocuments(keyword, SEARCH_DOCUMENT_QUERY_SIZE, pageParam),
    {
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.hasNextPage) return undefined;
        return allPages.length * SEARCH_DOCUMENT_QUERY_SIZE;
      },
      gcTime: 0,
    },
  );
  const documentsData = data?.pages.flatMap((page) => page.items) ?? [];

  useEffect(() => {
    if (isError) {
      showError();
    }
  }, [isError]);

  return {
    documentsData,
    fetchNextDocumentsPage: fetchNextPage,
    hasNextDocumentsPage: hasNextPage,
    isFetchingNextDocumentsPage: isFetchingNextPage,
    isLoadingDocuments: isLoading,
    isErrorDocuments: isError,
  };
};

export { useResultsQuery };
