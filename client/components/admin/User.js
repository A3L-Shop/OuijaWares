import React from 'react'

const User = ({id, email, name, isAdmin, handleChange, userId}) => {
  return (
    <tr>
      <td>{email}</td>
      <td>{name}</td>
      <td>
        <input
          type="checkbox"
          name="isAdminState"
          checked={isAdmin}
          disabled={userId === id}
          onChange={() => handleChange(id)}
        />
      </td>
    </tr>
  )
}

export default User
