import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../../store/allUsers'
import User from './User'

export class UserTable extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    const users = this.props.users || []
    console.log('in userTable', users)
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>E-Mail</td>
              <td>Name</td>
              <td>Admin</td>
            </tr>
            {users.length &&
              users.map(user => <User key={user.id} {...user} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(UserTable)
