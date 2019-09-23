import React from 'react';
import Container from '@material-ui/core/Container';
import {INITIAL_STATE} from "./initialState";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {withServer} from "../../../Server";
import BlockViewer from '../HelperComponents/BlockViewer'
import * as HOUSE from '../../../constants/house'
import {
    Typography,
    Grid,
    Divider,
    Paper,
    TextField,
    Button,
    CircularProgress
} from "@material-ui/core";
import {
    AcUnit,
    Hotel,
    Layers,
    Straighten,
    Home,
} from "@material-ui/icons";
import {withStyles} from "@material-ui/styles";
import {compose} from 'recompose';
import {connect} from "react-redux";

import AdminButton from "../HelperComponents/AdminButton";
import Footer from "../../shared/Footer";
import './house-page.css';
import Offers from './Offers'
import Filter from "../../shared/Filter";

const styles = {
    buyPaper: {
        padding: '20px',
    },
    continueButton: {
      background: '#161616',
      marginBottom: '10px',
      color: 'white',
      '&:hover': {
        backgroundColor: '#131313'
      }
    },
    payButton: {
        marginTop: '10px',
        backgroundColor: '#ff6600',
        backgroundImage: 'linear-gradient(302deg, #ff6600 46%, #f93702 100%)',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#e55b00',
          backgroundImage: 'linear-gradient(302deg, #e55b00 46%, #f93702 100%)'
        }
    },
    buyButtonHelp: {
        color: '#757575',
        textAlign: 'center',
        margin: 'auto'
    },
    offers: {
        marginTop: '15px',
        padding: '20px',
    },
    offerButton: {
        marginTop: '10px',
    },
    mainInfoContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    darkBackgroundSection: {
      textAlign: 'center',
      padding: '5px 15px',
      backgroundColor: '#161616',
      borderRadius: '5px',
      color: '#fff'
    },
    imageGalleryContainer: {
      position: 'relative'
    },
    planItemRibbon: {
      top: '5%',
      position: 'absolute',
      backgroundColor: '#F22613',
      color: '#f3f3f3',
      padding: '5px 10px'
    }
};

class HousePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }
    componentDidMount() {
        this.props.server.getHouseRaw(this.props.match.params.id).then(res=> {
            this.setState({house: res.data});
            console.log(this.state.house);
            const images = [];
            this.state.house.images.map(image=>{
                images.push({
                    original: image,
                    thumbnail: image
                })
            });
            this.setState({
                images
            });

        });
    }
    onClickRequest = () => {
        if(this.state.request.name !== ''
            && this.state.request.email !== ''
            && this.state.request.phone !== '') {
            this.setState({requestLoad: true});
            const data = this.state.request;
            data.id = this.props.match.params.id;
            data.code = this.state.house.code;
            this.props.server.createRequest(data).then(data =>
                this.setState({
                    request: {
                        name: '',
                        phone: '',
                        email: ''
                    },
                    requestLoad: false
                })
            );
        }

    };

    onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState(current => {
            return {
            request: {
                ...current.request,
                [name]: value
            }
        }})
    };

    render() {
        const classes = this.props.classes;
        const house = this.state.house;
        return (
            <div>
            <Container maxWidth={'md'} className='container py-5 mt-5'>
              <div className={classes.imageGalleryContainer}>
                <ImageGallery items={this.state.images} thumbnailPosition={'right'}  showPlayButton={false}/>
                <div className={classes.planItemRibbon}>
                  <h6 className='m-0'>
                    План #{house.code}
                  </h6>
                </div>
              </div>
                <br/>
               <Grid container spacing={2}>
                   <Grid item xs={8}>
                     <div className={classes.mainInfoContainer}>
                       <Typography variant={'h4'}>
                         План #{house.code}
                       </Typography>
                       <div>
                         <div style={{fontSize: '14px'}}>
                           Материалын төсөв
                         </div>
                         <div className={classes.darkBackgroundSection}>
                           {parseInt(house.materialsSum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₮
                         </div>
                       </div>
                       <div>
                         <div style={{fontSize: '14px'}}>
                           Ажлын зургийн үнэ
                         </div>
                         <div className={classes.darkBackgroundSection}>
                           {parseInt(house.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₮
                         </div>
                       </div>
                     </div>
                       <br/>
                       <Typography variant={'h5'}>
                           Түлхүүр үзүүлэлт
                       </Typography>
                       <Divider/>
                       <br/>
                       <div className='row justify-content-around text-center m-0'>
                         <div className='col-md-2'>
                           <Straighten fontSize="large"/>
                           <Typography>Талбай</Typography>
                         </div>
                         <div className='col-md-2'>
                           <Hotel fontSize="large"/>
                           <Typography>Өрөө</Typography>
                         </div>
                         <div className='col-md-2'>
                           <Layers fontSize="large"/>
                           <Typography>Давхар</Typography>
                         </div>
                         <div className='col-md-2'>
                           <AcUnit fontSize="large"/>
                           <Typography>Улирал</Typography>
                         </div>
                         <div className='col-md-2'>
                           <Home fontSize="large"/>
                           <Typography>Материал</Typography>
                         </div>
                       </div>
                       <div className={`row justify-content-around m-0 ${classes.darkBackgroundSection}`} style={{padding: '5px 0'}}>
                         <div className='col-md-2'>
                           <Typography  ><b>{house.area} мкв</b></Typography>
                         </div>
                         <div className='col-md-2'>
                           <Typography style={{minWidth: '56px'}}><b>{house.rooms}</b></Typography>
                         </div>
                         <div className='col-md-2'>
                           <Typography style={{minWidth: '56px'}}><b>{house.floors}</b></Typography>
                         </div>
                         <div className='col-md-2'>
                           <Typography style={{minWidth: '56px'}}><b>Зуны</b></Typography>
                         </div>
                         <div className='col-md-2'>
                           <Typography style={{minWidth: '56px'}}><b>{HOUSE.builtWith[house.builtWith].text}</b></Typography>
                         </div>
                       </div>
                       <BlockViewer blocks={house.blocks}/>
                       <br/>

                   </Grid>
                   <Grid item xs={4} alignContent={'center'}>
                       <AdminButton name={'plan'} id={this.props.match.params.id}/>
                        <Paper className={classes.buyPaper}>
                            <Typography variant={'h5'}><b>Худалдаж авах</b></Typography>
                            <TextField
                                label="Нэр"
                                margin="dense"
                                variant="outlined"
                                name={'name'}
                                onChange={this.onChange}
                                value={this.state.request.name}
                                fullWidth
                            />
                            <TextField
                                label="Цахим хаяг"
                                margin="dense"
                                variant="outlined"
                                name={'email'}
                                onChange={this.onChange}

                                value={this.state.request.email}
                                fullWidth
                            />
                            <TextField
                                label="Утасны дугаар"
                                margin="dense"
                                variant="outlined"
                                name={'phone'}
                                onChange={this.onChange}
                                value={this.state.request.phone}
                                fullWidth
                            />
                            <br/>
                            <Button variant={'contained'} fullWidth margin={'dense'} disabled={this.state.requestLoad} className={classes.continueButton} onClick={this.onClickRequest}>
                                {this.state.requestLoad
                                    ? <CircularProgress/>
                                    : <b>Үргэжлүүлэх</b>
                                }
                            </Button>
                            <Divider></Divider>
                            <Button variant={'contained'} fullWidth margin={'dense'} className={classes.payButton}><b>LendMN төлөх</b></Button>
                            <div className={classes.buyButtonHelp}>
                                <Typography variant={'caption'} className={classes.buyButtonHelp}>ХУДАЛДАЖ АВАХ ЗААВАР</Typography>
                            </div>
                        </Paper>
                       <br/>
                       <br/>

                       <div>
                           <img src='http://www.zsolution.in/wp-content/uploads/elementor/thumbs/int2-o3v16iq9rx2bxrw0cb4hcaa8p585npnhtbrd08rkx4.jpg'>

                           </img>
                       </div>
                   </Grid>
               </Grid>
            </Container>
                {house.offers !== undefined && <Offers offers={house.offers}/>}

                <Footer>

                </Footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    companies: state.companyState.companies
});

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
    withServer
)(HousePage);
