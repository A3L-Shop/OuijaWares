import React, {Component} from 'react'
import Product from './Product'
import {fetchProducts} from '../store/allProducts'
import {connect} from 'react-redux'

export class AllProducts extends Component {
  async componentDidMount() {
    await this.props.fetchProducts()
  }

  render() {
    const products = this.props.products || []
    return (
      <div>
        <h2>A L L // P R O D U C T S</h2>
        <div id="products-container">
          {products.length
            ? products.map(product => (
                <Product product={product} key={product.id} />
              ))
            : 'No data'}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.allProducts,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
