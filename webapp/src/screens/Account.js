import React, {Component} from 'react';
import { Link, useHistory } from 'react-router-dom'

import Menu from './Menu'

export default class Account extends Component {
    render() {
        return (
            <div className="account">
                <Menu current="account" />
            </div>
        )
    }
}