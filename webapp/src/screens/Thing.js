import React, {Component} from 'react';
import { Modal, ModalBody, ModalHeader, Container, Row, Col, Slider, FormInput, Button, InputGroup, InputGroupAddon } from "shards-react";
import Menu from './Menu'
import api from '../api';
import './Thing.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import ReactLoading from 'react-loading';

class Property extends Component {
    state = {
        value: "",
        invalid: false,
    }
    initInput = (ref) => {
        if (ref) {
            this.inputRef = ref
            ref.value = this.props.value
        }
    }
    setProp = (val) => {
        if (this.props.accepts === "number") {
            if (isNaN(val) || !val) {
                this.setState({invalid: true})
                return
            }
            else
                this.setState({invalid: false})
        }
        api.fetch(`things/${this.props.thing}/setProp`, {
            prop: this.props.name,
            value: val
        })
    }
    onKeyDown = (e) => {
        if (e.key === "Enter") {
            this.setProp(this.inputRef.value)
        }
    }
    componentDidMount() {
        this.setState({value: this.props.value})
    }
    getEditComp = () => {
        switch (this.props.accepts) {
            case "number":
                return (
                    <React.Fragment>
                        <InputGroup size="sm">
                            <FormInput onKeyDown={this.onKeyDown} invalid={this.state.invalid} type="number" placeholder="Value" innerRef={(ref) => this.initInput(ref)} />
                            <InputGroupAddon type="append">
                                <Button size="sm" onClick={()=>this.setProp(this.inputRef.value)}>Set</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </React.Fragment>
                )
            case "":
            case "string":
                return (
                    <React.Fragment>
                        <InputGroup size="sm">
                            <FormInput onKeyDown={this.onKeyDown} type="text" placeholder="Value" innerRef={(ref) => this.initInput(ref)} />
                            <InputGroupAddon type="append">
                                <Button size="sm" onClick={()=>this.setProp(this.inputRef.value)}>Set</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </React.Fragment>
                )
            case "boolean":
                return (
                    <Button 
                        onClick={() => {
                            this.setState({value: String(!(this.state.value == "true"))})
                            this.setProp(String(!(this.state.value == "true")))
                        }}
                        className="bool" 
                        size="sm" 
                        theme={this.state.value=="true"?"success":"danger"}>
                            {this.state.value}
                    </Button>
                )
            default:
                return (
                    <div className="slider-inp">
                        <span className="slidermin">{parseInt(this.props.accepts.split("-")[0])}</span>
                        <Slider
                            theme="success"
                            margin={0}
                            onChange={(val)=>this.setState({value: String(parseInt(val[0]))})}
                            connect={[true, false]}
                            start={[parseInt(this.state.value)]}
                            step={1}
                            range={{ min: parseInt(this.props.accepts.split("-")[0]), max: parseInt(this.props.accepts.split("-")[1]) }}
                        />
                        <span className="slidermax">{parseInt(this.props.accepts.split("-")[1])}</span>
                        <Button size="sm" onClick={()=>this.setProp(this.state.value)}>Set to {this.state.value}</Button>
                    </div>
                )
        }
    }
    render() {
        return (
            <div className="prop">
                <Row>
                    <Col lg="2" md="2" xs="4" sm="3"><span className="propname">{this.props.name}</span></Col>
                    <Col>{this.getEditComp()}</Col>
                </Row>
            </div>
        )
    }
}

export default class Thing extends Component {
    state = {
        error: null,
        errorFatal: false,
        loading: true,
        editingName: false,
        name: "..."
    }
    async componentDidMount() {
        var res = await api.fetch(`things/${this.props.match.params.uid}`)
        if (res.error !== null) {
            this.setState({error: "An error occurred while loading the thing: "+res.error, errorFatal: true})
        }
        this.thing = res.thing
        this.setState({name: res.thing.name})

        if (api.admin()) {
            this.users = (await api.fetch(`things/${this.props.match.params.uid}/getUsers`)).users
        }

        this.setState({loading: false})
        this.forceUpdate()
    }
    addUser = async () => {
        var name = this.addUserRef.value
        if (this.addUserRef.value == "") {
            this.setState({error: "Enter a username first"})
            return
        }
        var res = await api.fetch(`things/${this.props.match.params.uid}/addUser`, {username: this.addUserRef.value})
        this.addUserRef.value = ""
        if (res.error) {
            this.setState({error: res.error})
        } else {
            if (!res.alreadyAdded) {
                this.users.push({username: name})
                this.forceUpdate()
            }
        }
    }
    removeUser = async (user) => {
        var res = await api.fetch(`things/${this.props.match.params.uid}/removeUser`, {
            username: user.username
        })
        this.users = this.users.filter((u) => u.username != user.username)
        this.forceUpdate()
    }
    editName = async () => {
        if (!this.state.editingName) {
            this.setState({name: this.thing.name})
        }
        this.setState({editingName: !this.state.editingName})
    }
    saveName = async () => {
        this.setState({editingName: false})
        var res = await api.fetch(`things/${this.thing.uid}/rename`, {
            name: this.state.name
        })
        if (res.error) {
            this.setState({error: res.error})
        } else {
            this.thing.name = this.state.name;
            this.forceUpdate()
        }
    }
    onRenameKeyDown = (e) => {
        if (e.key === "Enter") {
            this.saveName()
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <div className="thing">
                    <Menu current="thing" />
                    <div className="loading">
                        <ReactLoading type={"spin"} color={"black"} />
                    </div>
                </div>
            )
        }
        return (
            <div className="thing">
                <Menu current="thing" />
                <h2>
                    {this.state.editingName?(
                            <InputGroup size="sm" className="editName">
                              <FormInput onKeyDown={this.onRenameKeyDown} placeholder="Name" onChange={(e)=>this.setState({name: e.target.value})} value={(this.state.name)} />
                              <InputGroupAddon type="append">
                                <Button onClick={this.saveName} size="sm">Save</Button>
                              </InputGroupAddon>
                            </InputGroup>
                    ):(
                    this.thing?this.thing.name:"..."
                    )}
                    <span>Thing</span>
                    {api.admin()?<Button onClick={this.editName} theme={this.state.editingName?"danger":"primary"} className="editBTN" outline pill><FontAwesomeIcon size="sm" icon={this.state.editingName?faTimes:faPen} /></Button>:null}
                </h2>
                <Container><Row><Col lg={{size: 8, offset: 2}}>
                    <Row>
                        <Col>
                            <h5>Properties</h5>
                        </Col>
                    </Row>
                    {this.thing?(
                        Object.keys(this.thing.props).map((prop) => <Property key={prop} thing={this.thing.uid} name={prop} value={this.thing.data[prop]} accepts={this.thing.props[prop]} />)
                    ):null}
                    {api.admin()?(
                    <React.Fragment>
                        <Row>
                            <Col>
                                <h5>Users</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="userlist">
                                    {this.users?(
                                        this.users.map((user) => <div key={user.username} className="user">{user.username}<FontAwesomeIcon onClick={()=>this.removeUser(user)} size="xs" icon={faTimes} /></div>)
                                    ):null}
                                    <InputGroup size="sm" className="addthinguser">
                                        <FormInput onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                this.addUser()
                                            }
                                        }} type="text" innerRef={(ref) => { if (ref) {this.addUserRef = ref}}} />
                                        <InputGroupAddon type="append">
                                            <Button size="sm" onClick={this.addUser}>Add</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </Col>
                        </Row>
                    </React.Fragment>
                    ):null}
                </Col></Row></Container>

                <Modal open={this.state.error !== null} toggle={()=>{
                        if (this.state.errorFatal)
                            this.props.history.replace("/")
                        else
                            this.setState({error: null, errorFatal: false})
                    }}>
                    <ModalHeader>An Error Occurred</ModalHeader>
                    <ModalBody>{this.state.error}</ModalBody>
                </Modal>
            </div>
        )
    }
}