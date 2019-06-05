export default class UserModel {
  constructor(id, firstName, lastName, email, uuid, pictureUrl) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.uuid = uuid;
    this.pictureUrl = pictureUrl;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
