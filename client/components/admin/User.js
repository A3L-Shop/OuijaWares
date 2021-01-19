import React from 'react'

const User = ({email, isAdmin}) => {
  return (
    <tr>
      <td>{email}</td>
      <td>{isAdmin}</td>
      <td>toggle?</td>
    </tr>
  )
}

export default User
