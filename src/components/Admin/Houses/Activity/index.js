import React from 'react';
import * as COMPANY from '../../../../constants/company';
import {Container, Grid, Typography, TextField, MenuItem, Button} from "@material-ui/core";
import {INITIAL_STATE} from './initialState'
import {withServer} from "../../../../Server";
import * as HOUSE from "../../../../constants/house";
import makeId from '../../../../utils/HelperFunctions'
import {withAuthorization} from "../../../../Session";

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }
    componentDidMount() {
        this.props.server.getHouseRaw(this.props.match.params.id).then(res=> {
            this.setState({house: res.data});
        });
        this.props.server.getCompaniesMini().then(res => this.setState({companies: res.data}));
    }

    onClickAddOffer = (id) => {
        this.setState(current => {
            return ({
                house: {
                    ...current.house,
                    offers: {
                        ...current.house.offers,
                        [id]: {
                            ...current.house.offers[id],
                            [makeId(5)]: {
                                id: '',
                                logo: '',
                                activities: [],
                                membership: 0,
                                name: '',
                                description: '',
                                price: 0
                            }
                        }

                    }
                }
            })
        })
    };


    onChange = (e) => (name) => (activity) => (offerKey) => {
        if(name === 'id')
        this.setState(current => {
            return ({
                house: {
                    ...current.house,
                    offers: {
                        ...current.house.offers,
                        [activity]: {
                            ...current.house.offers[activity],
                            [offerKey]: {
                                ...current.house.offers[activity][offerKey],
                                [name]: e,
                                logo: current.companies[e].logo,
                                activities: current.companies[e].activities,
                                membership: current.companies[e].membership,
                                name: current.companies[e].name,
                            }
                        }

                    }
                }
            })
        });
        else
            this.setState(current => {
                return ({
                    house: {
                        ...current.house,
                        offers: {
                            ...current.house.offers,
                            [activity]: {
                                ...current.house.offers[activity],
                                [offerKey]: {
                                    ...current.house.offers[activity][offerKey],
                                    [name]: e,
                                }
                            }

                        }
                    }
                })
            })
    };
    onDeleteOffer = (activity) => (offerKey) => {
        const house = JSON.parse(JSON.stringify(this.state.house));
        delete house.offers[activity][offerKey];
        this.setState({house});
    };

    onSubmit = () => {
        this.props.server.doAddOrEditHousePlan(JSON.parse(JSON.stringify(this.state.house)), this.props.match.params.id, true).then(res=>console.log(res))
    };
    render() {
        return (
            <Container maxWidth={'sm'}  className='container py-5 mt-3'>
                <Button variant={"outlined"} onClick={this.onSubmit}>ОРУУЛАХ</Button>
                {console.log(this.state)}
                {this.state.house.activities.map(activity =>
                    <div key={activity}>
                        <Typography variant={'h5'}>{COMPANY.activities[activity].text}</Typography>
                        {Object.keys(this.state.house.offers[activity]).map(offerKey =>
                            <div key={offerKey}>
                                <Grid container spacing={2}>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Компани"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => this.onChange(e.target.value)('id')(activity)(offerKey)}
                                            value={this.state.house.offers[activity][offerKey].id}
                                        >
                                            {Object.keys(this.state.companies).map((companyKey)=> (
                                                this.state.companies[companyKey].activities.includes(activity) &&
                                                <MenuItem key={companyKey} value={companyKey}>{this.state.companies[companyKey].name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="outlined-name"
                                            label="Үнэ"
                                            type="number"
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.house.offers[activity][offerKey].price}
                                            onChange={(e) => this.onChange(e.target.value)('price')(activity)(offerKey)}

                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    id="outlined-name"
                                    label="Тайлбар"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.house.offers[activity][offerKey].description}
                                    onChange={(e) => this.onChange(e.target.value)('description')(activity)(offerKey)}
                                    fullWidth
                                />
                                <Button margin={'dense'} onClick={()=>this.onDeleteOffer(activity)(offerKey)} variant={'contained'}> Хасах </Button>

                            </div>
                        )}
                        <br/>
                        <Button variant={'contained'} fullWidth color={'primary'} onClick={()=>this.onClickAddOffer(activity)}>Үнийн санал нэмэх</Button>
                        <br/>
                        <br/>
                    </div>)}
            </Container>
        )
    }
}
export default withAuthorization(authUser => !!authUser && authUser.role === 1)(withServer(Activity))