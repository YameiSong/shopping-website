import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()

// <ProductProvider /> should be at the highest hierarchy
export default class ProductProvider extends Component {
    state = {
        products: [], // Bad solution: using "products: storeProducts" is actually use object by reference. When we will change "products" later, the "storeProducts" in data.js will also be changed.
        detailProduct: detailProduct // This is also a reference of object. But since we won't change "detailProduct", so we didn't need to destruct and copy the prop.
    }
    componentDidMount() {
        this.setProducts()
    }
    setProducts = () => {
        let tempProducts = []
        storeProducts.forEach(item => {
            const singleItem = { ...item }
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState({ products: tempProducts })
    }
    handleDetail = () => {
        console.log('hello from detail')
    }
    addToCart = () => {
        console.log('hello from add to cart')
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