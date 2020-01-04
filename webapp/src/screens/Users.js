import React, {Component} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Modal, ModalBody, ModalHeader, Container, FormInput, Row, Col, Button, InputGroupAddon, InputGroup, InputGroupText } from "shards-react";
import Menu from './Menu'
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Users.scss'

export default class Users extends Component {
    state = {
        adminModalOpen: false,
        error: null
    }
    async componentDidMount() {
        if (!api.admin()) {
            this.setState({adminModalOpen: true})
        }
        var usersReq = await api.fetch("auth/listUsers")
        this.users = usersReq.users

        this.forceUpdate()
    }
    deleteUser = async (username) => {
        if (window.confirm("Are you sure you want to delete "+username+"?")) {
            var result = await api.fetch("auth/deleteUser", {username})
            if (result.error) {
                this.setState({error: result.error})
                return
            }
            this.users = this.users.filter((user) => user.username != username)
            this.forceUpdate()
        }
    }
    onKeyDown = (e) => {
        if (e.key === "Enter") {
            this.addUser()
        }
    }
    addUser = async () => {
        if (this.nameRef.value && this.pwdRef.value) {
            var res = await api.fetch("auth/addUser", {
                username: this.nameRef.value,
                password: this.pwdRef.value
            })
            if (!res.error) {
                this.users.push({username: this.nameRef.value})
                this.nameRef.value = ""
                this.pwdRef.value = ""
                this.forceUpdate()
            } else {
                this.setState({error: res.error})
            }
        }
    }
    render() {
        return (
            <div className="users">
                <Menu current="users" />
                <h2>Users</h2>

                <Container>
                    <Row>
                        <Col lg={{size: 6, offset: 3}} md={{size: 8, offset: 2}} style={{marginBottom: 12}}>
                            <form autocomplete="new-password" onSubmit={this.addUser}>
                            <InputGroup>
                                <FormInput onKeyDown={this.onKeyDown} type="text" placeholder="Username" autocomplete="new-password" innerRef={(ref) => {
                                    if (ref) {
                                        this.nameRef = ref
                                    }
                                }} />
                                <FormInput onKeyDown={this.onKeyDown} type="password" placeholder="Password" autocomplete="new-password" innerRef={(ref) => {
                                    if (ref) {
                                        this.pwdRef = ref
                                    }
                                }} />
                                <InputGroupAddon type="append">
                                    <Button onClick={this.addUser}>Add</Button>
                                </InputGroupAddon>
                            </InputGroup>
                            </form>
                        </Col>
                    </Row>
                {this.users?this.users.map((user) => (
                    <Row key={user.username}>
                        <Col lg={{size: 6, offset: 3}} md={{size: 8, offset: 2}}>
                            <InputGroup className="user">
                                <InputGroupText className={user.admin?"adminuser":"regularuser"}>{user.username}</InputGroupText>
                                {user.admin?null:(
                                <InputGroupAddon type="append">
                                    <Button theme="danger" size="sm" outline pill onClick={()=>this.deleteUser(user.username)}><FontAwesomeIcon icon={faTrash} /></Button>
                                </InputGroupAddon>
                                )}
                            </InputGroup>
                        </Col>
                    </Row>
                )):null}
                </Container>

                <Modal open={this.state.error !== null} toggle={()=>this.setState({error: null})}>
                    <ModalHeader>An Error Occurred</ModalHeader>
                    <ModalBody>{this.state.error}</ModalBody>
                </Modal>
                
                <Modal open={this.state.adminModalOpen} toggle={()=>this.props.history.replace("/")}>
                    <ModalHeader>Permission Needed</ModalHeader>
                    <ModalBody>To manage users, you need admin privileges</ModalBody>
                </Modal>
            </div>
        )
    }
}