import React, { Component } from 'react'
import { ProductConsumer } from '../context'
import { Link } from 'react-router-dom'
import { ButtonContainer } from './ButtonContainer'

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { id, title, img, price, company, info, inCart, count, total } = value.detailProduct
          return (
            <div className="container py-5">
              {/* title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>

              {/* product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product" />
                </div>

                {/* product text */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>model: {title}</h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    made by: {company}
                  </h4>
                  <h4 className="text-blue">
                    <strong>
                      price: ${price}
                    </strong>
                  </h4>
                  <p className="font-weight-bold mt-3 mv-0">
                    some info about product:
                  </p>
                  <p className="text-muted lead">{info}</p>

                  {/* buttons */}
                  <div>
                    <Link to="/">
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      cart
                      disabled={inCart ? true : false}
                      onClick={() => { value.addToCart(id) }}
                    >
                      {inCart ? "in cart" : "add to cart"}
                    </ButtonContainer>
                  </div>

                </div>
              </div>

            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}
