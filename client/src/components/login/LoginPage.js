import React from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {userActions} from "../../actions";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {history} from "../../helpers/history";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // this.props.dispatch(userActions.logout());
        if (localStorage.getItem('user')) {
            history.push('/');
        }
        this.state = {
            username: '',
            password: '',
            submitted: false,
            clickUsername: false,
            clickPassword: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const {dispatch} = this.props;
        const {username, password} = this.state;
        const user = {
            username,
            password,
        };
        if (user.username && user.password) {
            dispatch(userActions.login(user));
        }
    }

    responseFacebook = (response) => {
        const {dispatch} = this.props;
        const user = {
            email: response.email,
            username: response.name,
            birthday: response.birthday,
            password: '',
            sex: response.gender
        };
        dispatch(userActions.loginFacebook(user))
    };

    onInputUsernameClick(e) {
        e.preventDefault();
        this.setState({clickUsername: true})
    }

    onInputPasswordClick(e) {
        e.preventDefault();
        this.setState({clickPassword: true})
    }

    render() {
        const {loggingIn, alert} = this.props;
        const {submitted} = this.state;
        const {showMessage, alertMessage} = this.props;
        const {username, password} = this.state;

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
                        <div className="app-login-header mb-4">
                            <h1><span>Login</span></h1>
                            {
                                alert && alert.message &&
                                <div className="alert alert-danger">
                                    <p>{alert.message}</p>
                                </div>
                            }
                        </div>
                        <div className="app-login-form">
                            <form onSubmit={() => this.handleSubmit()}>
                                <fieldset>
                                    <TextField
                                        label={<h3>Username</h3>}
                                        fullWidth
                                        onKeyPress={e => (e.key === 'Enter' && this.handleSubmit(e))}
                                        onChange={(event) => this.setState({username: event.target.value})}
                                        defaultValue={username}
                                        margin="normal"
                                        className="mt-1 my-sm-3 form-item"
                                    />
                                    <TextField
                                        type="password"
                                        label={<h3>Password</h3>}
                                        fullWidth
                                        onKeyPress={e => (e.key === 'Enter' && this.handleSubmit(e))}
                                        onChange={(event) => this.setState({password: event.target.value})}
                                        defaultValue={password}
                                        margin="normal"
                                        className="mt-1 my-sm-3 form-item"
                                    />

                                    <div className="mb-3 d-flex align-items-center justify-content-between">
                                        <Button onClick={(event) => {
                                            this.handleSubmit(event);
                                        }} variant="raised" color="primary">
                                            Sign In
                                        </Button>

                                        <Link to="/register">
                                            Sign Up
                                        </Link>
                                    </div>

                                    <div className="app-social-block my-1 my-sm-3">
                                        <p>Connect with</p>
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
                                </fieldset>
                            </form>
                        </div>
                    </div>

                </div>
                {showMessage && NotificationManager.error(alertMessage)}
                <NotificationContainer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {alert} = state;
    const {loggingIn} = state.authentication;
    return {
        loggingIn,
        alert
    };
}

export default withRouter(connect(mapStateToProps)(LoginPage));