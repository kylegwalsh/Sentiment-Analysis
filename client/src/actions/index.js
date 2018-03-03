import { UPDATE_FILTERS, CLEAR_FILTERS } from './types';

export function updateFilters (name, value) {
  return {
    type: UPDATE_FILTERS,
    payload: {
      name,
      value
    }
  };
}

export function clearFilters () {
  return {
    type: CLEAR_FILTERS
  };
}
