const BY_COLOR: Record<string, string> = {
  yellow: 'bg-amber-200 border-amber-400',
  blue: 'bg-sky-200 border-sky-400',
  green: 'bg-emerald-200 border-emerald-400',
  pink: 'bg-pink-200 border-pink-400',
  purple: 'bg-violet-200 border-violet-400',
  orange: 'bg-orange-200 border-orange-400',
  red: 'bg-red-200 border-red-400',
  teal: 'bg-teal-200 border-teal-400',
  gray: 'bg-zinc-300 border-zinc-500',
  indigo: 'bg-indigo-200 border-indigo-400',
  lime: 'bg-lime-200 border-lime-400',
  cyan: 'bg-cyan-200 border-cyan-400',
  magenta: 'bg-fuchsia-200 border-fuchsia-400',
};

const FALLBACK = 'bg-zinc-200 border-zinc-400';

export function getCardColor(color: string): string {
  return BY_COLOR[color.toLowerCase()] ?? FALLBACK;
}
