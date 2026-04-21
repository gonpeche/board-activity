import { getCardColor } from '@/components/BoardResults/utils';

describe('getCardColor', () => {
  it('returns mapped class for known colors', () => {
    expect(getCardColor('yellow')).toContain('bg-amber-200');
    expect(getCardColor('blue')).toContain('bg-sky-200');
  });

  it('is case-insensitive', () => {
    expect(getCardColor('PuRpLe')).toContain('bg-violet-200');
  });

  it('returns fallback class for unknown colors', () => {
    expect(getCardColor('unknown')).toBe('bg-zinc-200 border-zinc-400');
  });
});
