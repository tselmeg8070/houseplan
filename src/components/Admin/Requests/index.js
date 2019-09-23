import React from 'react';
import {withServer} from "../../../Server";
import {compose} from 'recompose'
import * as ROUTES from '../../../constants/routes'
import {Link} from 'react-router-dom'
import {timeConverter, timeHourConverter} from "../../../utils/HelperFunctions";
import {withAuthorization} from "../../../Session";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: {}
        }
    }
    componentDidMount() {
        this.props.server.getRequests().then(res => {
            this.setState({requests: res.data})
        })
    }

    render() {
        const requests = this.state.requests;
        var i = 1;
        return (
            <div className={'container py-5 mt-5'}>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">План</th>
                        <th scope="col">Нэр</th>
                        <th scope="col">Утас</th>
                        <th scope="col">Цахим хаяг</th>
                        <th scope="col">Өдөр</th>
                        <th scope="col">Цаг</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(requests).reverse().map(key =>
                        <tr>
                            <th scope="row">{i++}</th>
                            <td><Link to={ROUTES.PLAN + requests[key].id}>{requests[key].code}</Link></td>
                            <td>{requests[key].name}</td>
                            <td>{requests[key].phone}</td>
                            <td>{requests[key].email}</td>
                            <td>{timeConverter(requests[key].dateCreated*1000)}</td>
                            <td>{timeHourConverter(requests[key].dateCreated*1000)}</td>

                        </tr>
                    )}

                    </tbody>
                </table>
            </div>
        )
    }
}
export default compose(
    withServer,
    withAuthorization(authUser => !!authUser && authUser.role === 1)
)(Requests)