import { useState, useEffect } from 'react';
import './App.css';

function App() {
  interface QuoteInterface {
    text: string;
    author: string;
  }

  const defaultQuote: QuoteInterface = {
    text: '',
    author: '',
  };

  const [quotes, setQuotes] = useState<QuoteInterface[]>([]);
  const [selectedQuote, setSelectedQuote] =
    useState<QuoteInterface>(defaultQuote);

  const apiEndpoint = 'https://type.fit/api/quotes';

  const updateQuote = () => {
    const quote = getRandomQuote(quotes);
    setSelectedQuote(quote);
  };

  const getRandomQuote = (quotes: QuoteInterface[]): QuoteInterface => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiEndpoint);
      const quotes: QuoteInterface[] = await response.json();
      setQuotes(quotes);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      updateQuote();
    }
  }, [quotes]);

  return (
    <div className='max-w-xl mx-auto mt-4 shadow border-2'>
      <div className='bg-purple-400 p-4 text-white font-semibold text-center'>
        <h1 className='text-4xl'>Quote Generator</h1>
      </div>
      <div className='p-4'>
        <button
          onClick={updateQuote}
          className='border-2 border-purple-600 text-purple-950 hover:opacity-10 rounded-xl p-3 mx-auto block text-lg font-semibold'
        >
          New Quote
        </button>
        <q className='block mt-4 text-lg'>{selectedQuote.text}</q>
        <cite className='block text-2xl mt-2 text-center'>
          - {selectedQuote.author}
        </cite>
      </div>
    </div>
  );
}

export default App;
