import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import House from '../HelperComponents/House'
// import Filter from '../HelperComponents/Filter'
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import {INITIAL_STATE} from "./initialState";
import {compose} from 'recompose';
import {withServer} from "../../../Server";

import Filter from '../../shared/Filter';
import PlanItem from '../../shared/PlanItem'
import Executors from '../../shared/Executors';
import Footer from '../../shared/Footer';

const styles = {
    filterIcon: {
        marginTop: '0px',
    },
    filterText: {
        paddingTop: '8px',
        marginBottom: '8px',
    },
    buttonBack: {
        marginTop: '10px',
        marginLeft: '5px',

    },
    buttonNext: {
        marginTop: '10px',
        marginLeft: '5px',
    }
};

const limit = 9;

class HouseList extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleMaterialChange = (material) => {
        this.setState((current)=>({
            filter: {
                ...current.filter,
                material,
            }
        }));
    };

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log(value);
        this.setState((current) => ({
            filter: {
                ...current.filter,
                [name]: value,
            },
        }))
    };

    handleButtonNext = () => {
        const pager = this.state.page.pager;
        this.props.server.getHouses(pager+limit, limit, this.cleanData()).then(res=>
            this.setState(current => ({
                data: res.data,
                page: {
                    filter: false,
                    pager: pager+limit,
                }
            })))
    };
    handleButtonBack = () => {
        const pager = this.state.page.pager;
        this.props.server.getHouses(pager-limit, limit, this.cleanData()).then(res=>
            this.setState(current => ({
                data: res.data,
                page: {
                    filter: false,
                    pager: pager-limit,
                }
            })))
    };



    handleSubmit = () => {


        this.props.server.getHouses(0, limit, this.cleanData()).then(res=>
            this.setState({
                data: res.data,
                page: {
                    filter: false,
                    pager: 0,
                }
            }))
    };

    cleanData = () => {
        const filter = {
            material: '',
            area: [5,500],
            room: [1, 30],
            floor: [1, 6],
            price: [0, 100],
        };

        const {
            area,
            floor,
            price,
            material
        } = this.state.filter;

        if(price && price !== '0') {
            filter.price[0] = 2*(price-1);
            filter.price[1] = 2*price;
        } else if (price && price === '4') {
            filter.price[0] = 2*(price-1);
            filter.price[1] = 100;
        }
        if(area && area !== '0') {
            filter.area[0] = 40*(area-1);
            filter.area[1] = 40+40*(area-1);
        } else if (price && price === '4') {
            filter.area[0] = 40*(area-1);
            filter.area[1] = 500;
        }
        if(floor && floor !== '0') {
            filter.floor[0] = floor;
            filter.floor[1] = floor;
        } else if (floor && floor === '3') {
            filter.floor[0] = floor;
            filter.floor[1] = 10;
        }

        if(material && material !== '') {
            filter.material = material;
        }
        return filter;
    };


    render() {

        const houses = this.state.data;
        const houseIds = Object.keys(houses);
        const {classes} = this.props;
        const pager = this.state.page.pager;
        return (
            <React.Fragment>
              <div className='container py-5 mt-5'>
                <div className='row'>
                  <Filter filter={this.state.filter} handleChange={this.handleChange}
                          handleMaterialChange={this.handleMaterialChange} handleSubmit={this.handleSubmit}>
                    <div>
                      <img src='http://www.zsolution.in/wp-content/uploads/elementor/thumbs/int2-o3v16iq9rx2bxrw0cb4hcaa8p585npnhtbrd08rkx4.jpg'>

                      </img>
                    </div>
                  </Filter>
                  <div className='col-md-9'>
                    <div className='d-flex justify-content-between'>
                      <h2 className='text-left mb-5 text-uppercase'>
                        <span className='highlighted-text grey-text'>House</span> ПЛАН
                      </h2>
                      {/*<select style={{height: '2rem'}}>*/}
                      {/*  <option>Үнэлгээ</option>*/}
                      {/*  <option>Үнийн дүн</option>*/}
                      {/*  <option>Нэр</option>*/}
                      {/*  <option>мкв</option>*/}
                      {/*</select>*/}
                    </div>
                    <div className='row'>
                        {houseIds.map((id)=>(
                                <PlanItem key={id} house={houses[id]} id={id}/>
                            )
                        )}
                        <Grid item xs={12}>
                            <Grid  justify="flex-end" container>
                                <Grid item>
                                    <Button color="default" className={classes.buttonBack}
                                            disabled={pager === 0} onClick={this.handleButtonBack}>
                                        Өмнөх
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" className={classes.buttonNext}
                                            disabled={houseIds.length < limit} onClick={this.handleButtonNext}>
                                        Дараах
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                  </div>
                </div>
              </div>
              <Executors>

              </Executors>
              <Footer>

              </Footer>
                {console.log(houses)}
                {/* <Grid container spacing={5}>
                    <Dialog open={this.state.page.filter}
                            onClose={this.handleFilterClick}>
                        <Filter filter={this.state.filter}  handleRoomChange={this.handleRoomChange} handleAreaChange={this.handleAreaChange} handleFloorChange={this.handleFloorChange}
                                handleMaterialChange={this.handleMaterialChange} handlePriceChange={this.handlePriceChange} handleSubmit={this.handleSubmit}/>
                    </Dialog>

                    <Hidden only={['md', 'lg', 'xl']}>

                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <Grid container justify='space-between'>
                                    <Grid item>
                                        <Link
                                            component="button"
                                            variant="button"
                                            onClick={this.handleFilterClear}
                                            className={classes.filterText}
                                        >
                                            Филтер шинэчлэх
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            component="button"
                                            variant="button"
                                            onClick={this.handleFilterClick}
                                            className={classes.filterText}
                                        >
                                            <b>Филтер</b>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {houseIds.length === 0 &&<Grid container justify='center'> <CircularProgress color='secondary' /> </Grid>}


                            <Grid container spacing={3}>
                                <Hidden only={['xs','md', 'lg', 'xl']}>
                                    {houseIds.map((id)=>
                                            <House key={id} house={houses[id]} id={id} sizeXs={4}/>
                                    )}
                                </Hidden>

                                <Hidden only={['sm','md', 'lg', 'xl']}>
                                    {houseIds.map((id)=>(
                                            <House key={id} house={houses[id]} id={id} sizeXs={6}/>
                                        )
                                    )}
                                </Hidden>

                                <Grid item xs={12}>
                                    <Grid  justify="flex-end" container>
                                        <Grid item>
                                            <Button color="default" className={classes.buttonBack}
                                                    disabled={pager === 0} onClick={this.handleButtonBack}>
                                                Өмнөх
                                            </Button>

                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" className={classes.buttonNext}
                                                    onClick={this.handleButtonNext}>
                                                Дараах
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Hidden>


                    <Hidden only={['xs', 'sm']}>
                        <Grid item xs={3}>
                            <Filter filter={this.state.filter}  handleRoomChange={this.handleRoomChange} handleAreaChange={this.handleAreaChange} handleFloorChange={this.handleFloorChange}
                                    handleMaterialChange={this.handleMaterialChange} handlePriceChange={this.handlePriceChange} handleSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={9}>
                            <Grid item xs={12}>
                                <Grid container justify='space-between'>
                                    <Grid item>
                                        <Link
                                            component="button"
                                            variant="button"
                                            onClick={this.handleFilterClear}
                                            className={classes.filterText}
                                        >
                                            Филтер шинэчлэх
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            component="button"
                                            variant="button"
                                            onClick={this.handleFilterClick}
                                            className={classes.filterText}
                                        >
                                            <b>Филтер</b>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {houseIds.length === 0 &&<Grid container justify='center'> <CircularProgress color='secondary' /> </Grid>}


                            <Grid container spacing={3}>
                                {houseIds.map((id)=>(
                                        <House key={id} house={houses[id]} id={id} sizeXs={4} />
                                    )
                                )}
                                <Grid item xs={12}>
                                    <Grid  justify="flex-end" container>
                                        <Grid item>
                                            <Button color="default" className={classes.buttonBack}
                                                    disabled={pager === 0} onClick={this.handleButtonBack}>
                                                Өмнөх
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" className={classes.buttonNext}
                                                    onClick={this.handleButtonNext}>
                                                Дараах
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid> */}
              </React.Fragment>
        )
    }
}

export default compose(
    withServer,
    withStyles(styles)
)(HouseList);
