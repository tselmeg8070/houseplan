import React from 'react'
import {Container, Typography, Grid, TextField, Button, MenuItem} from "@material-ui/core";
import * as COMPANY from '../../../../constants/company'
import {INITIAL_STATE} from "./initialState";
import EditorJS from "../../HelperComponents/EditorJS";
import {withServer} from "../../../../Server";
import {withAuthorization} from "../../../../Session";
class CreateCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
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
        this.props.server.doAddOrEditCompany(data).then(res => {
            console.log(res.data);
        });
    };

    render() {
        const onChange = (data) => {
            this.setState( {
                post: data
            })
        };
        return (
            <Container maxWidth='md'  className='container py-5 mt-3'>
                <Typography variant='h4'>Шинэ компани нэмэх</Typography>
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
                        <Button onClick={this.onSubmit} variant='outlined' color='primary' fullWidth>Компани нэмэх</Button>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(CreateCompany))