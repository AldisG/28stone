import './App.scss';
import { motion } from 'framer-motion';
import SearchForm from './components/search_form/SearchForm';
import SearchResults from './components/search_results/SearchResults';
import StockDetails from './components/stock_details/StockDetails';

const initial = {
  start: { opacity: 0 },
  end: { opacity: 1 },
};

const App = () => {
  return (
    <motion.div
      variants={initial}
      initial={initial.start}
      animate={initial.end}
      className="App"
    >
      <div className="search-section">
        <SearchForm />
        <SearchResults />
      </div>
      <StockDetails />
    </motion.div>
  );
};

export default App;
