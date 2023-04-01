import {
  useQuery,
} from '@tanstack/react-query'
import { axios } from '~/lib/axios';
import type { SearchLocation } from '~/types';


export const getLocations = (q: string): Promise<SearchLocation[]> => {
  return axios.get('https://nominatim.openstreetmap.org/search/',{
    params: {
      q,
      format: "jsonv2"
    }
  });
}
export function useGetLocations(query: string) {
  const { data, error, isLoading } = useQuery<SearchLocation[]>({
    queryKey: ['searchLocation', query],
    queryFn: () => getLocations(query)
  });

  console.log(new Set(data?.map(d => d.category)))
  return {
    locations: data,
    isLoading,
    isError: error
  };
}