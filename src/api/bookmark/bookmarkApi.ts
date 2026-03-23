import { mockApiFetch } from "../../utils/fetch";

export const addDocumentToCollection = async (
  documentId: string,
): Promise<void> => {
  const response = await mockApiFetch(`/bookmark/${documentId}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("[addDocumentToBookmark] 북마크에 실패했습니다.");
  }
};

export const removeDocumentFromBookmark = async (
  documentId: string,
): Promise<void> => {
  const response = await mockApiFetch(`/bookmark/${documentId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.error("[removeDocumentFromBookmark] 북마크 해제에 실패했습니다.");
    throw new Error("[removeDocumentFromBookmark] 북마크 해제에 실패했습니다.");
  }
};
