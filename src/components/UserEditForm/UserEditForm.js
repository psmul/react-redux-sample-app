import React, { Component } from 'react';
import './UserEditForm.scss';
import UserService from '../../services/UserService';

class UserEditForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  handleFirstNameChange(event) {
    this.changeSpecifiedNameField('firstName', event.target.value)
  }

  handleLastNameChange(event) {
    this.changeSpecifiedNameField('lastName', event.target.value)
  }

  changeSpecifiedNameField(field, value) {
    const user = this.state.user;
    user[field] = value;
    this.setState({ user });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.user.id) {
      this.actionOnUserObject('updateUser');
    } else {
      this.actionOnUserObject('createUser');
    }
  }

  actionOnUserObject(methodName) {
    UserService[methodName](this.state.user).then(() => {
      this.props.closeModal(true);
    })
  }

  onCancel(event) {
    event.preventDefault();
    this.props.closeModal(false)
  }

  render() {
    return (
      <div className="UserEditForm">
        <form onSubmit={this.handleSubmit}>
        <div className="UserEditForm-header">Edit selected user data</div>
        <hr/>
        <img src={this.props.user.pictureUrl} alt=""/>
          <div>
            <input type="text" name="firstName" value={this.state.user.firstName} onChange={this.handleFirstNameChange} />
          </div>
          <div>
            <input type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleLastNameChange} />
          </div>
        <hr/>
        <button onClick={this.onCancel}>Cancel</button>
        <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default UserEditForm;
