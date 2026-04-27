import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Rates {
  [key: string]: number;
}

interface ApiResponse {
  rates: Rates;
}

const fetchRates = async (): Promise<ApiResponse> => {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
  if (!response.ok) {
    throw new Error('Failed to fetch rates');
  }
  return response.json();
};

const CurrencyConverter: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['rates'],
    queryFn: fetchRates,
  });

  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('INR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<string>('');

  const currencies = data ? Object.keys(data.rates).concat('INR') : [];

  useEffect(() => {
    if (data && amount && fromCurrency && toCurrency) {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) return;

      let result: number;
      if (fromCurrency === 'INR') {
        result = numAmount * data.rates[toCurrency];
      } else if (toCurrency === 'INR') {
        result = numAmount / data.rates[fromCurrency];
      } else {
        // Convert to INR first, then to target
        const inrAmount = numAmount / data.rates[fromCurrency];
        result = inrAmount * data.rates[toCurrency];
      }

      setConvertedAmount(result.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium mb-2">Amount</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="fromCurrency" className="block text-sm font-medium mb-2">From Currency</label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="toCurrency" className="block text-sm font-medium mb-2">To Currency</label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="convertedAmount" className="block text-sm font-medium mb-2">Converted Amount</label>
        <input
          id="convertedAmount"
          type="text"
          value={convertedAmount}
          readOnly
          className="w-full p-2 border border-gray-300 rounded bg-gray-50"
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;