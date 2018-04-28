import React, {Component} from "react";
import Hammer from "hammerjs";
import ReactDOM from "react-dom";
import SimpleCard from "./SimpleCard";
import {getBackgroundImage, translate3d} from "./utils";

class DraggableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            initialPosition: {x: 0, y: 0},
            startPosition: {x: 0, y: 0},
            animation: null,
            pristine: true,
            offsetWidth: 0,
        };
        this.resetPosition = this.resetPosition.bind(this);
        this.handlePan = this.handlePan.bind(this)
    }

    resetPosition() {
        const {x, y} = this.props.containerSize;
        const card = ReactDOM.findDOMNode(this);

        const initialPosition = {
            x: Math.round((x - card.offsetWidth) / 2),
            y: Math.round((y - card.offsetHeight) / 2)
        };

        this.setState({
            x: initialPosition.x,
            y: initialPosition.y,
            initialPosition: initialPosition,
            startPosition: {x: 0, y: 0}
        })
    }

    panstart() {
        const {x, y} = this.state;
        this.setState({
            animation: false,
            startPosition: {x, y},
            pristine: false
        })
    }

    panend(ev) {
        const screen = this.props.containerSize;
        const card = ReactDOM.findDOMNode(this);
        this.setState({offsetWidth: card.offsetWidth});

        const getDirection = () => {
            switch (true) {
                case (this.state.x < 100):
                    return 'Left';
                case (this.state.x + (card.offsetWidth + 150) > screen.x):
                    return 'Right';
                case (this.state.y < -50):
                    return 'Top';
                default:
                    return false
            }
        };
        const direction = getDirection();

        if (direction === 'Top') {
            this.props.onSendMessage(this.props.user.id);
        }
        if (this.props[`onSwipe${direction}`]) {
            this.props[`onSwipe${direction}`]();
            this.props[`onOutScreen${direction}`](this.props.index);
            if (this.props.index < 2) {
                this.props.requestMoreUser();
            }
        } else {
            this.resetPosition();
            this.setState({animation: true})
        }

    }

    panmove(ev) {
        this.setState(this.calculatePosition(ev.deltaX, ev.deltaY))
    }

    pancancel(ev) {
        console.log(ev.type)
    }

    handlePan(ev) {
        ev.preventDefault();
        this[ev.type](ev);
        return false
    }

    handleSwipe(ev) {
        console.log(ev.type)
    }

    calculatePosition(deltaX, deltaY) {
        const {initialPosition: {x, y}} = this.state
        return {
            x: (x + deltaX),
            y: (y + deltaY)
        }
    }

    componentDidMount() {
        this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this));
        this.hammer.add(new Hammer.Pan({threshold: 2}));

        this.hammer.on('panstart panend pancancel panmove', this.handlePan);
        this.hammer.on('swipestart swipeend swipecancel swipemove', this.handleSwipe)

        this.resetPosition();
        window.addEventListener('resize', this.resetPosition)
    }

    componentWillUnmount() {
        if (this.hammer) {
            this.hammer.stop();
            this.hammer.destroy();
            this.hammer = null
        }
        window.removeEventListener('resize', this.resetPosition)
    }

    render() {
        const {x, y, animation, pristine} = this.state;
        const style = Object.assign({}, translate3d(x, y), getBackgroundImage(this.props.avatar));
        let displayText = {
            left: false,
            right: false,
            top: false,
        };

        if (x < 60) {
            displayText.left = true;
        } else if (x + 600 > this.props.containerSize.x) {
            displayText.right = true;
        } else if (y < -20) {
            displayText.top = true;
        }
        return (
            <SimpleCard
                {...this.props}
                style={style}
                className={animation ? 'animate' : pristine ? 'inactive' : '' }
                displayText={displayText}
            />
        )
    }
}

export default DraggableCard
