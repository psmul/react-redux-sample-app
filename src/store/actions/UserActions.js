import {DELETE_LOCAL_USER, DELETE_USER, FETCH_USERS} from './UserActionTypes';
import UserService from '../../services/UserService';

export const fetchUsersFromLocalApi = (resultCount) => dispatch => {
  UserService.fetchUsersFromLocalApi(resultCount).then((data) => {
    if (data.length) {
      dispatch({
        type: FETCH_USERS,
        payload: data
      })
    }
    else {
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

export const deleteUser = (user) => dispatch => {
  UserService.deleteUser(user).then((data) => {
    dispatch({
      type: DELETE_USER,
      payload: user.id
    })
  })
};

export const deleteLocalUser = (user) => dispatch => {
    dispatch({
      type: DELETE_LOCAL_USER,
      payload: user.uuid
    })
};
