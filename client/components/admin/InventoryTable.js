import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/allProducts'

export class InventoryTable extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  render() {
    const products = this.props.products || []

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Inventory</td>
            </tr>
            {products.legnth &&
              products.map(prod => {
                return (
                  <tr key={prod.id}>
                    <td>{prod.name}</td>
                    <td>{prod.inventoryAmount}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(InventoryTable)
