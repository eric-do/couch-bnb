import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react';
import { queryClient } from '~/lib/reactQuery';

interface Props {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: Props) {

  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  )
}