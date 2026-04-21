import { useMemo, useState } from 'react';
import BoardResults from '@/components/BoardResults';
import BoardFilters from '@/components/BoardFilters';
import LoadinSpinner from '@/components/ui/LoadingSpinner';
import useBoardNotes from '@/hooks/useBoardNotes';
import type { BoardQuery } from '@/types';
import { applyBoardQuery } from '@/lib/applyBoardQuery';

function App() {
  const [query, setQuery] = useState<BoardQuery>({});
  const { data: allCards = [], isLoading } = useBoardNotes();

  const visible = useMemo(
    () => applyBoardQuery(allCards, query),
    [allCards, query]
  );

  if (isLoading) {
    return <LoadinSpinner />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center gap-8 px-4 py-10 sm:px-6">
      <header className="text-center">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Board activity
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Filter and sort sticky notes from this session
        </p>
      </header>

      <BoardFilters query={query} onChange={setQuery} />
      <BoardResults results={visible} />
    </div>
  );
}

export default App;
