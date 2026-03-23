import type { DocumentSearchPage } from "./types";
import { mockApiFetch } from "../../utils/fetch";

export const fetchSearchDocuments = async (
  query: string,
  size: number,
  from: number,
): Promise<DocumentSearchPage> => {
  const url = `/search?query=${query}&size=${size}&from=${from}`;
  const response = await mockApiFetch(url, {
    method: "GET",
  });

  if (!response.ok)
    throw new Error("[fetchSearchDocuments] 데이터를 가져오지 못했습니다.");
  return response.json();
};
