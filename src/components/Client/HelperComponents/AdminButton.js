import React from 'react'
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom'

class AdminButton extends React.Component {
    onClickAdminButton = () => {
        this.props.history.push('/admin/edit/' + this.props.name + '/' + this.props.id);
    };
    render() {
        const authUser = this.props.authUser;
        return (
            <div>
                {authUser !== null && authUser.role === 1 && <Button onClick={this.onClickAdminButton} fullWidth variant={'contained'} color={'primary'}>Янзлах</Button>}
            </div>
        )
    }
}
const mapDispatchToProps = (state) => ({
        authUser: state.sessionState.authUser
    });
export default connect(mapDispatchToProps)(withRouter(AdminButton))