import { buildMockDocumentSearchPage } from "@/assets/mockData/mockData";

function createJsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * 실제 네트워크 대신 더미 JSON을 반환하는 mock fetch입니다.
 *
 * @param endpoint API 경로(쿼리스트링 포함 가능)
 * @param options fetch 옵션(method 등)
 */
export const mockApiFetch = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> => {
  const method = options.method ?? "GET";

  try {
    if (endpoint.startsWith("/search")) {
      const queryString = endpoint.includes("?") ? endpoint.split("?")[1] : "";
      const query = new URLSearchParams(queryString).get("query")?.trim() ?? "";

      if (!query) {
        if (__DEV__) {
          console.warn(`⚠️ [MOCK ${method}] 400 | ${endpoint} (empty query)`);
        }
        return createJsonResponse(
          {
            error: "INVALID_QUERY",
            message: "query는 빈 문자열일 수 없습니다.",
          },
          400,
        );
      }

      const body = buildMockDocumentSearchPage(endpoint);
      if (__DEV__) {
        console.info(`✅ [MOCK ${method}] 200 | ${endpoint}`);
      }
      return createJsonResponse(body);
    }

    if (endpoint.startsWith("/bookmark/")) {
      if (method === "POST" || method === "DELETE") {
        if (__DEV__) {
          console.info(`✅ [MOCK ${method}] 200 | ${endpoint}`);
        }
        return new Response(null, { status: 200 });
      }
    }

    if (__DEV__) {
      console.warn(`⚠️ [MOCK] 미지원 엔드포인트 | ${method} ${endpoint}`);
    }
    return new Response(null, { status: 404 });
  } catch (error) {
    if (__DEV__) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error(`🚨 [MOCK ERROR | ${endpoint} | ${msg}`);
    }
    throw error;
  }
};
