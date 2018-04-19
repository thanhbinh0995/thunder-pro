import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../actions/user.actions";
import logoDark from "../../style/img/logo-dark.png";
import logoDark2x from "../../style/img/logo-dark@2x.png";
import logo2x from "../../style/img/logo@2x.png";

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Sign In</Link>
                </li>
                <li>
                    <Link to="/register">Sign Up</Link>
                </li>
            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/chat">Chatting</Link>
                </li>
                <li>
                    <Link className="nav-link" to="/profile">({props.currentUser.username})Profile</Link>
                </li>
            </ul>
        );
    }

    return null;
};

class Nav extends React.Component {
    constructor(props) {
        super(props);
        const {dispatch} = this.props;
        dispatch(userActions.getCurrentUser());
    }

    render() {
        const currentUser = this.props.currentUser;
        return (
            <nav className="navbar solid dark">
                <div className="navbar-header">
                    <div className="basic-wrapper">
                        <div className="navbar-brand">
                            <a href="index.html">
                                <img src="#" srcSet={`${logo} 1x, ${logo2x} 2x`}
                                     className="logo-light" alt=""/>
                                <img src="#" srcSet={`${logoDark} 1x, ${logoDark2x} 2x`}
                                     className="logo-dark"
                                     alt=""/>
                            </a>
                        </div>
                        <a className="btn responsive-menu" data-toggle="collapse"
                           data-target=".navbar-collapse"><i/></a>
                    </div>
                </div>
                <div className="collapse navbar-collapse">
                    {currentUser ? <LoggedInView currentUser={currentUser}/> : <LoggedOutView />}
                </div>
            </nav>
        );
    }
}
function mapStateToProps(state) {
    const {currentUser} = state.authentication;
    return {
        currentUser
    };
}
export default connect(mapStateToProps)(Nav);