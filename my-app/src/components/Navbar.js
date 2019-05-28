import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
import { ButtonContainer } from './ButtonContainer'
import { NavWrapper } from "./NavWrapper";


export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-lg px-sm-5">
                <Link to="/">
                    <img src={logo} alt="store" className="navbar-brand" />
                </Link>
                <div className="navbar-nav ml-5">
                    <Link className="nav-item nav-link" to="/">products</Link>
                </div>
                <Link className="ml-auto" to="/cart">
                    <ButtonContainer>
                        <i className="fas fa-cart-plus"></i>my cart
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        )
    }
}
