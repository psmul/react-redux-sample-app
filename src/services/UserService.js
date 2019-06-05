import BaseService from './BaseService';
import config from '../config/config.dev';
import { plainToClass } from 'class-transformer';
import UserModel from '../models/UserModel';
import axios from 'axios';

export class UserService {

  resource = '/users';

  fetchUsersFromLocalApi() {
    return BaseService.get(config.API.LOCAL + this.resource).then(data => plainToClass(UserModel, data.data));
  }

  fetchUsersFromExternalApi(resultsCount) {
    const resultsQuery = resultsCount || 10;
    return BaseService.get(config.API.EXTERNAL + `?results=${resultsQuery}&inc=name,email,login,picture`).then((data) => {
      return this.mapAndSaveUsersToLocalDB(data.data.results)
    });
  }

  createUser(user) {
    return BaseService.post(config.API.LOCAL + this.resource, user);
  }

  updateUser(user) {
    return BaseService.put(config.API.LOCAL + `${this.resource}/${user.id}`, user);
  }

  deleteUser(user) {
    return BaseService.delete(config.API.LOCAL + `${this.resource}/${user.id}`);
  }

  mapAndSaveUsersToLocalDB(data) {
    const result = data.map((entity) => {
      return plainToClass(UserModel, {
        id: entity.id,
        firstName: entity.name.first,
        lastName: entity.name.last,
        email: entity.email,
        uuid: entity.login.uuid,
        pictureUrl: entity.picture.thumbnail
      });
    });

    return Promise.all(
      result.map((user) => {
        return axios.post(config.API.LOCAL + this.resource, user);
      })
    )
    .then((data) => {
      return data.map((resData) => {
        return plainToClass(UserModel, resData.data);
      })
    })
  }


}

export default new UserService();
