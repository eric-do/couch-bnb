import '@testing-library/jest-dom/extend-expect';
import { FC, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from './mocks/server';

type AllTheProvidersProps = {
    children: ReactNode;
};

const queryClient = new QueryClient();

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
});

// Clean up after the tests are finished.
afterAll(() => server.close());

const AllTheProviders: FC<AllTheProvidersProps> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
            {children}
    </QueryClientProvider>
);

const customRender = (ui: any, options?: any) =>
    render(ui, { wrapper: () => <AllTheProviders>{ui}</AllTheProviders>, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export {
  customRender as render,
  server
 };