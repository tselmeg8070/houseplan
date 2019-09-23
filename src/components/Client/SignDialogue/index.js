import React from 'react';
import Dialog from '@material-ui/core/Dialog';
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
import SignIn from './SignIn'
import SignUp from './SignUp'
const styles = {
    dialogAction: {
        margin: '14px',
    },
};
const INITIAL_STATE = {
    tab: 0
};

class SignInDialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }
    onChange = (event, value) => {
        console.log(value);
        this.setState({ 'tab': value });
    };
    onSubmit = (event) => {
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
        const tab = this.state.tab;
        return (
            <Dialog open={this.props.showSignInDialogue} onClose={this.props.onHideSignInDialogue} aria-labelledby="form-dialog-title" PaperProps={{square: true}}>

                <DialogTitle id="form-dialog-title">
                    <Tabs
                        name='tab'
                        value={tab}
                        indicatorColor="secondary"
                        textColor="primary"
                        variant="fullWidth"
                        onChange={this.onChange}
                        centered
                    >
                        <Tab label="Нэвтрэх" tabIndex={0}/>
                        <Tab label="Бүртгүүлэх" tabIndex={1}/>
                    </Tabs>
                </DialogTitle>
                {tab === 0 && <SignIn/>}
                {tab === 1 && <SignUp/>}

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