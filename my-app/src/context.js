import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'
import produce from 'immer'

const ProductContext = React.createContext()

// <ProductProvider /> should be at the highest hierarchy
export default class ProductProvider extends Component {
    state = {
        products: [], // Bad solution: using "products: storeProducts" is actually use object by reference. When we will change "products" later, the "storeProducts" in data.js will also be changed.
        detailProduct: detailProduct, // This is also a reference of object. But since we won't change "detailProduct", so we didn't need to destruct and copy the prop.
        cart: [],
        modalProduct: detailProduct,
        modalOpen: false,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    }
    componentDidMount() {
        this.setProducts()
    }
    setProducts = () => { // copy storeProducts to state.products
        // let tempProducts = []
        // storeProducts.forEach(item => {
        //     const singleItem = { ...item }
        //     tempProducts = [...tempProducts, singleItem]
        // })
        // this.setState(() => {
        //     return { products: tempProducts }
        // })

        // -----------------new method-------------------------------
        const tempProducts = produce(storeProducts, draft => { })
        this.setState(() => {
            return { products: tempProducts }
        })
    }
    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id)
        return product
    }
    handleDetail = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return { detailProduct: product }
        })
    }
    addToCart = (id) => {
        // let tempProducts = [...this.state.products]
        // const index = tempProducts.indexOf(this.getItem(id)) // id is a property of a product, not index in the products array
        // const product = tempProducts[index] // tempProducts[index] is a object. product use this object by reference, meaning that all changes on product will be made to tempProducts[index] as well.
        // product.inCart = true
        // product.count = 1
        // const price = product.price
        // product.total = price // total = price*count, count=1
        // this.setState(
        //     () => {
        //         return {
        //             products: tempProducts,
        //             cart: [...this.state.cart, product]
        //         }
        //     },
        //     () => this.addTotals()
        // )

        // -------------------------new method---------------------
        const index = this.state.products.indexOf(this.getItem(id))
        const newState = produce(this.state, draft => {
            let product = draft.products[index]
            product.inCart = true
            product.count = 1
            const price = product.price
            product.total = price // total = price*count, count=1

            draft.cart = [...draft.cart, product]
        })

        this.setState(
            () => { return newState },
            () => this.addTotals()
        )
    }
    openModal = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return {
                modalProduct: product,
                modalOpen: true
            }
        })
    }
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }
    increment = (id) => {
        const selectedProduct = this.state.cart.find(item=>item.id===id)
        const index = this.state.cart.indexOf(selectedProduct)
        const newCart = produce(this.state.cart, draft => {
            let product = draft[index]
            product.count += 1
            product.total = product.count * product.price
        })
        this.setState(
            () => { return { cart: newCart } },
            () => this.addTotals()
        )
    }
    decrement = (id) => {
        console.log('this is a decrement method');

    }
    removeItem = (id) => {
        // let tempProducts = [...this.state.products]
        // let tempCart = [...this.state.cart]

        // tempCart = tempCart.filter(item => item.id !== id)

        // const index = tempProducts.indexOf(this.getItem(id))
        // let removedProduct = tempProducts[index] // object is copied by reference. So changes on removedProducts will be reflected to tempProducts
        // removedProduct.inCart = false
        // removedProduct.count = 0
        // removedProduct.total = 0

        // this.setState(() => {
        //     return {
        //         cart: [...tempCart],
        //         products: [...tempProducts]
        //     }
        // }, () => this.addTotals())

        // ----------------new method------------------------------------
        const index = this.state.products.indexOf(this.getItem(id))
        const newState = produce(this.state, draft => {
            draft.cart = draft.cart.filter(item => item.id !== id)
            let removedProduct = draft.products[index]
            removedProduct.inCart = false
            removedProduct.count = 0
            removedProduct.total = 0
        })
        this.setState(
            () => { return newState },
            () => this.addTotals()
        )
    }
    clearCart = () => {
        this.setState(() => {
            return { cart: [] }
        }, () => {
            this.setProducts()
            this.addTotals()
        })
    }
    addTotals = () => {
        const subTotal = this.state.cart.reduce((acc, curr) => acc + curr.total, 0)
        const tempTax = subTotal * 0.1
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState(() => {
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {/* the below code means showing the child component of <ProductContext />. Without it the page would be blank. */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }