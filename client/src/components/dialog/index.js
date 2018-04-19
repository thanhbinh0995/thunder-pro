import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import ImageAvatar from '../profile/ImageAvatar'

class AlertDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        avatar: null
    };

    setAvatar = (avatar) => {
        this.setState({avatar})
    };

    onSaveAvatar = () => {
        this.props.onUploadAvatar(this.state.avatar);
    };

    render() {
        const {isOpenDialog, onCloseDialog} = this.props;
        const {avatar} = this.state;
        return (
            <div>
                <Dialog
                    open={isOpenDialog}
                    onClose={onCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">Choose Image</DialogTitle>
                    <DialogContent>
                        <ImageAvatar
                            avatar={avatar}
                            setAvatar={this.setAvatar}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onCloseDialog} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.onSaveAvatar} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;
