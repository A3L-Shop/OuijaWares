import React, {Component} from 'react'
import SingleProduct from './SingleProduct'

const dumyProducts = [
  {
    id: 1,
    name: 'ghost',
    price: 10,
    description: 'scary',
    image:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.co.uk%2Fcbbc%2Fjoinin%2Fwhat-would-you-do-as-a-ghost&psig=AOvVaw3LN_S8tgKujlElHugCEojw&ust=1610560211591000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiu2736lu4CFQAAAAAdAAAAABAD'
  }
]

export default class AllProducts extends Component {
  render() {
    const allProducts = this.props.allProducts || []
    return (
      <div>
        <h1> All Products</h1>
        {dumyProducts.map(product => (
          <SingleProduct product={product} key={product.id} />
        ))}
      </div>
    )
  }
}
