import React from 'react';
import EditorJS from '../../HelperComponents/EditorJS'
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import * as HOUSE from "../../../../constants/house";
import * as COMPANY from "../../../../constants/company";
import * as MATERIAL from "../../../../constants/material"
import {INITIAL_STATE} from "./initialState";
import {withServer} from "../../../../Server";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {withAuthorization} from "../../../../Session";
import {numberWithCommas} from "../../../../utils/HelperFunctions";

let materialsSum = 0;

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE
    }

    componentDidMount() {
        this.props.server.getHouseRaw(this.props.match.params.id).then(res=>{
            const data = JSON.parse(JSON.stringify(res.data));
            delete data.images;
            res.data.images.reverse().map(image => {
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
            const temp = [];
            data.materials.map(material => {
                temp.push({
                    id: temp.length,
                    option: material.option,
                    value: material.value,
                    quantity: material.quantity
                });
            });
            data.materials = temp;
            const tempActivity = [];
            data.activities.map(activity => {
                tempActivity.push({
                    value: activity,
                    id: tempActivity.length
                })
            });
            data.activities = tempActivity;
            this.setState({...data});
            this.props.server.getMaterialMiniData().then(req=>this.setState({dummy: {materials: req.data}}));
        });

    }

    onClickAddActivity = () => {
        this.setState({
            activities: this.state.activities.concat({
                value: 0,
                id: this.state.activities.length
            })
        })
    };
    onClickRemoveActivity = () => {
        this.setState({
            activities: this.state.activities.filter((item)=>item !== this.state.activities[this.state.activities.length-1])
        })
    };


    onClickAddMaterial = () => {
        this.setState({
            materials: this.state.materials.concat({
                value: '',
                option: '',
                quantity: 0,
                id: this.state.materials.length,
            })
        })
    };
    onClickRemoveMaterial = () => {
        this.setState({
            materials: this.state.materials.filter((item)=>item !== this.state.materials[this.state.materials.length-1])
        })
    };


    onChangeWithIndex = (name, prop, i) => (e) => {
        const value = e.target.value;
        this.setState((current) => {
            current[name][i][prop] = value;
            return ({
                [name]: current[name]
            })
        })
    };
    onChangeMaterial = i => e => {
        const value = e.target.value;
        this.setState(current => {
            current.materials[i].value = value;
            current.materials[i].option = '';
            current.materials[i].quantity = 0;
            return ({
                materials: current.materials
            })
        })
    };
    onChangeMaterialOption = (i) => (event) => {
        this.setState((current)=>{
            current.materials[i].option = event.target.value;
            return ({
                materials: current.materials
            })
        })
    };

    onChangeInput = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
    };

    onSubmit = () => {
        const data = JSON.parse(JSON.stringify(this.state));
        data.materialsSum = materialsSum;
        delete data.dialog;
        this.props.server.doAddOrEditHousePlan(data, this.props.match.params.id).then(data=>console.log(data));
    };
    onDelete = () => {
        this.props.server.doDeleteHouse(this.props.match.params.id).then(res => console.log(res.data));
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
        materialsSum = 0;
        this.state.materials.map(material => {
            if(this.state.dummy.materials !== null && material.value !== '' && material.quantity !== 0 && material.option !== '') {
                materialsSum = materialsSum + this.state.dummy.materials[material.value].options[material.option].price * material.quantity
            }
        });

        return (

            <Container maxWidth='md'  className='container py-5 mt-3'>
                {console.log(this.state)}
                {this.state.code !== null &&
                    <div>
                        <Dialog
                            open={this.state.dialog}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Баталгаажуулах асуулт"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Та энэ план зургыг устгахдаа итгэлтэй байна уу?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Үгүй
                                </Button>
                                <Button onClick={this.onDelete} color="primary" autoFocus>
                                    Тийм
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Typography variant='h4'>
                            План засах
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={4} >
                                <TextField
                                    id="outlined-name"
                                    label="Код"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.code}
                                    onChange={this.onChangeInput('code')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="outlined-name"
                                    label="Үнэ"
                                    margin="normal"
                                    variant="outlined"
                                    type="number"
                                    value={this.state.price}
                                    onChange={this.onChangeInput('price')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Улирал"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    value={this.state.season}
                                    onChange={this.onChangeInput('season')}
                                >
                                    <MenuItem value={0}>Зуны</MenuItem>
                                    <MenuItem value={1}>Өвлийн</MenuItem>

                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Талбай"
                                    margin="normal"
                                    type="number"
                                    variant="outlined"
                                    value={this.state.area}
                                    onChange={this.onChangeInput('area')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Давхар"
                                    type="number"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.floors}
                                    onChange={this.onChangeInput('floors')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Өрөө"
                                    type="number"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.rooms}
                                    onChange={this.onChangeInput('rooms')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Хийц"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    onChange={this.onChangeInput('builtWith')}
                                    value={this.state.builtWith}
                                >
                                    {HOUSE.builtWith.map((type)=> (
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
                                <Typography variant='h6'>Үйл ажиллагаа</Typography>
                                {this.state.activities.map(activity => (
                                    <div key={activity.id}>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Үйл ажиллагаа"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            onChange={this.onChangeWithIndex('activities', 'value', activity.id)}
                                            value={activity.value}
                                        >
                                            {COMPANY.activities.map((type)=> (
                                                <MenuItem key={type.id} value={type.id}>{type.text}</MenuItem>
                                            ))}

                                        </TextField>
                                    </div>
                                ))}

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button onClick={this.onClickAddActivity} variant='contained' color='primary' fullWidth>нэмэх</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={this.onClickRemoveActivity} variant='contained' color='secondary' fullWidth>хасах</Button>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Typography variant='h6'>Материал</Typography>
                                {this.state.dummy.materials !== null && this.state.materials.map(material => (
                                    <div key={material.id}>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Материал"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            onChange={this.onChangeMaterial( material.id)}
                                            value={material.value}
                                        >
                                            {Object.keys(this.state.dummy.materials).map((materialKey)=> (
                                                <MenuItem key={materialKey} value={materialKey}>{this.state.dummy.materials[materialKey].name}</MenuItem>
                                            ))}

                                        </TextField>
                                        <Grid container spacing={2}>
                                            <Grid item xs={8}>
                                                <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Сонголт"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={this.onChangeMaterialOption(material.id)}
                                                    value={material.option}
                                                >
                                                    {material.value !== '' && Object.keys(this.state.dummy.materials[material.value].options).map((optionKey)=> (
                                                        <MenuItem key={optionKey} value={optionKey}>{this.state.dummy.materials[material.value].options[optionKey].name}</MenuItem>
                                                    ))}
                                                    {material.value === '' && (<MenuItem value={''}></MenuItem>)
                                                    }

                                                </TextField>
                                            </Grid>
                                            <Grid item xs={4}>

                                                <TextField
                                                    label={material.value !== '' ? MATERIAL.sellType[this.state.dummy.materials[material.value].sellType].text : 'Ширхэг'}
                                                    variant="outlined"
                                                    type="number"
                                                    value={material.quantity}
                                                    onChange={this.onChangeWithIndex('materials','quantity', material.id)}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                ))}

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button onClick={this.onClickAddMaterial} variant='contained' color='primary' fullWidth>нэмэх</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={this.onClickRemoveMaterial} variant='contained' color='secondary' fullWidth>хасах</Button>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Typography variant={'h5'}>Үнэн дүн</Typography>
                                <Typography variant={'h5'}>{numberWithCommas(materialsSum)}₮</Typography>
                                <br/>
                                <Button variant='outlined' color='primary' onClick={this.onSubmit} fullWidth>План зураг засах</Button>
                                <br/>
                                <br/>
                                <Button variant='contained' onClick={this.handleOpen} fullWidth>План устгах</Button>
                            </Grid>
                        </Grid>
                    </div>
                }

            </Container>
        )
    }
}
export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(Update))