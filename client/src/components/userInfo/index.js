import React from "react";
import Avatar from "material-ui/Avatar";
import Menu, {MenuItem} from "material-ui/Menu";
import {SERVER_URL} from "../../constants";

class UserInfo extends React.Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleRequestLogOut = () => {
        this.setState({open: false});
        this.props.onLogOut();
    };

    render() {
        const {user} = this.props;

        return (
            <div className="user-profile d-flex flex-row align-items-center">
                <Avatar
                    alt='...'
                    src={SERVER_URL + user.avatar}
                    className="user-avatar "
                />
                <div className="user-detail">
                    <h4 className="user-name" onClick={this.handleClick}>
                        {`${user.firstName} ${user.lastName}`}
                        <i className="zmdi zmdi-caret-down zmdi-hc-fw align-middle"/>
                    </h4>
                </div>
                <Menu className="user-info"
                      id="simple-menu"
                      anchorEl={this.state.anchorEl}
                      open={this.state.open}
                      onClose={this.handleRequestClose}
                      PaperProps={{
                          style: {
                              width: 120,
                              paddingTop: 0,
                              paddingBottom: 0
                          }
                      }}
                >
                    <MenuItem
                        onClick={() => {
                            this.handleRequestClose();
                            history.push("/profile")
                        }}
                    >
                        <i className="zmdi zmdi-account zmdi-hc-fw mr-2"/>
                        <p>Profile</p>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            this.handleRequestLogOut();
                        }}>
                        <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-2"/>
                        <p>Log out</p>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default UserInfo;