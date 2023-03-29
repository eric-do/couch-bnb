import useSWR from 'swr';

export default function useFavorites() {
  const { data, error, isLoading } = useSWR<string[]>(`/api/me/favorites`);

  return {
    favorites: data,
    isLoading,
    isError: error
  };
}