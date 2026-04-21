import type { BoardQuery } from '@/types';
import { AuthorInput } from './AuthorInput';
import { ColorInput } from './ColorInput';
import { DateSort } from './DateSort';

type BoardFiltersProps = {
  query: BoardQuery;
  onChange: (next: BoardQuery) => void;
};

export default function BoardFilters({ query, onChange }: BoardFiltersProps) {
  return (
    <div
      className="flex w-full max-w-3xl flex-wrap items-end justify-center gap-4"
      role="search"
      aria-label="Filter board notes"
    >
      <AuthorInput
        value={query.author ?? ''}
        onChange={(author) => onChange({ ...query, author })}
      />
      <ColorInput
        value={query.color ?? ''}
        onChange={(color) => onChange({ ...query, color })}
      />
      <DateSort query={query} onChange={onChange} />
    </div>
  );
}
