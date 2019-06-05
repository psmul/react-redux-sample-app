import {DELETE_LOCAL_USER, DELETE_USER, FETCH_USERS} from '../actions/UserActionTypes'

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
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => {
          return user.id !== action.payload
        })
      };
    case DELETE_LOCAL_USER:
      return {
        ...state,
        users: state.users.filter((user) => {
          return user.uuid !== action.payload
        })
      };
    default:
      return state;
  }
}
