import BaseService from './BaseService';
import config from '../config/config.dev';
import { plainToClass } from 'class-transformer';
import UserModel from '../models/UserModel';

export class UserService {

  resource = '/users';

  fetchUsersFromLocalApi() {
    return BaseService.get(config.API.LOCAL + this.resource).then(data => plainToClass(UserModel, data.data));
  }

  fetchUsersFromExternalApi(resultsCount) {
    const resultsQuery = resultsCount || 10;
    return BaseService.get(config.API.EXTERNAL + `?results=${resultsQuery}&inc=name,email,login,picture`).then((data) => {
      return data.data.results.map((entity, idx) => {
        return plainToClass(UserModel, {
          id: entity.id,
          firstName: entity.name.first,
          lastName: entity.name.last,
          email: entity.email,
          uuid: entity.login.uuid,
          pictureUrl: entity.picture.thumbnail
        });
      })
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
