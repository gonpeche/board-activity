import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import useBoardNotes from '@/hooks/useBoardNotes';
import type { Card } from '@/types';

jest.mock('@/hooks/useBoardNotes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseBoardNotes = useBoardNotes as jest.MockedFunction<typeof useBoardNotes>;

const cards: Card[] = [
  {
    id: '1',
    text: 'Checkout button is hard to find',
    x: 0,
    y: 0,
    author: 'user_11',
    color: 'yellow',
    createdAt: '2026-04-20T08:16:40Z',
  },
  {
    id: '2',
    text: 'Search results are too broad',
    x: 0,
    y: 0,
    author: 'user_3',
    color: 'blue',
    createdAt: '2026-04-20T08:14:22Z',
  },
  {
    id: '3',
    text: 'Notifications are easy to miss',
    x: 0,
    y: 0,
    author: 'user_19',
    color: 'red',
    createdAt: '2026-04-20T08:59:35Z',
  },
];

describe('Board filters integration', () => {
  beforeEach(() => {
    mockedUseBoardNotes.mockReturnValue({
      data: cards,
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('filters cards by author and color', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/author/i), 'user_11');
    expect(screen.getByText(/checkout button is hard to find/i)).toBeInstanceOf(HTMLElement);
    expect(screen.queryByText(/search results are too broad/i)).toBeNull();

    await user.type(screen.getByLabelText(/color/i), 'yellow');
    expect(screen.getByText(/checkout button is hard to find/i)).toBeInstanceOf(HTMLElement);
    expect(screen.queryByText(/notifications are easy to miss/i)).toBeNull();
  });

  it('sorts cards by date when sort selection changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByLabelText(/sort by date/i), 'desc');
    let firstCard = screen.getAllByRole('article')[0];
    expect(
      within(firstCard).getByText(/notifications are easy to miss/i)
    ).toBeInstanceOf(HTMLElement);

    await user.selectOptions(screen.getByLabelText(/sort by date/i), 'asc');
    firstCard = screen.getAllByRole('article')[0];
    expect(
      within(firstCard).getByText(/search results are too broad/i)
    ).toBeInstanceOf(HTMLElement);
  });

  it('exposes search region and labeled filter controls for accessibility', () => {
    render(<App />);

    expect(
      screen.getByRole('search', { name: /filter board notes/i })
    ).toBeInstanceOf(HTMLElement);
    expect(screen.getByLabelText(/author/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByLabelText(/color/i)).toBeInstanceOf(HTMLElement);
    expect(screen.getByLabelText(/sort by date/i)).toBeInstanceOf(HTMLElement);
  });
});
