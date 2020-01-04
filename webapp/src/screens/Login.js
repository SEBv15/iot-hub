import React, {Component} from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from './../api'

export default class Login extends Component {
    state = {
        error: ""
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
            <div>
                <p>LOGIN</p>
                <p>{this.state.error}</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Username" name="username" onChange={(e)=>this.setState({username: e.target.value})} />
                    <input type="password" placeholder="Password" name="password" onChange={(e)=>this.setState({password: e.target.value})} />
                    <input type="submit" value="Login" onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}