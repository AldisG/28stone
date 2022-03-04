import './App.scss';
import { motion } from 'framer-motion';
import SearchForm from './components/search_form/SearchForm';
import SearchResults from './components/search_results/SearchResults';
import StockDetails from './components/stock_details/StockDetails';
import { initial } from './store/util';

const App = () => {
  return (
    <div className="flex-c-c App-wrapper">
      <motion.div
        variants={initial}
        initial={initial.start}
        animate={initial.end}
        className="App"
      >
        <div className="search-section-wrapper">
          <div className="search-section">
            <SearchForm />
            <SearchResults />
          </div>
        </div>
        <StockDetails />
      </motion.div>
    </div>
  );
};

export default App;
