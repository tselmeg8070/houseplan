import React from 'react'
import * as ROUTES from '../constants/routes'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import {withServer} from "../Server";
import {connect} from 'react-redux';

const withAuthorization = (condition) => (Component) => {
    class withAuthorization extends React.Component {
        componentDidMount() {
            JSON.parse(localStorage.getItem('authUser')) &&
            this.props.server.authState().then(
                res => {
                    if(!condition(res.data)) {
                        this.props.history.push(ROUTES.LANDING);
                    }
                }
            )
        }

        render() {
            return condition(this.props.authUser) ? (<Component {...this.props}/>) : null
        }
    }
    const mapStateToProps = (state) => ({
        authUser: state.sessionState.authUser
    });
    return compose(
        withRouter,
        withServer,
        connect(mapStateToProps),
    )(withAuthorization)
};

export default withAuthorization