# Write-Up

## 1. How I approached the challenge and scoped the work

I allocated 20% of my time to discovery and frontend planning: interpreting the challenge, defining the MVP feature set, and establishing two architectural principles that shaped every component decision — keep components presentational by abstracting async and derived state behind custom hooks, and keep filtering logic pure and outside the render tree. That meant data-fetching lived in `useBoardNotes` (wrapping TanStack Query), filter and sort logic lived in a standalone `applyBoardQuery` function, and `App` composed both without owning either. In parallel I defined a lightweight UI direction and listed performance and a11y items to implement or defer explicitly.

---

## 2. Assumptions

- A desktop-first layout was appropriate for reviewing a post-session activity.
- Post-session review is content-centric: author, text, and time matter more than x/y on the canvas, so coordinates stay in the model but aren't rendered spatially.
- A static JSON + in-memory filter/sort was sufficient for the exercise.
- The highest-impact accessibility work was the task path: search/filter controls, sort, scrollable results, and explicit feedback when data is loading or when filters yield no matches — so I invested there first.

---

## 3. Frontend Architecture

### A) Component structure

```
main.tsx
└── QueryClientProvider (TanStack Query)
    └── App
        │   useBoardNotes()              // fetch + cache cards
        │   useState<BoardQuery>         // author / color / sort state
        │   useMemo → applyBoardQuery()  // derived visible list
        │
        ├── [if isLoading]
        │   └── LoadingSpinner
        │
        └── [if loaded]
            ├── <header>
            │   ├── <h1> Board activity
            │   └── <p>  subtitle
            │
            ├── BoardFilters
            │   ├── AuthorInput   <input type="search">
            │   ├── ColorInput    <input type="search">
            │   └── DateSort      <select>
            │
            └── BoardResults
                ├── [if results.length === 0]
                │   └── <p role="status">  No cards found
                │
                └── [if results.length > 0]
                    └── <ul role="list">  (scrollable grid)
                        └── <li> × N
                            └── Card  <article aria-label="...">
                                ├── note text  (line-clamp-4)
                                └── author
```

### B) State management

- **Server / async data:** TanStack React Query (`useQuery`) loads cards once, `staleTime: Infinity` so the list stays cached for the session without refetch churn.
- **Client UI state:** `useState<BoardQuery>` in `App` for author, color, and sort; derived state for the visible list via `useMemo(() => applyBoardQuery(allCards, query), …)` so filtering and sorting stays predictable and cheap to reason about.

### C) Key technical decision

The decision to load the full session data once from the client (`cards.json` via fetch), cache it with TanStack Query, and apply filters and sort in memory with a pure `applyBoardQuery` function. That keeps components mostly presentational, moves data-fetching behind a small hook (`useBoardNotes`), and keeps list rules easy to unit test.

---

## 4. Performance & Accessibility

### Performance — implemented

- **Derived list in `useMemo`** — Recompute `applyBoardQuery(allCards, query)` only when `allCards` or `query` changes, not on every render.
- **Single fetch + cache** — TanStack Query loads `cards.json` once with `staleTime: Infinity`, avoiding refetch noise during interaction.
- **Constrained results surface** — Scrollable grid with a max height so the page doesn't grow without bound when there are many cards.

### Performance — next steps

- Virtualize the grid (e.g. TanStack Virtual) once lists are large enough that DOM size dominates.
- Debounce filter inputs if profiling shows work per keystroke on huge datasets.

### Accessibility — implemented

- **Live region on loading state** — `LoadingSpinner` uses `role="status"` + `aria-live="polite"` so assistive technology announces fetch progress without interrupting the user; the decorative SVG is `aria-hidden="true"` to avoid double-announcement.
- **Computed `aria-label` on truncated cards** — Cards apply `line-clamp` visually but expose the full author + text as a dynamically computed accessible name on the `<article>`, cleanly separating visual presentation from the accessibility tree.
- **Named search landmark** — The filter cluster is wrapped in `role="search"` with an explicit `aria-label`, giving screen reader users a direct landmark jump target rather than requiring linear navigation.
- **Explicit label association** — All three filter controls (author, color, sort) use `<label htmlFor>` + matching `id`, the strongest form of accessible name binding the browser exposes.
- **Reduced motion respect** — The spinner uses `motion-safe:animate-spin motion-reduce:animate-none`, honoring `prefers-reduced-motion` at the component level (WCAG 2.1 SC 2.3.3).
- **Keyboard-only focus styles** — `focus-visible:ring-*` scopes visible rings to keyboard navigation, keeping the UI clean for pointer users while remaining WCAG 2.4.7 compliant.

### Accessibility — next steps

- Add a `<main>` landmark wrapping the primary content so screen reader users can skip directly to the board on page load.
- Implement a skip-to-content link at the top of the document for keyboard-only users who would otherwise tab through the header on every visit.
- Add a polite live region that announces updated result counts (e.g. "12 cards found") whenever filters change, closing the feedback loop for non-visual users.

---

## 5. UX decisions

- **Spatial coordinates excluded from the review surface** — x/y position on the canvas is kept in the data model but not rendered. Post-session review is treated as a reading task (what was written, by whom, when) rather than a spatial one, so the interface is a scannable list rather than a canvas replica.
- **Real-time, no-submit filtering** — All three filters update the visible list on every keystroke or select change. There is no Apply button. The derived list is computed in `useMemo` so the response is synchronous and there is no perceived lag.
- **Fixed-height scrollable grid** — Results live inside a `max-h-[min(70vh,640px)]` / `overflow-y-auto` container. The page itself does not grow; the board is a bounded viewport band. This keeps the filters and header always visible without resorting to sticky positioning.
- **Full-UI loading gate** — While data is fetching, the entire interface is replaced by the spinner. Filters and the grid are not shown in a skeleton or disabled state; they appear only when there is data to interact with, avoiding partial-UI confusion.

---

## 6. AI Usage

- **Upfront planning and architecture** — used the RADIO frontend system design framework to work through requirements and iterate on a design proposal before writing any code: defining functional scope, proposing component boundaries and data flow, evaluating state management options and analyze performance & optimizations.
- **Mock data** — generated `cards.json` with realistic shapes, varied authors, colors, timestamps, and x/y coordinates.
- **Test suite** — scaffolded unit tests (Jest), integration tests (React Testing Library), and E2E specs (Playwright); all targeting filter correctness and accessibility.
- **UI refinements** — component-level styling assistance for minor polish details.
- **Documentation** — drafted and iterated on this write-up based on a codebase audit.

---

## 7. Tradeoffs & Next steps

### Tradeoffs

- **Load-all over paginated fetching** — `loadCards` fetches the entire `cards.json` payload in one request and hands it to TanStack Query, which caches it for the session (`staleTime: Infinity`). The alternative is server-side pagination: fetch a page of N cards, re-fetch on filter/sort change. Load-all was the right call here because the dataset is small and bounded (a single session's output), filtering and sorting are pure in-memory operations against the full set, and paginated fetching would have required either a real API or a fake one that simulates offset/limit against the same static file — complexity with no user-visible benefit. The tradeoff is that this approach does not scale to very large datasets; the switch point is when the JSON payload becomes large enough to block the initial render, at which point server-side filtering and cursor-based pagination become necessary.
- **TanStack Query over `useEffect` + `useState` for async data** — `useBoardNotes` wraps a single `useQuery` call. For one fetch with no mutations this is overhead compared to a plain `useEffect` + `useState` pair. The choice pays off in three ways: `isLoading`, `isError`, and `data` states are handled without manual flags; the cache layer means the component tree can re-mount without re-fetching; and the boundary between server state and client state is explicit by design.

### Next steps

- **Canvas replay view** — A "View on canvas" button opens a modal that renders all cards at their original x/y coordinates on a spatially accurate board. A timeline slider lets the reviewer scrub through session activity chronologically: advancing it reveals cards one by one in creation order, with the most recently added card highlighted via a ring pulse animation. All required data (`x`, `y`, `createdAt`) is already in the model; the work is entirely presentational.
- **Responsive layout** — Extend the desktop-first layout to tablet and mobile breakpoints; the grid column count and filter wrapping behaviour already adapt via Tailwind's `sm`/`md`/`lg` utilities, so the remaining work is tightening spacing, touch target sizes, and verifying the fixed-height scroll container on smaller viewports.

## 8. Tradeoffs & Next steps

- Around ~5.5 hours
