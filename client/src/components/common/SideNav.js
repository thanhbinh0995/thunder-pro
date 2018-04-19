import React from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import {updateWindowWidth} from "../../actions/sideNav.action";
import UserInfo from "../userInfo";
import Drawer from "material-ui/Drawer";
import {userActions} from "../../actions";

class SideNav extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.props.updateWindowWidth($(window).width())
        });
    }

    onLogOut = () => {
        userActions.logout();
    };

    render() {

        const {navCollapsed, drawerType, width, currentUser} = this.props;
        return (
            <div className={`app-sidebar d-none d-xl-flex`}>

                <Drawer
                    className="app-sidebar-content"
                    variant={navCollapsed ? "temporary" : "permanent"}
                    open={navCollapsed}
                    onClose={this.props.onToggleCollapsedNav}
                    classes={{
                        paper: 'side-nav',
                    }}
                >
                    {
                        currentUser ?
                            <UserInfo
                                user={currentUser}
                                onLogOut={this.onLogOut}
                            />
                            : <p>Loading</p>
                    }
                    <div className="slimScrollDiv">
                        <ul className="nav-menu">
                            <li className="nav-header">
                                <span>View</span>
                            </li>
                            <li className="menu no-arrow">
                                <NavLink to="/">
                                    <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
                                    <span className="nav-text">Home</span>
                                </NavLink>
                            </li>
                            <li className="menu no-arrow">
                                <NavLink to="/chat">
                                    <i className="zmdi zmdi-comment zmdi-hc-fw"/>
                                    <span className="nav-text">Message</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </Drawer>

            </div>
        );
    }
}
const mapStateToProps = ({settings, authentication}) => {
    const {currentUser} = authentication;
    const {navCollapsed, drawerType, width} = settings;
    return {navCollapsed, drawerType, width, currentUser}
};

export default withRouter(connect(mapStateToProps, {updateWindowWidth})(SideNav));