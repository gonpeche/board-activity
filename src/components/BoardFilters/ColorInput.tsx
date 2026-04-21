type ColorInputProps = {
  value: string;
  onChange: (color: string | undefined) => void;
};

export function ColorInput({ value, onChange }: ColorInputProps) {
  return (
    <div className="flex min-w-[10rem] flex-1 flex-col gap-1.5 sm:min-w-0">
      <label
        className="text-left text-xs font-medium text-zinc-600 dark:text-zinc-400"
        htmlFor="filter-color"
      >
        Color
      </label>
      <input
        id="filter-color"
        className="min-h-11 rounded-md border border-zinc-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 dark:border-zinc-600 dark:focus-visible:ring-offset-zinc-950"
        type="search"
        autoComplete="off"
        placeholder="e.g. yellow"
        value={value}
        onChange={(e) =>
          onChange(e.target.value.trim() ? e.target.value : undefined)
        }
      />
    </div>
  );
}
