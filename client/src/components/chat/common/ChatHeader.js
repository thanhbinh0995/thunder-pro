import React from 'react';
import IconButton from "material-ui/IconButton";

export default class ChatHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {displayName, onToggleDrawer} = this.props;
        return (
            <div className="chat-main-header">
                <IconButton className="d-block d-xl-none chat-btn" aria-label="Menu"
                            onClick={onToggleDrawer}>
                    <i className="zmdi zmdi-comment-text"/>
                </IconButton>
                <div className="chat-main-header-info">
                    <div className="chat-contact-name">
                        {displayName}
                    </div>
                </div>
            </div>
        );
    }
}