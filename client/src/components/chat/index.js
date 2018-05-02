import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import jquery from "jquery";
import Drawer from "material-ui/Drawer";
import Button from "material-ui/Button";
import {CircularProgress} from "material-ui/Progress";
import socket from "./socket";
import ChatUsers from "./chatUser/ChatUsers";
import Conversation from "./conversation/index";
import {ChatFooter, ChatHeader, Typing} from "./common";
import {getAll} from "../../actions/user.actions";
import {getGroupsByUser} from "../../actions/chatAction";
window.$ = window.jQuery = jquery;
require('jquery-slimscroll/jquery.slimscroll.min');

export class Chat extends React.Component {
    constructor(props, context) {
        super(props, context);
        const user = JSON.parse(localStorage.getItem('user'));
        this.state = {
            selectedTabIndex: 0,
            user,
            socket: new socket(),
            groups: null,
            chatHistory: [],
            input: '',
            isDisplayTyping: false,
            count: 1,
            isLoadMoreMessage: false,
            selectedUser: null,
            selectedSectionId: '',
            loader: false,
            drawerState: false,
            onlineUsers: [],
            heightBeforeLoadMore: 0,
            isScroll: false,
            endLoadingMessage: false
        };
        this.onMessageReceived = this.onMessageReceived.bind(this);
        this.onGetOnlineUsers = this.onGetOnlineUsers.bind(this);
    }

    componentWillMount() {
        this.state.socket.register(this.state.user.id);
        this.state.socket.getGroups(this.state.user.id);
    }

    componentDidUpdate() {
    }

    componentDidMount() {
        this.state.socket.registerHandler(this.onMessageReceived);
        this.state.socket.getOnlineUsers(this.onGetOnlineUsers);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({groups: nextProps.groups});
        this.state.socket.getGroups(this.state.user.id);
    }

    onSelectUser = (user) => {
        this.setState({
            loader: true,
            selectedSectionId: user.id,
            selectedUser: user,
            drawerState: false,
            count: 1,
        });

        this.state.socket.join(user.id, (err, chatHistory) => {
            if (err)
                return console.error(err);
            this.setState({chatHistory})
        });

        setTimeout(() => {
            this.setState({loader: false});
        }, 1500);
    };

    onToggleDrawer() {
        this.setState({
            drawerState: !this.state.drawerState
        });
    }

    onChangeMessage = (e) => {
        this.setState({
            input: e.target.value,
        });
        if (e.target.value.trim().length > 0) {
            this.state.socket.typing(this.state.selectedSectionId, true);
        } else {
            this.state.socket.typing(this.state.selectedSectionId, false)
        }
    };

    onSendMessage = () => {
        if (!this.state.input)
            return;
        if (this.state.input && this.state.input.trim().length > 0) {
            this.state.socket.message(this.state.user.id, this.state.selectedSectionId, this.state.input, (err) => {
                if (err)
                    return console.error(err);
                this.state.socket.getGroups(this.state.user.id);
            });
        }
        this.setState({input: '', isDisplayTyping: false, isScroll: true, isLoadMoreMessage: false});
    };

    onLoadMoreMessage = () => {
        this.setState({isLoadMoreMessage: true});
        if (!this.state.endLoadingMessage) {
            this.state.socket.loadMoreMessage(this.state.selectedSectionId, true, this.state.count, (err, messages) => {
                const {chatHistory} = this.state;
                if (messages && messages.length > 0) {
                    chatHistory.unshift(...messages);
                    this.setState({chatHistory, count: this.state.count + 1});
                    if (messages.length === 10) {
                        this.setState({isLoadMoreMessage: true})
                    } else {
                        this.setState({endLoadingMessage: true})
                    }
                } else {
                    this.setState({isLoadMoreMessage: false})
                }

            });
        }
    };

    handleChangeIndex = index => {
        this.setState({selectedTabIndex: index});
    };

    onMessageReceived(entry) {
        if (entry.groupId === this.state.selectedSectionId) {
            if (entry.typing) {
                this.setState({isDisplayTyping: true})
            } else {
                this.setState({isDisplayTyping: false});
                this.updateChatHistory(entry);
                this.state.socket.getGroups(this.state.user.id);
            }
        }
    }

    onGetOnlineUsers({onlineUsers, groups}) {
        this.setState({groups: groups});
        this.setState({onlineUsers})
    }

    updateChatHistory(entry) {
        console.log("new message");
        entry.message && this.setState({chatHistory: this.state.chatHistory.concat(entry)}, () => {
            // this.manageHeight();
        })
    }

    getDisplayName = (group, user, sign) => {
        const groupSplit = group.name.split(sign);
        return groupSplit[0] === user.username ? groupSplit[1] : groupSplit[0];
    };

    render() {
        const {drawerState, groups, user, selectedSectionId, onlineUsers, selectedUser, isDisplayTyping, input, chatHistory, isLoadMoreMessage, isScroll, endLoadingMessage} = this.state;
        return (
            <div className="app-module chat-module animated slideInUpTiny animation-duration-3">
                <div className="chat-module-box">
                    <div className="d-block d-xl-none">
                        <Drawer
                            className="app-module-sidenav"
                            type="temporary"
                            open={drawerState}
                            onClose={() => this.onToggleDrawer()}
                        >
                            <ChatUsers
                                user={user} groups={groups}
                                selectedSectionId={selectedSectionId}
                                onSelectUser={this.onSelectUser.bind(this)}
                                onlineUsers={onlineUsers}
                            />
                        </Drawer>
                    </div>
                    <div className="chat-sidenav d-none d-xl-flex">
                        <ChatUsers
                            user={user} groups={groups}
                            selectedSectionId={selectedSectionId}
                            onSelectUser={this.onSelectUser.bind(this)}
                            onlineUsers={onlineUsers}
                        />
                    </div>
                    {this.state.loader ?
                        <div className="w-100 d-flex justify-content-center align-items-center chat-loader-view">
                            <CircularProgress/>
                        </div> :
                        <div className="chat-box">
                            <div className="chat-box-main">
                                {
                                    selectedUser === null ?
                                        <div className="loader-view">
                                            <i className="zmdi zmdi-comment s-128 text-muted"/>
                                            <h1 className="text-muted">Select User</h1>
                                            <Button className="d-block d-xl-none" color="primary"
                                                    onClick={() => this.onToggleDrawer()}>Select Contact
                                                Chat</Button>
                                        </div>
                                        :
                                        <div className="chat-main">
                                            <ChatHeader
                                                onToggleDrawer={() => this.onToggleDrawer()}
                                                displayName={this.getDisplayName(selectedUser, user, "-")}
                                            />
                                            <Conversation
                                                chatHistory={chatHistory}
                                                user={user}
                                                onLoadMoreMessage={this.onLoadMoreMessage}
                                                isLoadMoreMessage={isLoadMoreMessage}
                                                endLoadingMessage={endLoadingMessage}
                                                isScroll={isScroll}
                                            />
                                            {
                                                isDisplayTyping && <Typing/>
                                            }
                                            <ChatFooter
                                                onSendMessage={this.onSendMessage}
                                                onChange={this.onChangeMessage}
                                                input={input}
                                            />
                                        </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {currentUser} = state.authentication;
    const {users} = state;
    const groups = state.chat;
    return {
        currentUser,
        users,
        groups
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getAll, getGroupsByUser}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
