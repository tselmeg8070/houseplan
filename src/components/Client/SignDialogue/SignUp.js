import React from 'react'
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {withServer} from "../../../Server";


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            location: '',
            password: '',
        }
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    onSubmit = () => {
        this.props.server.authRegister(this.state);
    };
    render() {
        const {name, email, phone, location, password} = this.state;
        const isInvalid = name === '' || email === '' || phone === '' || location === '' || password === '';
        return (
            <>
                <DialogContent>
                    <DialogContentText>
                        Та өөрийн хувийн мэдээллээ үнэн зөв бөглөн үү
                    </DialogContentText>
                    <TextField
                        label="Нэр"
                        fullWidth
                        name="name"
                        autoComplete="name"
                        onChange={this.onChange}
                        value={name}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
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
                        label="Утасны дугаар"
                        type="number"
                        fullWidth
                        name="phone"
                        autoComplete="phone"
                        onChange={this.onChange}
                        value={phone}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Гэрийн хаяг"
                        fullWidth
                        name="location"
                        autoComplete="location"
                        onChange={this.onChange}
                        value={location}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
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
                    <Button color='secondary' onClick={this.props.onHideSignInDialogue} >
                        Болих
                    </Button>
                    <Button onClick={this.onSubmit} disabled={isInvalid} color="secondary">
                        Бүртгүүлэх
                    </Button>
                </DialogActions>
            </>
        )
    }
}
export default withServer(SignUp)