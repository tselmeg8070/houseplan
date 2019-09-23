import React from 'react';
import {INITIAL_STATE} from "./initialState";
import {Typography, Grid, TextField, MenuItem, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from "@material-ui/core";
import * as MATERIAL from "../../../../constants/material";
import EditorJS from "../../HelperComponents/EditorJS";
import makeid from "../../../../utils/HelperFunctions";
import {withServer} from "../../../../Server";
import {withAuthorization} from "../../../../Session";

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        this.props.server.getMaterial(this.props.match.params.id).then(res => {
            const response = res.data;
            console.log(response.data)
            const data = JSON.parse(JSON.stringify(res.data));
            delete data.images;
            response.images.reverse().map(image => {
                data.blocks.unshift({
                    "type": "image",
                    "data": {
                        "caption": "",
                        "file": {
                            "url": image
                        }
                    }
                })
            });
            data.post = {
                "time": 1554920381017,
                "category": 0,
                "blocks": data.blocks,
                "version": "2.14"
            };
            delete data.blocks;
            const options = [];
            Object.keys(data.options).map(key => {
                return options.push({
                    key: key,
                    name: data.options[key].name,
                    price: data.options[key].price,
                    id: options.length
                })
            });
            data.options = options;
            this.setState({...data})
        })
    }

    onAddOption = () => {
        this.setState((currentState)=> {
            return ({
                options: currentState.options.concat(
                    {
                        key: makeid(5),
                        name: '',
                        price: 0,
                        index: currentState.options.length
                    })
            })
        });

    };
    onRemoveOption = () => {
        this.setState((currentState)=> {
            return ({
                options: currentState.options.filter((item)=>item !== currentState.options[currentState.options.length-1])
            })
        })
    };

    onChange = name => event => {
        this.setState({
                [name]: event.target.value
            }
        )
    };
    onChangeOptionName = id => event => {
        const value = event.target.value;
        this.setState((currentState)=> {
            const options = currentState.options;
            options[id].name = value;
            return ({
                options
            })
        })
    };
    onChangeOptionPrice = id => event => {
        const value = event.target.value;
        this.setState((currentState)=> {
            const options = currentState.options;
            options[id].price = value;
            return ({
                options
            })
        })
    };

    onSubmit = () => {
        const data = JSON.parse(JSON.stringify(this.state));
        delete data.dialog;
        this.props.server.doAddOrEditMaterial(data, this.props.match.params.id).then(data=>console.log(data)).catch(e=>console.log(e));
    };

    onClickDelete = () => {
        this.props.server.doDeleteMaterial(this.props.match.params.id).then(response=>{console.log(response.data)})
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
                post: data
            })
        };
        return (
            <Container maxWidth='md'  className='container py-5 mt-3'>
                {this.state.name === '' ? <div></div>
                    : <div>
                        {console.log(this.state.options)}
                        <Dialog
                            open={this.state.dialog}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Баталгаажуулах асуулт"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Та энэ материаллыг устгахдаа итгэлтэй байна уу?
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
                        <Typography variant='h4'>Материал засах</Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Нэр"
                                    value={this.state.name}
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.onChange('name')}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Код"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.code}
                                    onChange={this.onChange('code')}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Зарагдах хэлбэр"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.onChange('sellType')}
                                    value={this.state.sellType}
                                >
                                    {MATERIAL.sellType.map((type)=> (
                                        <MenuItem key={type.id} value={type.id}>{type.text}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Төрөл"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.onChange('category')}
                                    value={this.state.category}
                                >
                                    {MATERIAL.categories.map((type)=> (
                                        <MenuItem key={type.id} value={type.id}>{type.text}</MenuItem>
                                    ))}

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={8}>
                                <EditorJS onChange={onChange} data={this.state.post}/>
                            </Grid>
                            <Grid item xs={4}>
                                {(this.state.options || []).map(option => {
                                    return (
                                        <div key={option.id}>
                                            <TextField
                                                onChange={this.onChangeOptionName(option.id)}
                                                label="Төрлийн нэр"
                                                margin="normal"
                                                variant="outlined"
                                                fullWidth
                                                value={option.name}
                                            />
                                            <TextField
                                                label="Төрлийн үнэ"
                                                variant="outlined"
                                                margin="none"
                                                fullWidth
                                                value={option.price}
                                                onChange={this.onChangeOptionPrice(option.id)}
                                            />
                                            <br/>
                                            <br/>
                                        </div>
                                    )
                                })}
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button
                                            onClick={this.onAddOption}
                                            color='primary'
                                            variant='contained'
                                            fullWidth>
                                            төрөл нэмэх
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            onClick={this.onRemoveOption}
                                            color='secondary'
                                            variant='contained'
                                            fullWidth>
                                            төрөл хасах
                                        </Button>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Button
                                    color='primary'
                                    variant='outlined'
                                    fullWidth
                                    onClick={this.onSubmit}
                                >Материал засах</Button>
                                <br/>
                                <br/>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    fullWidth
                                    onClick={this.handleOpen}
                                >Материал устгах</Button>
                            </Grid>
                        </Grid>
                    </div>
                }

            </Container>
        )
    }
}
export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(Update));