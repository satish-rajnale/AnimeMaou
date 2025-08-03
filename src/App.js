import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/ui/Header';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';
import TopAnime from './pages/TopAnime';
import Seasonal from './pages/Seasonal';
import Upcoming from './pages/Upcoming';
import Watchlist from './pages/Watchlist';
import SearchResults from './pages/SearchResults';
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetail />} />
              <Route path="/top" element={<TopAnime />} />
              <Route path="/seasonal" element={<Seasonal />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
        </div>
      </Router>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
