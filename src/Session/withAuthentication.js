import React from 'react'
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {applySetAuthUser} from "../redux/actions/session";
import {withServer} from "../Server";

const withAuthentication = Component => {
    class withAuthentication extends React.Component {
        constructor(props) {
            super(props);
            if(JSON.parse(localStorage.getItem('authUser'))) {
                const user = {};
                user.name = JSON.parse(localStorage.getItem('name'));
                user.email = JSON.parse(localStorage.getItem('email'));
                user.location = JSON.parse(localStorage.getItem('location'));
                user.role = JSON.parse(localStorage.getItem('role'));
                user.phone = JSON.parse(localStorage.getItem('phone'));
                user.dateCreated = JSON.parse(localStorage.getItem('dateCreated'));
                this.props.onSetAuthUser(user)
            }
            this.props.onSetAuthUser(null);

        }

        componentDidMount() {
            JSON.parse(localStorage.getItem('authUser')) &&
            this.props.server.authState()
                .then(res => {
                    const user = res.data;
                    localStorage.setItem('name', JSON.stringify(user.name));
                    localStorage.setItem('email', JSON.stringify(user.email));
                    localStorage.setItem('location', JSON.stringify(user.location));
                    localStorage.setItem('role', JSON.stringify(user.role));
                    localStorage.setItem('phone', JSON.stringify(user.phone));
                    localStorage.setItem('dateCreated', JSON.stringify(user.dateCreated));
                    this.props.onSetAuthUser(user)
                })
                .catch(() => {
                    localStorage.removeItem('authUser');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    localStorage.removeItem('location');
                    localStorage.removeItem('role');
                    localStorage.removeItem('phone');
                    localStorage.removeItem('dateCreated');
                    this.props.onSetAuthUser(null);
                },
            )
        }

        render() {
            return (
                <Component {...this.props}/>
            )
        }
    }
    const mapDispatchToProps = (dispatch) => ({
        onSetAuthUser: authUser => {
            dispatch(applySetAuthUser(authUser))
        },
    });
    return compose(
        withServer,
        connect(null, mapDispatchToProps),
        )(withAuthentication);
};
export default withAuthentication;