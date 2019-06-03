import { FETCH_USERS } from './UserActionTypes';
import UserService from '../../services/UserService';

export const fetchUsersFromLocalApi = (resultCount) => dispatch => {
  UserService.fetchUsersFromLocalApi(resultCount).then((data) => {
    if (data.length) {
      dispatch({
        type: FETCH_USERS,
        payload: data
      })
    } else {
      fetchUsersFromExternalApi(resultCount)(dispatch);
    }
  })
};

export const fetchUsersFromExternalApi = (resultCount) => dispatch => {
  UserService.fetchUsersFromExternalApi(resultCount).then((data) => {
    dispatch({
      type: FETCH_USERS,
      payload: data
    })
  })
};
