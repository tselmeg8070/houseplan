import React from 'react';
import {INITIAL_STATE} from './initialState'
import EditorJS from '../../HelperComponents/EditorJS'
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core'
import {withServer} from "../../../../Server";
import {withAuthorization} from "../../../../Session";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }
    componentDidMount() {
        this.props.server.getPost(this.props.match.params.id).then(res => this.setState({...res.data}))
    }

    onSubmit = () => {
        const data = JSON.parse(JSON.stringify(this.state));
        this.props.server.doAddOrEditPost(data, this.props.match.params.id).then(res=>console.log(res.data));
    };
    onClickDelete = () => {
        this.props.server.deDeletePost(this.props.match.params.id).then(response=>{console.log(response.data)})
    };
    handleClose = () => {
        this.setState({
            dialog: false
        })
    };
    handleOpen = () => {
        this.setState({
            dialog: true
        })
    };

    render() {
        const onChange = (data) => {
            this.setState( {
                ...data
            })
        };
        return (
            <Container maxWidth={'md'}  className='container py-5 mt-3'>
                <Dialog
                    open={this.state.dialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Баталгаажуулах асуулт"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Та энэ нийтлэлийг устгахдаа итгэлтэй байна уу?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Үгүй
                        </Button>
                        <Button onClick={this.onClickDelete} color="primary" autoFocus>
                            Тийм
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button variant={"outlined"} onClick={this.onSubmit} color={'primary'}>НИЙТЛЭХ</Button>
                <Button variant={"outlined"} onClick={this.handleOpen} color={'danger'}>УСТГАХ</Button>
                {this.state.blocks.length > 1 &&
                    <EditorJS onChange={onChange} data={this.state}/>
                }
            </Container>
        )
    }
}
export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(Create))