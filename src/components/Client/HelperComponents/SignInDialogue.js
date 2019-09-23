import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Tabs,
    Tab
} from '@material-ui/core'
import {connect} from "react-redux";
import {hideSignInDialogue} from "../../../redux/actions/page";
import {withStyles} from "@material-ui/styles";
import {compose} from "recompose";
import {withServer} from "../../../Server";
import {withRouter} from 'react-router-dom'

const styles = {
    dialogAction: {
        margin: '14px',
    },
};
const INITIAL_STATE = {
    email: '',
    password: '',
    error_mail: false,
    error_pass: false,
};

class SignInDialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.onHideSignInDialogue();
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    render() {
        const {classes} = this.props;
        const {email, password, error_mail, error_pass} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <Dialog open={this.props.showSignInDialogue} onClose={this.props.onHideSignInDialogue} aria-labelledby="form-dialog-title" PaperProps={{square: true}}>

                <DialogTitle id="form-dialog-title">
                    <Tabs
                        value={0}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="fullWidth"
                        // onChange={handleChange}
                        aria-label="disabled tabs example"
                        centered
                    >
                        <Tab label="Нэвтрэх" />
                        <Tab label="Бүртгүүлэх" />
                    </Tabs>
                </DialogTitle>


            </Dialog>
        )
    }
}


const mapStateToProps = (state) => ({
    showSignInDialogue: state.pageState.showSignInDialogue
});
const mapDispatchToProps = (dispatch) => ({
    onHideSignInDialogue: () => {
        dispatch(hideSignInDialogue());
    }
});


export default compose(
    withRouter,
    withServer,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(SignInDialogue)