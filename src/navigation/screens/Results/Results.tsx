import { useCallback, useMemo, useState } from "react";
import { FlatList, type FlatListProps } from "react-native";

import { StaticScreenProps } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { QUERY_KEYS } from "@/api/queryKeys";
import type { DocumentItem } from "@/api/search/types";
import ScreenLayout from "@/components/baseComponents/ScreenContainer";
import { useDebounce } from "@/hooks/useDebounce";

import ResultsListItem from "./components/ResultListItem";
import ResultsListSkeleton, {
  ResultsListSkeletonItem,
} from "./components/ResultListSkeleton";
import ResultsHeader from "./components/ResultsHeader";
import { useResultsQuery } from "./hooks/useResultsQuery";

type Props = StaticScreenProps<{
  keyword: string;
}>;

const AnimatedFlatList =
  Animated.createAnimatedComponent<FlatListProps<DocumentItem>>(FlatList);

export function Results({ route }: Props) {
  const [keyword, setKeyword] = useState<string>(route.params.keyword);

  const resultListScrollY = useSharedValue(0);
  const resultListAnimatedScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      resultListScrollY.value = e.contentOffset.y;
    },
  });

  const debouncedKeyword = useDebounce(keyword, 300);
  const resultListQueryKey = QUERY_KEYS.search(debouncedKeyword);

  const {
    documentsData,
    fetchNextDocumentsPage,
    hasNextDocumentsPage,
    isFetchingNextDocumentsPage,
    isLoadingDocuments,
  } = useResultsQuery({ keyword, resultListQueryKey });

  const renderResultListItem = useCallback(
    ({ item }: { item: DocumentItem }) => (
      <ResultsListItem
        document={item}
        resultListQueryKey={resultListQueryKey}
      />
    ),
    [resultListQueryKey],
  );

  const keyExtractor = useCallback((item: DocumentItem) => item.id, []);

  const renderListEmptyComponent = useCallback(() => {
    if (isLoadingDocuments) {
      return <ResultsListSkeleton />;
    }
    //blank인 경우
    return null;
  }, [isLoadingDocuments]);

  const listFooterComponent = useMemo(
    () => (isFetchingNextDocumentsPage ? <ResultsListSkeletonItem /> : null),
    [isFetchingNextDocumentsPage],
  );

  return (
    <ScreenLayout>
      <ResultsHeader
        keyword={keyword}
        setKeyword={setKeyword}
        resultListScrollY={resultListScrollY}
      />
      <AnimatedFlatList
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
        data={documentsData}
        renderItem={renderResultListItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderListEmptyComponent}
        onScroll={resultListAnimatedScrollHandler}
        scrollEventThrottle={16}
        onEndReached={() => {
          if (hasNextDocumentsPage && !isFetchingNextDocumentsPage) {
            fetchNextDocumentsPage();
          }
        }}
        ListFooterComponent={listFooterComponent}
      />
    </ScreenLayout>
  );
}
