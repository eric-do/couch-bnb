import {
  useQuery,
} from '@tanstack/react-query'
import { axios } from '~/lib/axios';
import { IHouseCard } from '~/types';

export const getListings = (): Promise<IHouseCard[]> => {
  return axios.get('/api/listings');
}

export default function useGetListings() {
  const { data, error, isLoading } = useQuery<IHouseCard[]>({
    queryKey: ['listings'],
    queryFn: () => getListings()
  });

  return {
    listings: data,
    isLoading,
    isError: error
  };
}