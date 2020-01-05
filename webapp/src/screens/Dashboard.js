import React, {Component} from 'react';
import './Dashboard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import LongPress from 'react-long'
import {
    BrowserView,
    MobileView,
  } from "react-device-detect";

import Menu from './Menu'
import api from '../api';

import {
    Container,
    Row,
    Col
  } from "shards-react";

function getIcon(icon) {
    switch (icon) {
        case "lamp":
            return faLightbulb
        default:
            return faQuestion
    }
}

function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

class Thing extends Component {
    state = {
        pressable: false,
        iconColor: "#444",
        fontSize: 16
    }
    componentDidMount() {
        if (this.props.mainProp && this.props.props[this.props.mainProp] === "boolean") {
            this.setState({pressable: true})
            this.mainPropVal = this.props.data[this.props.mainProp] == "true"
            this.updateMainState(true)
        }
        this.calculateFontSize()
    }
    updateMainState(force = false) {
        if (this.state.pressable || force) {
            if (this.mainPropVal) {
                this.setState({iconColor: "#444"})
            } else {
                this.setState({iconColor: "#ddd"})
            }
        }
    }
    cardClick = () => {
        this.props.history.push(`/thing/${this.props.uid}`)
    }
    btnClick = (e) => {
        if (!this.state.pressable)
            return
        e.stopPropagation()
    }
    handleButtonPress = (e) => {
        e.stopPropagation()
        this.buttonPressTimer = setTimeout(() => {
            this.props.history.push(`/thing/${this.props.uid}`)
        }, 1500);
        this.startedPressing = Date.now()
    }
    handleButtonRelease = async () => {
        if (Date.now() - this.startedPressing < 1500 && this.state.pressable) {
            this.startedPressing = 0
            console.log("BTN")
            this.toggleBtn()
        }
        clearTimeout(this.buttonPressTimer);
    }
    toggleBtn = async () => {
        await api.fetch(`things/${this.props.uid}/setProp`, {prop: this.props.mainProp, value: String(!this.mainPropVal)})
        var newVal = (await api.fetch(`things/${this.props.uid}`)).thing
        console.log(newVal)
        this.mainPropVal = newVal.data[newVal.mainProp] == "true"
        this.updateMainState()
    }
    calculateFontSize = () => {
        var font = '300 16pt "Segoe UI"'
        var max = 128
        var w = getTextWidth(this.props.name, font)
        var fontSize = Math.min(max / w * 16, 16);
        console.log(fontSize)
        this.setState({fontSize})
    }
    render() {
        return (
            <Col xs="6" sm="6" md="3" lg="2">
                <MobileView>
                    <LongPress
                        time={500}
                        onLongPress={() => this.cardClick()}
                        onPress={() => {
                            if (this.state.pressable)
                                this.toggleBtn()
                            else
                                this.cardClick()
                        }}
                    >
                        <div className="thing card">
                            <div 
                                className={`btn ${this.state.pressable?"pressable":""}`} 
                                style={{
                                    borderColor: this.state.pressable?this.state.iconColor:undefined,
                                    cursor: this.state.pressable?"pointer":"default"
                                }}
                                >
                                <FontAwesomeIcon color={this.state.iconColor} size="3x" icon={getIcon(this.props.icon)} />
                            </div>
                            <span className="name" style={{fontSize: this.state.fontSize}}>{this.props.name}</span>
                        </div>
                    </LongPress>
                </MobileView>
                <BrowserView>
                    <div className="thing card" onClick={this.cardClick}>
                        <div 
                            onClick={this.btnClick} 
                            onMouseDown={this.handleButtonPress} 
                            onMouseUp={this.handleButtonRelease} 
                            onMouseLeave={this.handleButtonRelease}
                            className={`btn ${this.state.pressable?"pressable":""}`} 
                            style={{
                                borderColor: this.state.pressable?this.state.iconColor:undefined,
                                cursor: this.state.pressable?"pointer":"default"
                            }}
                            >
                            <FontAwesomeIcon color={this.state.iconColor} size="3x" icon={getIcon(this.props.icon)} />
                        </div>
                        <span className="name" style={{fontSize: this.state.fontSize}}>{this.props.name}</span>
                    </div>
                </BrowserView>
            </Col>
        )
    }
}

export default class Dashboard extends Component {
    state = {
        things: []
    }
    listThings = async () => {
        var things = await api.fetch("things/list")
        this.setState({things: things.things})
    }
    componentDidMount() {
        this.listThings()
    }
    render() {
        return (
            <div className="dashboard">
                <Menu current="dashboard" />
                <h2>Dashboard</h2>
                <span>Long press for more options</span>
                <Container>
                    <Row>
                        {this.state.things.map((thing) => <Thing key={thing.uid} history={this.props.history}  {...thing} />)}
                    </Row>
                </Container>
            </div>
        )
    }
}