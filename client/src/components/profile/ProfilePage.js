import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {save, uploadFile} from "../../actions/user.actions";
import Select from "material-ui/Select";
import {MenuItem} from "material-ui/Menu";
import TextField from "material-ui/TextField";
import moment from "moment";
import InputRange from "react-input-range";
import AlertDialog from "../dialog";
import {SERVER_URL} from '../../constants'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        const {user} = this.props;
        this.state = {
            user,
            value: {min: user.ageFilterMin, max: user.ageFilterMax},
            isChangeName: false,
            isChange: {
                name: false,
                email: false,
                birthday: false,
                gender: false,
                ageFilter: false,
                address: false,
            },
            isMouseEnter: false,
            selectedFile: null,
            isOpenDialog: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser) {
            this.setState({user: nextProps.currentUser})
        } else if (nextProps.res) {
            const {user} = this.state;
            user.avatar = nextProps.res.fileName;
            this.setState({user});
        }
    }

    onChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    onChangeField(event) {
        event.preventDefault();
        const {name} = event.target;
        const {isChange} = this.state;
        this.setState({
            isChange: {
                ...isChange,
                [name]: true
            }
        })
    }

    onSaveField(event) {
        event.preventDefault();
        const {name} = event.target;
        const {isChange} = this.state;
        this.setState({
            isChange: {
                ...isChange,
                [name]: false
            }
        })
    }

    onSubmit() {
        const {user, selectedFile} = this.state;
        console.log(user);
        if (selectedFile && selectedFile.name) {
            user.avatar = selectedFile.name;
            user.avatarFile = selectedFile;
        }
        this.props.save(user);
    }

    onInputRange(value) {
        let user = this.state.user;
        user.ageFilterMin = value.min;
        user.ageFilterMax = value.max;
        this.setState({value});
    }


    onMouseEnter = () => {
        this.setState({isMouseEnter: true})
    };

    onMouseLeave = () => {
        this.setState({isMouseEnter: false})

    };

    onFileChanged = (event) => {
        const file = event.target.files[0];
        console.log(file);
        this.setState({selectedFile: file})
    };

    onUploadAvatar = (avatar) => {
        this.props.uploadFile(avatar);
        this.setState({isOpenDialog: false});
    };

    onOpenDialog() {
        this.setState({isOpenDialog: true})
    };

    onCloseDialog() {
        this.setState({isOpenDialog: false})
    };

    render() {
        const {user, value, isChange, isMouseEnter, isOpenDialog} = this.state;
        const birthday = moment(user.birthday).format('YYYY-MM-DD');
        return (
            <div id="content" className="content content-full-width">
                <div className="profile">
                    <div className="profile-header">
                        <div className="profile-header-cover"/>
                        <div className="profile-header-content">
                            <div
                                onMouseEnter={this.onMouseEnter}
                                onMouseLeave={this.onMouseLeave}
                                className="profile-header-img">
                                <img
                                    src={`${SERVER_URL}${user.avatar}`}
                                    alt=""
                                    className={isMouseEnter ? "image-overflow" : ''}
                                />
                                {
                                    isMouseEnter &&
                                    <div className="upload-text-container">
                                        <p onClick={() => this.onOpenDialog()}>Update Avatar</p>
                                    </div>
                                }
                            </div>
                            <div className="profile-header-info">
                                <h4 className="m-t-10 m-b-5">Sean Ngu</h4>
                                <p className="m-b-10">UXUI + Frontend Developer</p>
                                <a href="#" className="btn btn-xs btn-yellow">Edit
                                    Profile</a>
                            </div>
                        </div>
                        <div>
                            <AlertDialog
                                isOpenDialog={isOpenDialog}
                                onCloseDialog={() => this.onCloseDialog()}
                                onUploadAvatar={this.onUploadAvatar}
                            />
                        </div>
                        <ul className="profile-header-tab nav nav-tabs">
                            <li className="nav-item">
                                <a href="#profile-about"
                                   className="nav-link active show"
                                   data-toggle="tab">ABOUT
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="#profile-photos"
                                   className="nav-link"
                                   data-toggle="tab">PHOTOS
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="tab-content p-0">
                        <div className="tab-pane fade in active show"
                             id="profile-about">
                            <div className="table-responsive">
                                <table className="table table-profile">
                                    <tbody>
                                    <tr className="highlight">
                                        <td className="field">Name</td>
                                        {!isChange.name ?
                                            <td>
                                                {user.firstName + " " + user.lastName}
                                            </td>
                                            :
                                            <td>
                                                <div>
                                                    <TextField
                                                        id="firstName"
                                                        name="firstName"
                                                        value={user.firstName}
                                                        onChange={(e) => this.onChange(e)}
                                                        margin="normal"
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        id="lastName"
                                                        name="lastName"
                                                        value={user.lastName}
                                                        onChange={(e) => this.onChange(e)}
                                                        margin="normal"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        onClick={(e) => this.onSaveField(e)}
                                                        name="name"
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        value="OK"/>
                                                </div>
                                            </td>
                                        }
                                        <td className="edit-text">
                                            <a
                                                name="name"
                                                onClick={(e) => this.onChangeField(e)}
                                                className="m-l-5">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">Phone</td>
                                        {!isChange.phone ?
                                            <td>
                                                {user.firstName}
                                            </td>
                                            :
                                            <td>
                                                <div>
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="text"
                                                        value={user.firstName}
                                                        onChange={(e) => this.onChange(e)}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        onClick={(e) => this.onSaveField(e)}
                                                        name="phone"
                                                        type="button"
                                                        value="OK"/>
                                                </div>
                                            </td>
                                        }
                                        <td className="edit-text">
                                            <a
                                                name="phone"
                                                onClick={(e) => this.onChangeField(e)}
                                                className="m-l-5">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>

                                    <tr className="highlight">
                                        <td className="field">About me</td>
                                        {!isChange.description ?
                                            <td>
                                                {user.firstName}
                                            </td>
                                            :
                                            <td>
                                                <div>
                                                    <input
                                                        id="description"
                                                        name="description"
                                                        type="text"
                                                        value={user.firstName}
                                                        onChange={(e) => this.onChange(e)}
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        onClick={(e) => this.onSaveField(e)}
                                                        name="description"
                                                        type="button"
                                                        value="OK"/>
                                                </div>
                                            </td>
                                        }
                                        <td className="edit-text">
                                            <a
                                                name="description"
                                                onClick={(e) => this.onChangeField(e)}
                                                className="m-l-5">
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">Gender</td>
                                        <td>
                                            <Select
                                                name="sex"
                                                value={user.sex}
                                                onChange={(e) => this.onChange(e)}
                                            >
                                                <MenuItem value="MALE">Male</MenuItem>
                                                <MenuItem value="FEMALE">Female</MenuItem>
                                                <MenuItem value="OTHERS">Other</MenuItem>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">Birth date</td>
                                        <td>
                                            <TextField
                                                id="birthday"
                                                name="birthday"
                                                type="date"
                                                defaultValue={birthday}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => this.onChange(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">Age Filter</td>
                                        <td>
                                            <InputRange
                                                formatLabel={value => `${value}`}
                                                maxValue={55}
                                                minValue={18}
                                                value={value}
                                                onChange={value => this.onInputRange(value)}/>
                                        </td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">Gender Filter</td>
                                        <td>
                                            <Select
                                                name="genderFilter"
                                                value={user.genderFilter}
                                                onChange={(e) => this.onChange(e)}
                                            >
                                                <MenuItem value="MALE">Male</MenuItem>
                                                <MenuItem value="FEMALE">Female</MenuItem>
                                                <MenuItem value="BOTH">MALE & FEMALE</MenuItem>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">&nbsp;</td>
                                        <td className="p-t-10 p-b-10">
                                            <input
                                                type="button"
                                                className="btn btn-primary width-150"
                                                onClick={() => this.onSubmit()}
                                                value="Submit"
                                            />
                                            <button
                                                type="submit"
                                                className="btn btn-white btn-white-without-border width-150 m-l-5"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="tab-pane fade in" id="profile-photos">
                            <h4 className="m-t-0 m-b-20">Photos (70)</h4>
                            <div className="superbox " data-offset="50">
                                <div className="superbox-list">
                                    <a className="superbox-img">
                                        <img
                                            data-img="https://seantheme.com/color-admin-v4.0/admin/assets/img/gallery/gallery-1.jpg"/>
                                        <span/>
                                    </a>
                                </div>
                                <div className="superbox-list">
                                    <a className="superbox-img">
                                        <img
                                            data-img="https://seantheme.com/color-admin-v4.0/admin/assets/img/gallery/gallery-2.jpg"/>
                                        <span/>
                                    </a>
                                </div>
                                <div className="superbox-list">
                                    <a className="superbox-img">
                                        <img
                                            data-img="https://seantheme.com/color-admin-v4.0/admin/assets/img/gallery/gallery-3.jpg"/>
                                        <span/>
                                    </a>
                                </div>
                                <div className="superbox-list">
                                    <a className="superbox-img">
                                        <img
                                            data-img="https://seantheme.com/color-admin-v4.0/admin/assets/img/gallery/gallery-4.jpg"/>
                                        <span/>
                                    </a>
                                </div>
                                <div className="superbox-list">
                                    <a className="superbox-img">
                                        <img
                                            data-img="https://seantheme.com/color-admin-v4.0/admin/assets/img/gallery/gallery-5.jpg"/>
                                        <span/>
                                    </a>
                                </div>
                                <div className="superbox-list">
                                    <a className="superbox-img">
                                        <img
                                            data-img="https://seantheme.com/color-admin-v4.0/admin/assets/img/gallery/gallery-6.jpg"/>
                                        <span/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {res} = state.users;
    return {res}
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        save,
        uploadFile
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

