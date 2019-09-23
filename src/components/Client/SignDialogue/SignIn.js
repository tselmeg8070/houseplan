import React from 'react'
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {withServer} from "../../../Server";
import {connect} from "react-redux";
import {applySetAuthUser} from "../../../redux/actions/session";
import {hideSignInDialogue} from "../../../redux/actions/page";
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onSubmit = () => {
          this.props.server.authSignIn(this.state).then(res => {
              localStorage.setItem('authUser', JSON.stringify(res.data));
              this.props.server.authState()
                  .then(authRes =>{
                      const user = authRes.data;
                      localStorage.setItem('name', JSON.stringify(user.name));
                      localStorage.setItem('email', JSON.stringify(user.email));
                      localStorage.setItem('location', JSON.stringify(user.location));
                      localStorage.setItem('role', JSON.stringify(user.role));
                      localStorage.setItem('phone', JSON.stringify(user.phone));
                      localStorage.setItem('dateCreated', JSON.stringify(user.dateCreated));
                      this.props.onSetAuthUser(user);
                      this.props.onHideSignInDialogue();
                  })
                  .catch(() => {
                      localStorage.removeItem('authUser');
                      this.props.onSetAuthUser(null);
                  })
          })
    };
    render() {
        const {email, password} = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <>
                <DialogContent>
                    <DialogContentText>
                        Та өөрийн бүртгэлтэй мэдээллээ ашиглаж нэвтэрч орно уу
                    </DialogContentText>
                    <TextField
                        id="outlined-email-input"
                        label="Цахим хаяг"
                        type="email"
                        fullWidth
                        name="email"
                        autoComplete="email"
                        onChange={this.onChange}
                        value={email}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-email-input"
                        label="Нууц үг"
                        type="password"
                        fullWidth
                        name="password"
                        onChange={this.onChange}
                        value={password}
                        autoComplete="password"
                        margin="normal"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>

                    <Button onClick={this.onSubmit} disabled={isInvalid} color="secondary">
                        Оруулах
                    </Button>
                </DialogActions>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: authUser => {
        dispatch(applySetAuthUser(authUser))
    },
    onHideSignInDialogue: () => {
        dispatch(hideSignInDialogue());
    }
});
export default withServer(connect(null, mapDispatchToProps)(SignIn))