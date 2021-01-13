import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

export class SingleProduct extends Component {
  constructor() {
    super()
  }
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
    const {
      name,
      description,
      price,
      imageUrl,
      inventoryAmount,
      category
    } = product
    if (!product.id) {
      return <h1>Loading...</h1>
    }
    return (
      <div className="single-product">
        <h1>Name: {name} </h1>
        <h5>Description: {description}</h5>
        <h5>Price: {price}</h5>
        <h5>In stock: {inventoryAmount}</h5>
        <h5> Category: {category}</h5>
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
