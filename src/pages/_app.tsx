import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import SWRProvider from '~/providers/swrProvider';
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from 'next/font/google'
import Layout from '~/components/layout'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRProvider>
      <Layout>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
    </SWRProvider>
  )
}
