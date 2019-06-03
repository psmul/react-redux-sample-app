import React, { Component } from 'react';
import './UserList.scss';
import { connect } from "react-redux";
import { fetchUsersFromLocalApi } from '../../store/actions/UserActions';

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUsersFromLocalApi();
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
                <tr key={user.name.first + '_' + user.name.last}>
                  <td>
                    <img src={user.picture.thumbnail} alt=""/>
                  </td>
                  <td>{user.name.first}</td>
                  <td>{user.name.last}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.users;
};

const mapDispatchToProps = { fetchUsersFromLocalApi };

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
