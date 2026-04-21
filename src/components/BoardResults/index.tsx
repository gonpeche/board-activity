import type { IBoardResults } from '@/types';
import Card from './Card';

export default function BoardResults({ results }: IBoardResults) {
  if (results.length === 0) {
    return (
      <p
        className="text-center text-sm text-zinc-500 dark:text-zinc-400"
        role="status"
      >
        No cards found
      </p>
    );
  }

  return (
    <div className="w-full">
      <ul
        role="list"
        className="mx-auto grid max-h-[min(70vh,640px)] w-full max-w-5xl auto-rows-max grid-cols-1 content-start items-start gap-3 overflow-y-auto overflow-x-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {results.map((card) => (
          <li key={card.id} className="flex justify-center">
            <Card card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}
