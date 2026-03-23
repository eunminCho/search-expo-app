import { DocumentSearchPage } from "@/api/search/types";

export function buildMockDocumentSearchPage(
  endpoint: string,
): DocumentSearchPage {
  const queryString = endpoint.includes("?") ? endpoint.split("?")[1] : "";
  const params = new URLSearchParams(queryString);
  const query = params.get("query") ?? "";

  const sizeRaw = Number(params.get("size") ?? 0);
  const fromRaw = Number(params.get("from") ?? 0);
  const size = Number.isFinite(sizeRaw) ? Math.max(0, sizeRaw) : 0;
  const from = Number.isFinite(fromRaw) ? Math.max(0, fromRaw) : 0;

  // 고정 total 문서 수를 두고, `from`/`size` 기준으로 잘라서 페이지네이션을 흉내냅니다.
  const TOTAL_DOCUMENTS = 53;

  const pageStartIndex = Math.min(from, TOTAL_DOCUMENTS);
  const pageEndIndexExclusive = Math.min(from + size, TOTAL_DOCUMENTS);
  const pageItemCount = Math.max(0, pageEndIndexExclusive - pageStartIndex);

  const items = Array.from({ length: pageItemCount }, (_, i) => {
    const absoluteIndex = pageStartIndex + i; // 0-based
    const docNumber = absoluteIndex + 1; // 1-based (id/title에 쓰기 좋게)

    return {
      id: `mock-${docNumber}`,
      imageUrl: "https://picsum.photos/200",
      title: query
        ? `"${query}" 검색 샘플 (${docNumber})`
        : `샘플 문서 (${docNumber})`,
      url: `https://reactnative.dev/architecture/overview`,
      isBookmarked: docNumber % 3 === 0,
    };
  });

  return {
    items,
    hasNextPage: from + pageItemCount < TOTAL_DOCUMENTS,
  };
}
