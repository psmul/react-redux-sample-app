import React, { Component } from 'react';
import './UserList.scss';
import { connect } from "react-redux";
import { fetchUsersFromLocalApi, deleteUser, deleteLocalUser } from '../../store/actions/UserActions';
import Modal from 'react-modal';
import UserEditForm from '../UserEditForm/UserEditForm';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      selectedUser: null
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsersFromLocalApi();
  }

  componentWillReceiveProps(nextProps) {
    const usersLength = nextProps.users.length;

    if (!usersLength) {
      this.props.fetchUsersFromLocalApi();
    }
  }

  deleteSelectedUser(user) {
    const deleteConfirmation = window.confirm(`Please confirm deleting user: ${user.getFullName()}`);
    if(deleteConfirmation) {
      if(user.id) {
        this.props.deleteUser(user);
      } else {
        this.props.deleteLocalUser(user);
      }
    }
  }

  editUserData(user) {
    this.setState({
      isModalOpen: true,
      selectedUser: user
    });
  }

  closeModal(closingState) {
    this.setState({
      isModalOpen: false,
      selectedUser: null
    });
    if(closingState) {
      this.props.fetchUsersFromLocalApi();
    }
  }


  render() {
    return (
      <div className="UserList">
        <table className="UserList-table">
          <thead>
          <tr>
            <th>Photo</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody>
            {this.props.users.map(user => {
              return (
                <tr key={user.getFullName()}>
                  <td>
                    <img src={user.pictureUrl} alt=""/>
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <button onClick={this.editUserData.bind(this, user)}>Edit</button>
                    <button onClick={this.deleteSelectedUser.bind(this, user)}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.isModalOpen} style={customStyles}
               onRequestClose={this.closeModal}>
          {this.state.isModalOpen ? <UserEditForm user={this.state.selectedUser} closeModal={this.closeModal} /> : null}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.users;
};

const mapDispatchToProps = { fetchUsersFromLocalApi, deleteUser, deleteLocalUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
