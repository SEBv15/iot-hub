import React, {Component} from 'react';
import { Link, useHistory } from 'react-router-dom'
import './Account.scss'

import Menu from './Menu'
import { FormInput, InputGroup, InputGroupAddon, InputGroupText, Button, Container, Col, Row, Modal, ModalHeader, ModalBody } from 'shards-react';
import api from '../api';

export default class Account extends Component {
    colSize = {
        lg: {size: 6, offset: 3},
        md: {size: 8, offset: 2},
        sm: {size: 10, offset: 1}
    }
    state = {
        password: "",
        error: null
    }
    async componentDidMount() {
        var user = await api.fetch("auth")
        if (user.error) {
            this.setState({error: user.error})
            return
        }
        this.user = user.user
        this.forceUpdate()
    }
    changePassword = (e) => {
        this.setState({password: e.target.value})
    }
    setPassword = async (e) => {
        console.log("SETTING")
        var res = await api.fetch("auth/changePassword", {
            password: this.state.password
        })
        if (res.error) {
            this.setState({error: res.error})
        } else {
            this.setState({password: ""})
        }
    }
    onKeyDown = (e) => {
        if (e.key === "Enter") {
            this.setPassword()
        }
    }
    render() {
        return (
            <div className="account">
                <Menu current="account" />
                <h2>Account</h2>
                <Container>
                    <Row>
                        <Col {...this.colSize}>
                            <InputGroup className="mb-2">
                                <InputGroupAddon type="prepend">
                                    <InputGroupText>Username</InputGroupText>
                                </InputGroupAddon>
                                <FormInput placeholder="Username" disabled value={this.user?this.user.username:""} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col {...this.colSize}>
                            <InputGroup className="mb-2">
                                <InputGroupAddon type="prepend">
                                    <InputGroupText>Password</InputGroupText>
                                </InputGroupAddon>
                                <FormInput onChange={this.changePassword} onKeyDown={this.onKeyDown} value={this.state.password} type="password" autoComplete="new-password" placeholder="New Password" />
                                <InputGroupAddon type="append">
                                    <Button onClick={this.setPassword}>Save</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
                
                <Modal open={this.state.error !== null} toggle={()=>this.setState({error: null})}>
                    <ModalHeader>An Error Occurred</ModalHeader>
                    <ModalBody>{this.state.error}</ModalBody>
                </Modal>
            </div>
        )
    }
}