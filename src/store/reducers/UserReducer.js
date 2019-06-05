import {FETCH_USERS} from '../actions/UserActionTypes'

const initialState = {
  users: []
};

export default function (state = initialState, action) {
  switch(action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
