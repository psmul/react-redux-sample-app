import BaseService from './BaseService';
import config from '../config/config.dev';
import { plainToClass } from 'class-transformer';
import UserModel from '../models/UserModel';

export class UserService {

  resource = '/users';

  fetchUsersFromLocalApi() {
    return BaseService.get(config.API.LOCAL + this.resource).then(data => data.data);
  }

  fetchUsersFromExternalApi(resultsCount) {
    const resultsQuery = resultsCount || 10;
    return BaseService.get(config.API.EXTERNAL + `?results=${resultsQuery}&inc=name,email,login,picture`).then((data) => {
      return plainToClass(UserModel, data.data.results);
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



}

export default new UserService();
