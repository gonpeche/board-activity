import { applyBoardQuery } from '@/lib/applyBoardQuery';
import { cardsFixture } from '../../fixtures/cards';

describe('applyBoardQuery', () => {
  it('returns all cards when query is empty', () => {
    expect(applyBoardQuery(cardsFixture, {})).toEqual(cardsFixture);
  });

  it('filters by author (case-insensitive)', () => {
    const result = applyBoardQuery(cardsFixture, { author: 'USER_11' });
    expect(result.map((card) => card.id)).toEqual(['b', 'c']);
  });

  it('filters by color (case-insensitive)', () => {
    const result = applyBoardQuery(cardsFixture, { color: 'YELL' });
    expect(result.map((card) => card.id)).toEqual(['b']);
  });

  it('applies ascending date sorting when requested', () => {
    const result = applyBoardQuery(cardsFixture, {
      sortBy: 'createdAt',
      sortOrder: 'asc',
    });
    expect(result.map((card) => card.id)).toEqual(['a', 'b', 'c']);
  });

  it('defaults to descending date sorting when sortOrder is omitted', () => {
    const result = applyBoardQuery(cardsFixture, { sortBy: 'createdAt' });
    expect(result.map((card) => card.id)).toEqual(['c', 'b', 'a']);
  });
});
