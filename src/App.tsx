import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CurrencyConverter from './components/CurrencyConverter';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <CurrencyConverter />
      </div>
    </QueryClientProvider>
  );
}

export default App;