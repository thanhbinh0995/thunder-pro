import React, {Component} from "react";
import ReactDOM from "react-dom";
import {translate3d} from "./utils";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {initialPosition: {x: 0, y: 0}, displayText: {}};
        this.setInitialPosition = this.setInitialPosition.bind(this)
    }

    setInitialPosition() {
        const card = ReactDOM.findDOMNode(this);
        const initialPosition = {
            x: Math.round((this.props.containerSize.x - card.offsetWidth) / 2),
            y: Math.round((this.props.containerSize.y - card.offsetHeight) / 2)
        };
        this.setState({initialPosition})
    }

    componentDidMount() {
        this.setInitialPosition();
        window.addEventListener('resize', this.setInitialPosition)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setInitialPosition)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.displayText) {
            this.setState({displayText: nextProps.displayText})
        }
    }

    render() {
        const {initialPosition: {x, y}, displayText} = this.state;
        const {className = 'inactive'} = this.props;
        const style = {
            ...translate3d(x, y),
            zIndex: this.props.index,
            ...this.props.style
        };
        return (
            <div style={style} className={`card ${className}`}>
                {this.props.children}
                <div className={displayText.right ? "like-container" : "like-container hidden"}>
                    <p>Like</p>
                </div>
                <div className={displayText.left ? "dislike-container" : "dislike-container hidden"}>
                    <p>Dislike</p>
                </div>
                <div className={displayText.top ? "request-container" : "request-container hidden"}>
                    <p>Request</p>
                </div>
            </div>
        )
    }
}

export default Card
