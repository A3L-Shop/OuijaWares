import React from 'react'

const User = ({id, email, name, isAdmin}) => {
  console.log(id, email, name, isAdmin)
  return (
    <tr>
      <td>{id}</td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{isAdmin ? 'true' : 'false'}</td>
    </tr>
  )
}

export default User
