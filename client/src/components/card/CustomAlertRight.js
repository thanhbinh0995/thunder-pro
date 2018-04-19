import React from 'react';

export default class CustomAlertRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillUnmount() {
        // this.props.test()
    }

    render() {
        return (
            <div>
                <span>Like</span>
            </div>
        );
    }
}