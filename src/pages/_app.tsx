import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import QueryClientProvider from '~/providers/QueryClientProvider';
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Layout from '~/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <Layout>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </QueryClientProvider>
  )
}
