import {
  InfiniteData,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addDocumentToCollection,
  removeDocumentFromBookmark,
} from "@/api/bookmark/bookmarkApi";
import { AppQueryKey } from "@/api/queryKeys";
import type { DocumentSearchPage } from "@/api/search/types";
import { useErrorModal } from "@/contexts/ErrorModalContext";

interface Params {
  documentId: string;
  resultListQueryKey: AppQueryKey;
}

const useSaveButtonToggle = (params: Params) => {
  const { documentId, resultListQueryKey } = params;

  const { showError } = useErrorModal();
  const queryClient = useQueryClient();

  const { mutate: toggleSaved } = useMutation({
    mutationFn: async (willBeSaved: boolean) => {
      if (willBeSaved) {
        await addDocumentToCollection(documentId);
      } else {
        await removeDocumentFromBookmark(documentId);
      }
    },
    onMutate: async (willBeSaved) => {
      applyBookmarkStateToQuery(
        queryClient,
        resultListQueryKey,
        documentId,
        willBeSaved,
      );
    },
    onError: (_err, willBeSaved) => {
      showError();
      applyBookmarkStateToQuery(
        queryClient,
        resultListQueryKey,
        documentId,
        !willBeSaved,
      );
    },
  });

  return { toggleSaved };
};

export { useSaveButtonToggle };

function applyBookmarkStateToQuery(
  queryClient: QueryClient,
  queryKey: AppQueryKey,
  documentId: string,
  isBookmarked: boolean,
) {
  queryClient.setQueryData<InfiniteData<DocumentSearchPage>>(
    queryKey,
    createToggleBookmarkInQueryDataUpdater(documentId, isBookmarked),
  );
}

function createToggleBookmarkInQueryDataUpdater(
  documentId: string,
  isBookmarked: boolean,
) {
  return (
    old: InfiniteData<DocumentSearchPage> | undefined,
  ): InfiniteData<DocumentSearchPage> | undefined => {
    if (!old) return old;
    return {
      ...old,
      pages: old.pages.map((page) => {
        const hasItem = page.items.some((item) => item.id === documentId);
        if (!hasItem) return page;
        return {
          ...page,
          items: page.items.map((item) =>
            item.id === documentId ? { ...item, isBookmarked } : item,
          ),
        };
      }),
    };
  };
}
