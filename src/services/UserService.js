import BaseService from './BaseService';
import config from '../config/config.dev';
import { plainToClass } from 'class-transformer';
import UserModel from '../models/UserModel';

export class UserService {

  fetchUsersFromLocalApi() {
    return BaseService.get(config.API.LOCAL + '/users').then(data => data.data);
  }

  fetchUsersFromExternalApi(resultsCount) {
    const resultsQuery = resultsCount || 10;
    return BaseService.get(config.API.EXTERNAL + `?results=${resultsQuery}&inc=name,email,login,picture`).then((data) => {
      return plainToClass(UserModel, data.data.results);
    });
  }



}

export default new UserService();
