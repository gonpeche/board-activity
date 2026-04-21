import type { Card } from '@/types';

export async function loadCards(): Promise<Card[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch('/cards.json');

  if (!response.ok) {
    throw new Error(`Failed to load cards: ${response.status}`);
  }

  const cards: Card[] = await response.json();

  return cards;
}
