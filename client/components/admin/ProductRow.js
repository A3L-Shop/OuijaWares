import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editInventoryAmount} from '../../store/allProducts'

export class ProductRow extends Component {
  constructor(props) {
    super()
    this.state = {
      newInv: props.inventoryAmount
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({newInv: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.editInventoryAmount(this.props.id, this.state.newInv)
  }

  render() {
    const {name, inventoryAmount} = this.props

    return (
      <tr>
        <td>{name}</td>
        <td>{inventoryAmount}</td>
        <td>
          <form onSubmit={this.handleSubmit}>
            <input
              type="number"
              min="0"
              name="newInv"
              value={this.state.newInv}
              onChange={this.handleChange}
            />
            <button type="submit">Change</button>
          </form>
        </td>
      </tr>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    editInventoryAmount: (id, inv) => dispatch(editInventoryAmount(id, inv))
  }
}

export default connect(null, mapDispatch)(ProductRow)
