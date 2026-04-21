import type { BoardQuery, Card, SortOrder } from '@/types';

function matchesAuthor(card: Card, author?: string): boolean {
  if (!author?.trim()) return true;
  const query = author.trim().toLowerCase();

  return card.author.toLowerCase().includes(query);
}

function matchesColor(card: Card, color?: string): boolean {
  if (!color) return true;
  const query = color.trim().toLowerCase();

  return card.color.toLowerCase().includes(query);
}

function compareCreatedAt(a: Card, b: Card, order: SortOrder): number {
  const ta = new Date(a.createdAt).getTime();
  const tb = new Date(b.createdAt).getTime();
  const diff = ta - tb;

  return order === 'desc' ? -diff : diff;
}

export function applyBoardQuery(cards: Card[], query: BoardQuery = {}): Card[] {
  let out = cards.filter(
    (c) => matchesAuthor(c, query.author) && matchesColor(c, query.color)
  );
  if (query?.sortBy === 'createdAt') {
    const order = query.sortOrder ?? 'desc';
    out = [...out].sort((a, b) => compareCreatedAt(a, b, order));
  }

  return out;
}
