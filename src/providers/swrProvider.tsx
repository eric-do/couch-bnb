import { SWRConfig } from 'swr';

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

interface Props {
  children: React.ReactNode;
}
export default function SWRProvider({ children }: Props) {
  return (
    <SWRConfig value={{ fetcher }} >
      { children }
    </SWRConfig>
  )
}