import React, {Component} from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from './../api'
import './Login.scss'
import { FormInput, Container, Row, Col } from 'shards-react';

export default class Login extends Component {
    state = {
        error: ""
    }
    sizings = {
        lg: {size: 4, offset: 4},
        md: {size: 6, offset: 3},
        sm: {size: 8, offset: 2},
        xs: {size: 10, offset: 1}
    }
    componentDidMount() {
        var token = localStorage.getItem("token")
        if (token) {
            this.props.history.replace("/dashboard")
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        var res = await api.fetch("auth/login", {username: this.state.username, password: this.state.password})
        if (res.error === null) {
            localStorage.setItem("token", res.token)
            var info = await api.fetch("auth")
            localStorage.setItem("username", info.username)
            localStorage.setItem("admin", info.admin)
            this.props.history.push("/dashboard")
        } else {
            this.setState({error: res.error})
        }
    }
    render() {
        return (
            <div className="login">
                <h1>Strempfer IoT</h1>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleSubmit}>
                    <Container>
                        <Row>
                            <Col {...this.sizings}>
                                <FormInput type="text" name="username" placeholder="Username" onChange={(e)=>this.setState({username: e.target.value})} />
                            </Col>
                        </Row>
                        <Row>
                            <Col {...this.sizings}>
                                <FormInput type="password" name="password" placeholder="Password" onChange={(e)=>this.setState({password: e.target.value})} />
                            </Col>
                        </Row>
                        <Row>
                            <Col {...this.sizings}>
                                <FormInput type="submit" theme="default" className="btn btn-outline-primary" name="submit" value="Login" onClick={this.handleSubmit} />
                            </Col>
                        </Row>
                    </Container>
                </form>
            </div>
        )
    }
}