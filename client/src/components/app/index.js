import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SideNav from "../common/SideNav";
import Header from "../common/Header";
import Chat from "../chat/index";
import {toggleCollapsedNav} from "../../actions/sideNav.action";
import {getCurrentUser} from "../../actions/user.actions";
import {bindActionCreators} from "redux";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onToggleCollapsedNav = this.onToggleCollapsedNav.bind(this)
    }

    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    render() {
        return (
            <div id="app-site">
                <div className="app-main">
                    <div className="app-container fixed-drawer">
                        <SideNav onToggleCollapsedNav={() => this.onToggleCollapsedNav()}/>
                        <div className="app-main-container">
                            <main className="app-main-content-wrapper">
                                <div className="app-main-content">
                                    <div className="app-wrapper app-wrapper-module">
                                        <Chat />
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({settings, authentication}) => {
    const {currentUser} = authentication;
    const {navCollapsed, drawerType} = settings;
    return {
        navCollapsed,
        drawerType,
        currentUser
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({getCurrentUser, toggleCollapsedNav}, dispatch);
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
