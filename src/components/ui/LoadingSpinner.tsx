export default function LoadinSpinner() {
  return (
    <div
      className="flex min-h-[60vh] w-full flex-1 flex-col items-center justify-center gap-3 px-4"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Fetching data...
      </p>
      <div
        className="h-9 w-9 motion-safe:animate-spin motion-reduce:animate-none rounded-full border-2 border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400"
        aria-hidden
      />
    </div>
  );
}
