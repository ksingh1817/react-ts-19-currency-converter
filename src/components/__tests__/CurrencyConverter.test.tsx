import { vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CurrencyConverter from '../CurrencyConverter';

// Mock fetch globally
global.fetch = vi.fn();

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

const mockRates = {
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
};

describe('CurrencyConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rates: mockRates }),
    });
  });

  it('renders the currency converter form', async () => {
    renderWithProviders(<CurrencyConverter />);

    await waitFor(() => {
      expect(screen.getByText('Currency Converter')).toBeInTheDocument();
    });

    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('From Currency')).toBeInTheDocument();
    expect(screen.getByLabelText('To Currency')).toBeInTheDocument();
    expect(screen.getByLabelText('Converted Amount')).toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    renderWithProviders(<CurrencyConverter />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('loads currencies after data fetch', async () => {
    renderWithProviders(<CurrencyConverter />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('INR')).toBeInTheDocument();
      expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
    });
  });

  it('converts currency correctly', async () => {
    renderWithProviders(<CurrencyConverter />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('INR')).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText('Amount');
    fireEvent.change(amountInput, { target: { value: '100' } });

    await waitFor(() => {
      const convertedInput = screen.getByLabelText('Converted Amount');
      expect(convertedInput).toHaveValue('1.20'); // 100 * 0.012
    });
  });

  it('handles currency change correctly', async () => {
    renderWithProviders(<CurrencyConverter />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('INR')).toBeInTheDocument();
    });

    const toCurrencySelect = screen.getByLabelText('To Currency');
    fireEvent.change(toCurrencySelect, { target: { value: 'EUR' } });

    const amountInput = screen.getByLabelText('Amount');
    fireEvent.change(amountInput, { target: { value: '100' } });

    await waitFor(() => {
      const convertedInput = screen.getByLabelText('Converted Amount');
      expect(convertedInput).toHaveValue('1.10'); // 100 * 0.011
    });
  });

  it('handles API error', async () => {
    (global.fetch as any).mockRejectedValue(new Error('API Error'));

    renderWithProviders(<CurrencyConverter />);

    await waitFor(() => {
      expect(screen.getByText('Error: API Error')).toBeInTheDocument();
    });
  });

  it('handles invalid amount input', async () => {
    renderWithProviders(<CurrencyConverter />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('INR')).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText('Amount');
    const convertedInput = screen.getByLabelText('Converted Amount');

    // First set a valid amount
    fireEvent.change(amountInput, { target: { value: '100' } });
    await waitFor(() => {
      expect(convertedInput).toHaveValue('1.20');
    });

    // Then set invalid amount
    fireEvent.change(amountInput, { target: { value: 'abc' } });

    // Should not update converted amount
    expect(convertedInput).toHaveValue('1.20');
  });
});