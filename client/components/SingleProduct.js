import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

export class SingleProduct extends Component {
  // constructor() {
  //   super()
  // }
  componentDidMount() {
    try {
      const productId = this.props.match.params.productId
      this.props.getSingleProduct(productId)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const product = this.props.product || {}
    console.log('in singleProduct', product)
    const {
      name,
      description,
      price,
      imageUrl,
      inventoryAmount,
      category
    } = product
    if (!product.id) {
      return <h2>Loading...</h2>
    }
    return (
      <div className="single-product">
        <h1>Name: {name}</h1>
        <h5 id="description">Description: {description}</h5>
        <h5 id="price">Price: {price}</h5>
        <h5 id="inventoryAmount">In stock: {inventoryAmount}</h5>
        <h5 id="category"> Category: {category}</h5>
        <img src={imageUrl} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(fetchSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
