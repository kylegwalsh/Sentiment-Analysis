import {
  COMPANIES_LOADING,
  COMPANIES_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  information: [
    {
      name: 'google',
      sentiment: 50,
      diversity: 50,
    },
    {
      name: 'apple',
      sentiment: 55,
      diversity: 55,
    },
    {
      name: 'amazon',
      sentiment: 60,
      diversity: 60,
    }
  ],
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