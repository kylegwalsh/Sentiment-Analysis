import { UPDATE_FILTERS, CLEAR_FILTERS } from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  ethnicity: '',
  gender: '',
  age: '',
  marital: ''
};

export default function (state = INITIAL_STATE, action) {
  let newState;

  switch (action.type) {
    case UPDATE_FILTERS:
      newState = { ...state, [action.payload.name]: action.payload.value };
      return newState;
    case CLEAR_FILTERS:
      newState = INITIAL_STATE;
      return newState;
  }

  return state;
}
