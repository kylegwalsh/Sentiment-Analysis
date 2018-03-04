import { UPDATE_FILTERS, CLEAR_FILTERS, COMPANIES_SUCCESS } from './types';

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

export function setApiData(payload) {
    return {
      type: COMPANIES_SUCCESS,
      payload: payload
    }
}
