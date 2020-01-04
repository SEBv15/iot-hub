import React, {Component} from 'react';

import { withRouter } from 'react-router-dom'
import './Menu.scss'

import api from './../api'

import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "shards-react";

class Menu extends Component {
    state = {
        current: "main",
        toggleOpen: false,
        admin: false
    }
    componentDidMount() {
        var token = localStorage.getItem("token")
        if (!token) {
            this.props.history.replace("/login")
        }
        this.setState({admin: api.admin()})
    }
    linkClick = (location) => {
        return (e) => {
            this.props.history.push(location)
            e.preventDefault()
        }
    }
    toggleNavbar = () => {
        this.setState({toggleOpen: !this.state.toggleOpen})
    }
    render() {
        return (
            <div className="menu">
                <Navbar type="light" theme="halftransparent" expand="md">
                    <NavbarBrand href="#">Strempfer IoT</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} />

                    <Collapse open={this.state.toggleOpen} navbar>
                        <Nav navbar>
                            <NavItem active={this.props.current === "dashboard"}>
                                <NavLink 
                                    active={this.props.current === "dashboard"}
                                    href="" 
                                    onClick={this.linkClick("/dashboard")}>
                                    Dashboard
                                </NavLink>
                            </NavItem>
                            <NavItem active={this.props.current === "account"}>
                                <NavLink 
                                    active={this.props.current === "account"}
                                    href="" 
                                    onClick={this.linkClick("/account")}>
                                    Account
                                </NavLink>
                            </NavItem>
                            {this.state.admin?(<NavItem active={this.props.current === "users"}>
                                <NavLink 
                                    active={this.props.current === "users"}
                                    href="" 
                                    onClick={this.linkClick("/users")}>
                                    Users
                                </NavLink>
                            </NavItem>):null}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default withRouter(Menu)