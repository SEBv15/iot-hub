import React, {Component} from 'react';
import { Modal, ModalBody, ModalHeader, Container, FormInput, Row, Col, Button, InputGroupAddon, InputGroup, InputGroupText } from "shards-react";
import Menu from './Menu'
import api from '../api';
import Toolbox from '../blockly/toolbox'
import Blockly from 'blockly'
import ReactBlockly from 'react-blockly'
import ConfigFiles from '../blockly/xml';
import parseWorkspaceXml from '../blockly/parseWorkspaceXml'

export default class Macros extends Component {
    state = {}
    componentDidMount() {
        //require("../blockly/add-blocks")
        //require("../blockly/thing")
        //this.workspace = require("../blockly/iot-workspace")
    }
    generate = () => {
        //var code = Blockly.JavaScript.workspaceToCode(this.workspace);
        //console.log(code)
    }
    workspaceDidChange = (workspace) => {
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        console.log(code)
      }
    constructor(props) {
        super(props);
        this.state = {
          toolboxCategories: parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML),
        };
      }
    render() {
        return (
            <div className="macros">
                <Menu current="macros" />
                <h2>Macros</h2>
                <button onClick={this.generate}>Generate</button>
                <ReactBlockly.BlocklyEditor
                    toolboxCategories={this.state.toolboxCategories}
                    workspaceConfiguration={{
                        grid: {
                            spacing: 20,
                            length: 3,
                            colour: '#ccc',
                            snap: true,
                        },
                    }}
                    initialXml={ConfigFiles.INITIAL_XML}
                    wrapperDivClassName="fill-height"
                    workspaceDidChange={this.workspaceDidChange}
                    />
            </div>
        )
    }
}