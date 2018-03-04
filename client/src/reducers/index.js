import { combineReducers } from 'redux';
import filterReducer from './filter_reducer';
import CompaniesReducer from './CompaniesReducer';

const rootReducer = combineReducers({
  filters: filterReducer,
  companies: CompaniesReducer
});

export default rootReducer;
