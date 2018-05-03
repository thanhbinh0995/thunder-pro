import React from "react";
import ReceivedMessageCell from "./receivedMessageCell/index";
import SentMessageCell from "./sentMessageCell/index";
import {CircularProgress} from "material-ui/Progress";

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heightBeforeLoadMore: 0
        }
    }

    componentWillMount() {
        this.scrollToBottom();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoadMoreMessage === true && nextProps.isLoadMoreMessage === true && this.props.endLoadingMessage === false) {
            this.scrollTo(this.state.heightBeforeLoadMore, this.scrollList.scrollHeight - 35);
        }
        if (this.props.isScroll === true && nextProps.isLoadMoreMessage === false) {
            this.scrollToBottom();
        }
    }

    componentDidMount(nextProps) {
        this.scrollToBottom();
    }

    onPushNotification = () => {
        const message = "You have new message";
        let fakeNotification;
        Notification.requestPermission().then((result) => {
            Notification.permission = result;
        });
        if (Notification.permission === 'denied') {
            alert('Please allow notifications before doing this');
        } else {
            const randomSeed = Math.random();
            const options = {
                body: message,
                icon: 'favicon.png',
                tag: randomSeed // required unique tag for each Notification,
            };
            fakeNotification = new Notification('Thunder', options);
            fakeNotification.onclick = function () {
                window.open('/chat');
                fakeNotification.close();
            }
        }
        // subscribePush();
    };

    isLastMessage(messages, index) {
        return !(messages[index + 1] && messages[index + 1].User.id !== this.props.user.id);
    }

    scrollToBottom = () => {
        if (this.scrollList) {
            this.scrollList.scrollTop = this.scrollList.scrollHeight;
        }
    };

    scrollTo = (y1, y2) => {
        this.scrollList.scrollTop = y2 - y1;
    };

    loadingMessage = (event) => {
        if (event.currentTarget.scrollTop === 0) {
            this.setState({heightBeforeLoadMore: this.scrollList.scrollHeight});
            this.props.onLoadMoreMessage()
        }
    };

    render() {
        const {chatHistory, user, isLoadMoreMessage, endLoadingMessage} = this.props;
        return (
            <div
                className="chat-list-scroll"
                ref={el => this.scrollList = el}
                onScroll={this.loadingMessage}
            >
                {
                    isLoadMoreMessage && !endLoadingMessage &&
                    <div className="text-center">
                        <CircularProgress/>
                    </div>
                }

                <div className="chat-main-content">
                    {chatHistory && chatHistory.map((conversation, index) => user.id === conversation.User.id ?
                        <SentMessageCell key={index} conversation={conversation}/> :
                        <ReceivedMessageCell key={index} conversation={conversation}
                                             isLastMessage={this.isLastMessage(chatHistory, index)}/>
                    )}
                </div>
            </div>
        )
    }

}

export default Conversation;