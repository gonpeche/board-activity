import type { Card } from '@/types';
import { getCardColor } from './utils';

export default function Card({ card }: { card: Card }) {
  const cardColor = getCardColor(card.color);
  const label = `Note from ${card.author}: ${card.text}`;

  return (
    <article
      aria-label={label}
      title={card.text}
      className={`w-full max-w-[14rem] h-[100px] rounded-lg border p-3 text-left text-xs shadow-sm ring-1 ring-black/[0.06] ${cardColor}`}
    >
      <p className="line-clamp-4 text-[13px] leading-snug text-zinc-900 dark:text-zinc-600">
        {card.text}
      </p>
      <p className="mt-2 border-t border-black/10 pt-2 text-[11px] text-zinc-700 dark:border-white/15 dark:text-zinc-600">
        <span className="font-medium text-zinc-800 dark:text-zinc-600">
          {card.author}
        </span>
      </p>
    </article>
  );
}
