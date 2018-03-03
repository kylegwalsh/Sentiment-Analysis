import { combineReducers } from 'redux';
import filterReducer from './filter_reducer';

const rootReducer = combineReducers({
  filters: filterReducer
});

export default rootReducer;
