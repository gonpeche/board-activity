export type Card = {
  id: string;
  text: string;
  x: number;
  y: number;
  author: string;
  color: string;
  createdAt: string;
};

export interface IBoardResults {
  results: Card[];
}

export type SortOrder = 'asc' | 'desc';

export type BoardQuery = {
  author?: string;
  color?: string;
  sortBy?: 'createdAt';
  sortOrder?: SortOrder;
};
