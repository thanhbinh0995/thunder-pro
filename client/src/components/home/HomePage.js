import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";
import {getAll, getCurrentUser, requestFriend, requestLikeFriend, updateLocation} from "../../actions/user.actions";
import {getGroupsByUser} from "../../actions/chatAction";
import {toggleCollapsedNav} from "../../actions/sideNav.action";
import SwipeCard from "../card/SwipeCard";
import SideNav from "../common/SideNav";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
        }
    }

    componentWillMount() {
        this.props.getCurrentUser();
        this.props.updateLocation(this.props.latitude, this.props.longitude);
        this.props.getAll(this.state.offset);
        this.props.getGroupsByUser();
    }

    componentWillReceiveProps(nextProps) {
        nextProps.users.items && this.setState({users: nextProps.users.items.data.data})
    }

    onSendMessage(userID) {
        this.props.requestFriend(userID)
    }

    requestMoreUser() {
        this.setState({offset: this.state.offset + 1}, () => {
            this.props.getAll(this.state.offset);
        })
    }

    requestLikeFriend(friendId) {
        this.props.requestLikeFriend(friendId);
    }


    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    render() {
        const {currentUser} = this.props;
        let users = this.props.users.items ? this.props.users.items.data.data : null;
        if (currentUser && users && users.length > 0) {
            users = users.filter((user) => {
                return user.id !== currentUser.id;
            })
        }
        return (
            <div>
                <div className="container">
                    <div id="app-site">
                        <div className="app-main">
                            <div className="app-container fixed-drawer">
                                <SideNav
                                    user={currentUser}
                                    onToggleCollapsedNav={() => this.onToggleCollapsedNav()}
                                />
                                <div className="app-main-container">
                                    <main className="app-main-content-wrapper">
                                        <div className="app-main-content">
                                            <div className="app-wrapper app-wrapper-module">
                                                { users && users.length > 0 ?
                                                    <SwipeCard users={users}
                                                               requestLikeFriend={(friendId) => this.requestLikeFriend(friendId)}
                                                               onSendMessage={(userID) => this.onSendMessage(userID)}
                                                               requestMoreUser={() => this.requestMoreUser()}/>
                                                    : <p>Loading...</p> }
                                            </div>
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.authentication;
    const {users} = state;
    const {navCollapsed, drawerType} = state.settings;
    return {
        currentUser,
        users,
        navCollapsed,
        drawerType,
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getAll,
        getCurrentUser,
        getGroupsByUser,
        requestFriend,
        updateLocation,
        requestLikeFriend,
        toggleCollapsedNav
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));