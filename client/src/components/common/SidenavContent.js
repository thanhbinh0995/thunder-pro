import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import SidenavContent from './SidenavContent';
import UserInfo from '../userInfo';

class SideNav extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let type = 'permanent';
        return (
            <div className={`app-sidebar d-none`}>
                <Drawer className="app-sidebar-content d-xl-flex"
                        variant={type}
                        classes={{
                            paper: 'side-nav',
                        }}
                >
                    <UserInfo/>
                    <SidenavContent/>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(SideNav);