import React from "react";
import IconButton from "material-ui/IconButton";

export default class ChatFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (e) => {
        e.preventDefault();
        this.props.onChange(e)
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onSendMessage(e)
        }
    };

    render() {
        const {input, onSendMessage} = this.props;
        return (
            <div className="chat-main-footer">
                <div className="d-flex flex-row align-items-center"
                     style={{maxHeight: 51}}>
                    <div className="col">
                        <div className="form-group">
                            <textarea
                                id="required"
                                className="border-0 form-control chat-textarea"
                                placeholder="Type and hit enter to send message"
                                onKeyPress={this.onKeyPress}
                                onChange={this.onChange}
                                value={input}
                            />
                        </div>
                    </div>
                    <div className="chat-sent">
                        <IconButton aria-label="Send message"
                                    onClick={() => onSendMessage()}>
                            <i className="zmdi zmdi-mail-send"/>
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
}