import React from "react";
import ChatUserList from "./ChatUserList";
import SearchBox from "../../searchBox/index";
import {SERVER_URL} from "../../../constants/index";

class ChatUsers extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        const {user, groups, onChangeSearch, search} = this.props;
        return (
            <div className="chat-sidenav-main">
                <div className="chat-sidenav-header">
                    <div className="chat-user-hd">
                        <div className="chat-avatar mr-3">
                            <div className="chat-avatar-mode">
                                <img id="user-avatar-button" src={SERVER_URL + user.avatar}
                                     className="rounded-circle size-50"
                                     alt=""/>
                                <span className="chat-mode online"/>
                            </div>
                        </div>
                        <div className="module-user-info d-flex flex-column justify-content-center">
                            <div className="module-title">
                                <h5 className="mb-0">{user.username}</h5>
                            </div>
                            <div className="module-user-detail">
                                <a href="#" className="text-grey">{user.email}</a>
                            </div>
                        </div>
                    </div>

                    <div className="search-wrapper">
                        <SearchBox placeholder="Search or start new chat" onChangeSearch={onChangeSearch} search={search}/>
                    </div>
                </div>

                <div className="chat-sidenav-content">
                    {
                        groups && groups.length > 0 ?
                            <ChatUserList
                                {...this.props}
                            />
                            : <div className="p-5">User not Found</div>
                    }
                </div>
            </div>
        );
    }
}

export default ChatUsers;
