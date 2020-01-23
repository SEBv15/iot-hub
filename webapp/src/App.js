import React, {Component} from 'react';
import './App.scss';
import { Route, Link, BrowserRouter as Router, Redirect } from 'react-router-dom'

import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Account from './screens/Account'
import Users from './screens/Users'
import Thing from './screens/Thing';
import Macros from './screens/Macros'

class Load extends Component {
  state = {loading: true, redirectTo: ""}
  componentDidMount() {
    var token = localStorage.getItem("token")
    if (!token) {
      this.setState({loading: false, redirectTo: "/login"})
    } else {
      this.setState({loading: false, redirectTo: "/dashboard"})
    }
  }
  render() {
    return (
      <div>
      {this.state.loading?(
        <p>Loading...</p>
      ):(<Redirect to={this.state.redirectTo} />)}
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={Load} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/account" component={Account} />
          <Route path="/users" component={Users} />
          <Route path="/thing/:uid" component={Thing} />
          <Route path="/macros" component={Macros} />
        </div>
      </Router>
    </div>
  );
}

export default App;
