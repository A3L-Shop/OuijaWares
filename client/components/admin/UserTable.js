import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchUsers, toggleAdminStatus} from '../../store/allUsers'
import User from './User'

export class UserTable extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchUsers()
  }

  handleChange(id) {
    this.props.toggleAdminStatus(id)
  }

  render() {
    const users = this.props.users || []
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>E-Mail</td>
              <td>Name</td>
              <td>Admin</td>
            </tr>
            {users.length &&
              users.map(user => (
                <User
                  key={user.id}
                  handleChange={this.handleChange}
                  userId={this.props.userId}
                  {...user}
                />
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.allUsers,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    toggleAdminStatus: id => dispatch(toggleAdminStatus(id))
  }
}

export default connect(mapState, mapDispatch)(UserTable)
