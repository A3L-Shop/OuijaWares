import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../../store/allProducts'
import ProductRow from './ProductRow'

class InventoryTable extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products || []
    console.log(products)

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Inventory</td>
              <td>New Inventory</td>
            </tr>
            {products.map(product => (
              <ProductRow key={product.id} {...product} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(InventoryTable)
