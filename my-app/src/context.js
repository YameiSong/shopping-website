import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()

// <ProductProvider /> should be at the highest hierarchy
export default class ProductProvider extends Component {
    state = {
        products: storeProducts,
        detailProduct: detailProduct
    }
    handleDetail = () => {
        console.log('hello from detail')
    }
    addToCart = () => {
        console.log('hello from add to cart');
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart
            }}>
            {/* the below code means showing the child component of <ProductContext />. Without it the page would be blank. */}
            {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }