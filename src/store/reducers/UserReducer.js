import { FETCH_USERS } from '../actions/UserActionTypes'

const initialState = {
  users: []
};

export default function (state = initialState, action) {
  if (action.type === FETCH_USERS) {
    return {
      ...state,
      users: action.payload
    }
  }
  return state;
}



