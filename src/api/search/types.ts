export interface DocumentItem {
  id: string;
  imageUrl: string;
  title: string;
  url: string;
  isBookmarked: boolean;
}

export interface DocumentSearchPage {
  items: DocumentItem[];
  hasNextPage: boolean;
}
