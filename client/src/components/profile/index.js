import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentUser} from "../../actions/user.actions";
import ProfilePage from './ProfilePage';
import SideNav from "../common/SideNav";

class Profile extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    componentWillMount() {
        this.props.getCurrentUser();
    }

    render() {
        const user = this.props.currentUser;
        return (
            <div id="app-site">
                <div className="app-main">
                    <div className="app-container fixed-drawer">
                        <SideNav
                            user={user}
                            onToggleCollapsedNav={() => this.onToggleCollapsedNav()}
                        />
                        <div className="app-main-container">
                            <main className="app-main-content-wrapper">
                                <div className="app-main-content">
                                    <div className="app-wrapper app-wrapper-module">
                                        <div id="page-container" className="fade page-sidebar-fixed page-header-fixed">
                                            {user ?
                                                <ProfilePage user={user}/>
                                                : <p>Loading</p>
                                            }
                                        </div>
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

function mapStateToProps(state) {
    const {currentUser} = state.authentication;
    return {
        currentUser,
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getCurrentUser,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
