import React from 'react';
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent, DialogContentText, DialogActions
} from "@material-ui/core";
import * as COMPANY from '../../../../constants/company'
import {INITIAL_STATE} from "./initialState";
import EditorJS from "../../HelperComponents/EditorJS";
import {withServer} from "../../../../Server";
import {withAuthorization} from "../../../../Session";

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }
    componentDidMount() {
        this.props.server.getCompany(this.props.match.params.id).then(response => {
            const data = JSON.parse(JSON.stringify(response.data));
            data.blocks.unshift(
                {
                    "type": "image",
                    "data": {
                        "caption": "",
                        "file": {
                            "url": data.logo,
                        }
                    },
                },
            );
            data.post = {
                "time": 1554920381017,
                "category": 0,
                "blocks": data.blocks,
                "version": "2.14"
            };
            const activities = [];
            data.activities.map(activity => {
                activities.push({
                    value: activity,
                    id: activities.length
                })
            });
            data.activities = activities;
            delete data.blocks;
            delete data.logo;
            this.setState({
                ...data
            })
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

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
    };

    onChangeWithIndex = (name, i) => (e) => {
        const value = e.target.value;
        this.setState((current) => {
            current[name][i].value = value;
            return ({
                [name]: current[name]
            })
        })
    };

    onSubmit = () => {
        const data = JSON.parse(JSON.stringify(this.state));
        delete data.dialog;
        this.props.server.doAddOrEditCompany(data, this.props.match.params.id).then(res => {
            console.log(res.data);
        });
    };
    onClickDelete = () => {
        this.props.server.doDeleteCompany(this.props.match.params.id).then(response=>{console.log(response.data)})
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
                {this.state.name === null
                    ? <div></div>
                    : <div>
                        <Dialog
                            open={this.state.dialog}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            {console.log(this.state)}
                            <DialogTitle id="alert-dialog-title">{"Баталгаажуулах асуулт"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Та энэ компаныг устгахдаа итгэлтэй байна уу?
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
                        <Typography variant='h4'>Компани засах</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-name"
                                    label="Нэр"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-name"
                                    label="Гишүүнчлэлийн эрх"
                                    select
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.membership}
                                    onChange={this.handleChange('membership')}
                                    fullWidth
                                >
                                    {COMPANY.memberships.map(membership =>
                                        <MenuItem key={membership.id} value={membership.id}>{membership.text}</MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Утасны дугаар"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.phone}
                                    onChange={this.handleChange('phone')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Цахим хаяг"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Цахим хуудас"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.website}
                                    onChange={this.handleChange('website')}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-name"
                                    label="Байршил"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.location}
                                    onChange={this.handleChange('location')}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
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
                                            onChange={this.onChangeWithIndex('activities',  activity.id)}
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
                                <Button onClick={this.onSubmit} variant='outlined' color='primary' fullWidth>Компани засах</Button>
                                <Button onClick={this.handleOpen} variant='container' color='primary' fullWidth>Компани устгах</Button>
                            </Grid>
                        </Grid>
                    </div>
                }

            </Container>
        )
    }
}
export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(Update))