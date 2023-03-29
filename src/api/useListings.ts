import useSWR from 'swr';
import { IHouseCard } from '~/types';

export default function useListings() {
  const { data, error, isLoading } = useSWR<IHouseCard[]>(`/api/listings`);

  return {
    listings: data,
    isLoading,
    isError: error
  };
}