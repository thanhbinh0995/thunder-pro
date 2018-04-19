import React from "react";
import {connect} from "react-redux";
import {userActions} from "../../actions";
import {Link, withRouter} from "react-router-dom";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {CircularProgress} from "material-ui/Progress";

import moment from "moment";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            latitude: '',
            longitude: '',
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeDate(date) {
        const {user} = this.state;
        user.birthday = date.format();
        this.setState({
            user: user
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({submitted: true});
        const {username, email, password} = this.state;
        const user = {username, email, password};
        const {dispatch} = this.props;
        if (user.email && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const {registering, alert} = this.props;
        let message;
        if (alert.message !== '' && alert.message) {
            message = JSON.parse(alert.message);
        }
        const {username, email, password, submitted} = this.state;
        const {showMessage, loader, alertMessage} = this.props;
        return (
            <div
                className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="app-login-main-content">
                    <div className="app-logo-content d-flex align-items-center justify-content-center">
                        <Link className="logo-lg" to="/" title="Jambo">
                            <img src="" alt="jambo" title="jambo"/>
                        </Link>
                    </div>

                    <div className="app-login-content">
                        <div className="app-login-header">
                            <h1>Sign Up</h1>
                        </div>

                        <div className="mb-4">
                            <h2>Create account</h2>
                        </div>

                        <div className="app-login-form">
                            <form method="post" action="/" onSubmit={() => this.handleSubmit()}>
                                <TextField
                                    type="text"
                                    label={<h3>Username</h3>}
                                    onChange={(event) => this.setState({username: event.target.value})}
                                    fullWidth
                                    defaultValue={username}
                                    margin="normal"
                                    className="mt-0 mb-2 form-item"
                                />

                                <TextField
                                    type="email"
                                    onChange={(event) => this.setState({email: event.target.value})}
                                    label={<h3>Email</h3>}
                                    fullWidth
                                    defaultValue={email}
                                    margin="normal"
                                    className="mt-0 mb-2 form-item"
                                />

                                <TextField
                                    type="password"
                                    onChange={(event) => this.setState({password: event.target.value})}
                                    label={<h3>Password</h3>}
                                    fullWidth
                                    defaultValue={password}
                                    margin="normal"
                                    className="mt-0 mb-4 form-item"
                                />

                                <div className="mb-3 d-flex align-items-center justify-content-between">
                                    <Button variant="raised" onClick={(event) => {
                                            this.handleSubmit(event);
                                        }}color="primary">
                                        Register
                                    </Button>
                                    <Link to="/login">
                                        Already member
                                    </Link>
                                </div>
                                <div className="app-social-block my-1 my-sm-3">
                                    <h6>Connect With</h6>
                                    <ul className="social-link">
                                        <li>
                                            <IconButton className="icon"
                                                        onClick={() => {
                                                            this.props.showAuthLoader();
                                                            this.props.userFacebookSignIn();
                                                        }}>
                                                <i className="zmdi zmdi-facebook"/>
                                            </IconButton>
                                        </li>

                                        <li>
                                            <IconButton className="icon"
                                                        onClick={() => {
                                                            this.props.showAuthLoader();
                                                            this.props.userTwitterSignIn();
                                                        }}>
                                                <i className="zmdi zmdi-twitter"/>
                                            </IconButton>
                                        </li>

                                        <li>
                                            <IconButton className="icon"
                                                        onClick={() => {
                                                            this.props.showAuthLoader();
                                                            this.props.userGoogleSignIn();

                                                        }}>
                                                <i className="zmdi zmdi-google-plus"/>
                                            </IconButton>
                                        </li>

                                        <li>
                                            <IconButton className="icon"
                                                        onClick={() => {
                                                            this.props.showAuthLoader();
                                                            this.props.userGithubSignIn();
                                                        }}>
                                                <i className="zmdi zmdi-github"/>
                                            </IconButton>
                                        </li>
                                    </ul>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>

                {
                    loader &&
                    <div className="loader-view">
                        <CircularProgress/>
                    </div>
                }
                {showMessage && NotificationManager.error(alertMessage)}
                <NotificationContainer/>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    const {registering} = state.registration;
    return {
        alert,
        registering
    };
}

export default withRouter(connect(mapStateToProps)(RegisterPage));