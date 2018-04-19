import React from "react";
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            searchBox: false,
            searchText: '',
            mailNotification: false,
            langSwitcher: false,
            appNotification: false,
        }
    }

    onAppNotificationSelect = () => {
        this.setState({
            appNotification: !this.state.appNotification
        })
    };
    onMailNotificationSelect = () => {
        this.setState({
            mailNotification: !this.state.mailNotification
        })
    };
    onLangSwitcherSelect = (event) => {
        this.setState({
            langSwitcher: !this.state.langSwitcher, anchorEl: event.currentTarget
        })
    };
    onSearchBoxSelect = () => {
        this.setState({
            searchBox: !this.state.searchBox
        })
    };
    handleRequestClose = () => {
        this.setState({langSwitcher: false, mailNotification: false, appNotification: false, searchBox: false});
    };

    updateSearchText(evt) {
        this.setState({
            searchText: evt.target.value,
        });
    }

    render() {
        const {onToggleCollapsedNav, navCollapsed} = this.props;
        const drawerStyle = navCollapsed ? "d-block" : "d-none";
        return (
            <AppBar className="app-main-header">
                <Toolbar className="app-toolbar" disableGutters={false}>
                    <IconButton className={`jr-menu-icon ${drawerStyle}`} aria-label="Menu"
                                onClick={onToggleCollapsedNav}>
                        <span className="menu-icon"/>
                    </IconButton>

                    <Link className="app-logo" to="/">
                        <img src="" alt="Jambo" title="Jambo"/>
                    </Link>

                    <ul className="header-notifications list-inline ml-auto">
                        <li className="list-inline-item mail-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.mailNotification}
                                toggle={this.onMailNotificationSelect.bind(this)}
                            >
                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">

                                    <IconButton className="icon-btn size-30">
                                        <i className="zmdi zmdi-comment-alt-text icon-alert zmdi-hc-fw"/>
                                    </IconButton>
                                </DropdownToggle>

                            </Dropdown>
                        </li>
                    </ul>
                </Toolbar>
            </AppBar>
        );
    }

}
const mapStateToProps = ({settings}) => {
    const {navCollapsed} = settings;
    return {navCollapsed}
};

export default connect(mapStateToProps)(Header);