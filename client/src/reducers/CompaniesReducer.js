import {
  COMPANIES_LOADING,
  COMPANIES_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  information: [],
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.payload
      };
    case COMPANIES_LOADING:
      return {
        ...state,
        loading: true,
        companies: []
      };
  }

  return state;
}