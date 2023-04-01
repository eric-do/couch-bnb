import {
  useQuery,
} from '@tanstack/react-query'
import { axios } from '~/lib/axios';

interface Location {
  place_id: string;
  boundingbox: readonly [minLat: string, maxLat: string, minLon: string, maxLon:string],
  lat: string;
  lon: string;
  display_name: string;
  category: string;
  importance: number;
}

export const getLocations = (q: string): Promise<Location[]> => {
  return axios.get('https://nominatim.openstreetmap.org/search/',{
    params: {
      q,
      format: "jsonv2"
    }
  });
}
export function useGetLocations(query: string) {
  const { data, error, isLoading } = useQuery<Location[]>({
    queryKey: ['searchLocations', query],
    queryFn: () => getLocations(query)
  });

  console.log(new Set(data?.map(d => d.category)))
  return {
    locations: data,
    isLoading,
    isError: error
  };
}