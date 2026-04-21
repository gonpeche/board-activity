import { useQuery } from '@tanstack/react-query';
import { loadCards } from '@/api/loadCards';
import type { Card } from '@/types';

export default function useBoardNotes() {
  const { data, isLoading } = useQuery<Card[]>({
    queryKey: ['cards'],
    queryFn: loadCards,
    staleTime: Infinity,
  });

  return { data, isLoading };
}
