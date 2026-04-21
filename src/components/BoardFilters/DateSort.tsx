import type { BoardQuery, SortOrder } from '@/types';

type DateSortProps = {
  query: BoardQuery;
  onChange: (next: BoardQuery) => void;
};

function sortSelectValue(query: BoardQuery): '' | 'asc' | 'desc' {
  if (query.sortBy !== 'createdAt') return '';
  return query.sortOrder === 'asc' ? 'asc' : 'desc';
}

export function DateSort({ query, onChange }: DateSortProps) {
  const sortValue = sortSelectValue(query);

  return (
    <div className="flex w-full min-w-[12rem] flex-col gap-1.5 sm:w-auto sm:flex-initial">
      <label
        className="text-left text-xs font-medium text-zinc-600 dark:text-zinc-400"
        htmlFor="filter-sort"
      >
        Sort by date
      </label>
      <select
        id="filter-sort"
        className="min-h-11 rounded-md border border-zinc-300 py-2 pl-3 pr-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 dark:border-zinc-600 dark:focus-visible:ring-offset-zinc-950"
        value={sortValue}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '') {
            onChange({ ...query, sortBy: undefined, sortOrder: undefined });
          } else {
            onChange({
              ...query,
              sortBy: 'createdAt',
              sortOrder: value as SortOrder,
            });
          }
        }}
      >
        <option value="">Original order</option>
        <option value="desc">Newest first</option>
        <option value="asc">Oldest first</option>
      </select>
    </div>
  );
}
