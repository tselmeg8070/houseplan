import React from 'react';
import EditorJS from '../../HelperComponents/EditorJS'
import Container from '@material-ui/core/Container';
import {Typography} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import * as MATERIAL from '../../../../constants/material'
import makeid from '../../../../utils/HelperFunctions'
import * as Initial from './initialState'
import {withServer} from "../../../../Server";
import {withAuthorization} from "../../../../Session";


class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = Initial.INITIAL_STATE
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
        this.props.server.doAddOrEditMaterial(JSON.parse(JSON.stringify(this.state))).then(data=>console.log(data)).catch(e=>console.log(e));
       // fetch(url).then(response => response.json()).then(data => console.log(data))
    };

    render() {


        const onChange = (data) => {
            this.setState( {
                post: data
            })
        };
        return (
            <Container maxWidth='md'  className='container py-5 mt-3'>
                <Typography variant='h4'>Шинэ материал нэмэх</Typography>
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
                                <div key={option.index}>
                                    <TextField
                                        onChange={this.onChangeOptionName(option.index)}
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
                                        onChange={this.onChangeOptionPrice(option.index)}
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
                        >Материал нэмэх</Button>

                    </Grid>
                </Grid>
            </Container>
        )
    }
}
export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(Create))