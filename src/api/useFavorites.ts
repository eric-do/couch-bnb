import {
  useQuery,
  useMutation
} from '@tanstack/react-query'
import { axios } from '~/lib/axios';
import { queryClient } from '~/lib/reactQuery';

const endpoint = `/api/me/favorites`;

export const getFavorites = (): Promise<string[]> => {
  return axios.get(endpoint);
}

export default function useGetFavorites() {
  const { data, error, isLoading } = useQuery<string[]>({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  return {
    favorites: data,
    isLoading,
    isError: error
  };
}

export const addFavorite = (id: string): Promise<string> => {
  return axios.post(endpoint,  { id } )
}

export function useAddFavorite(listingId: string) {
  const { isSuccess, isLoading, isError, mutate } = useMutation({
    mutationFn: () => addFavorite(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites']
      });
    },
    onMutate: async (newListingId) => {
      await queryClient.cancelQueries(['favorites'])
      const previousFavorites = queryClient.getQueryData<string[]>(['favorites'])

      queryClient.setQueryData(['favorites'], [...(previousFavorites || []), newListingId])
      return { previousFavorites }
    },
    onError: (_, __, context: any) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    }
  })

  return { mutate, isSuccess, isLoading, isError };
}

export const deleteFavorite = (listingId: string): Promise<string> => {
  return axios.delete(`${endpoint}/${listingId}`);
}

export function useDeleteFavorite(listingId: string) {
  const { isSuccess, isLoading, isError, mutate } = useMutation({
    mutationFn: () => deleteFavorite(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites']});
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['favorites']);
      const previousFavorites = queryClient.getQueryData<string[]>(['favorites']);

      queryClient.setQueryData(['favorites'], [...(previousFavorites || [])]);
      return { previousFavorites }
    },
    onError: (_, __, context: any) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['favorites'], context.previousFavorites);
      }
    }
  });

  return { mutate, isSuccess, isLoading, isError };
}