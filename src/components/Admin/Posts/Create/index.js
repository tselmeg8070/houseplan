import React from 'react';
import {INITIAL_STATE} from './initialState'
import EditorJS from '../../HelperComponents/EditorJS'
import {Button, Container} from '@material-ui/core'
import {withServer} from "../../../../Server";
import {withAuthorization} from "../../../../Session";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    onSubmit = () => {
        this.props.server.doAddOrEditPost(JSON.parse(JSON.stringify(this.state))).then(res=>console.log(res.data));
    };

    render() {
        const onChange = (data) => {
            this.setState( {
                ...data
            })
        };
        return (
            <Container maxWidth={'md'}  className='container py-5 mt-3'>
                <Button variant={"outlined"} onClick={this.onSubmit} color={'primary'}>НИЙТЛЭХ</Button>
                <EditorJS onChange={onChange} data={this.state}/>
            </Container>
        )
    }
}
export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(Create))