# Currency Converter App

A modern, responsive currency converter application built with the latest web technologies.

## Tech Stack

- **React 19** - Latest React version with concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **React Query (TanStack Query)** - Powerful data synchronization for React
- **Vite** - Fast build tool and development server
- **Vitest** - Modern testing framework
- **React Testing Library** - Testing utilities for React components

## Application Features

- **Real-time Currency Conversion**: Fetches live exchange rates from exchangerate-api.com
- **Multiple Currency Support**: Supports INR as base currency with conversion to USD, EUR, GBP, and others
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Type-Safe**: Full TypeScript support for reliable code
- **Error Handling**: Graceful handling of API errors and loading states
- **Modern UI**: Clean, modern interface with Tailwind CSS styling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-ts-19-currency-converter
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Running Tests

Execute the test suite:
```bash
npm test
```

The tests cover:
- Component rendering
- Currency conversion logic
- API integration
- Error handling
- User interactions

### Building for Production

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## API Integration

The application uses the ExchangeRate-API:
- **Base URL**: `https://api.exchangerate-api.com/v4/latest/INR`
- **Features**: Real-time exchange rates with INR as base currency

## Project Structure

```
src/
├── components/
│   ├── CurrencyConverter.tsx
│   └── __tests__/
│       └── CurrencyConverter.test.tsx
├── test/
│   └── setup.ts
├── App.tsx
├── main.tsx
└── style.css
```

## Development

- Uses Vite for fast HMR (Hot Module Replacement)
- TypeScript for type checking
- ESLint and Prettier for code quality
- Vitest for unit testing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests and build
6. Submit a pull request

## License

This project is licensed under the MIT License.