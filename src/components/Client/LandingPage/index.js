import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {INITIAL_STATE} from "./initialState";
import {Link, withRouter} from 'react-router-dom';
import {withServer} from "../../../Server";
import {compose} from "recompose";
import * as ROUTES from '../../../constants/routes'

import Filter from '../../shared/Filter';
import PlanItem from '../../shared/PlanItem'
import AdSection from '../../shared/AdSection';
import Executors from '../../shared/Executors';
import PostList from '../../shared/PostList';
import Footer from '../../shared/Footer';

const width = window.innerWidth
const height = window.innerHeight

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }


    componentDidMount() {
        this.props.server.getHouses(0,9, {
            material: '',
            area: [5,500],
            room: [1, 30],
            floor: [1, 6],
            price: [0, 100],
        }).then(res=> this.setState({
            houses: res.data
        }));
    }

    handleChange = (e) => {
        this.props.history.push(ROUTES.PLANS)
    };
    handleSubmit = () => {
        this.props.history.push(ROUTES.PLANS)
    };
    handleSearch = () => {
        this.props.history.push({
            pathname: ROUTES.POSTS_SEARCH,
            state: {
                query: this.state.query
            }
        })
    };
    handleSearchQuery = (e) => {
        this.setState({
            query: e.target.value
        })
    };
    render() {
        const houses = this.state.houses;
        return (
          <React.Fragment>
            <div className='container-fluid p-0'>
                  <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                          <div className="carousel-item active">
                              <Link to={'post/5d654f005e72abceef0aed73'}>
                              <img className="d-block w-100" src="https://static.dezeen.com/uploads/2017/08/clifton-house-project-architecture_dezeen_hero-1.jpg" alt="First slide"/>
                              </Link>
                          </div>
                      </div>
                  </div>
            </div>
            <div className='container-fluid py-20 px-0 darkened-bg'>
              <div className='container'>
                <div className='row py-5'>
                  <div className='col-md-6 d-flex justify-content-around text-center grey-text'>
                    <div>
                      <h5 className='m-0'>ПЛАН</h5>
                      <h2>1075</h2>
                    </div>
                    <div>
                      <h5 className='m-0'>Гүйцэтгэгч</h5>
                      <h2>75</h2>
                    </div>
                    <div>
                      <h5 className='m-0'>Шууд утас</h5>
                      <h2>7711-7711</h2>
                    </div>
                  </div>
                  <div className='col-md-6 d-flex align-items-center'>
                    <input className='col' value={this.state.query} onChange={this.handleSearchQuery} placeholder='ХАЙХ ЗҮЙЛЭЭ БИЧНЭ ҮҮ'/>
                    <button className='primary-button button-xl' onClick={this.handleSearch}>
                      Хайлт хийх
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='container py-5'>
              <h1 className='text-center mb-5'>
                <span className='highlighted-text grey-text'>House</span> ПЛАН
              </h1>

              <div className='row'>
                  <Filter filter={{material: '',
                      area: 0,
                      room: 0,
                      floor: 0,
                      price: 0,}} handleChange={this.handleChange}
                          handleMaterialChange={this.handleMaterialChange} handleSubmit={this.handleSubmit}>
                  </Filter>
                <div className='col-md-9'>
                  <div className='row'>
                      {Object.keys(houses).map((id)=>(
                              <PlanItem key={id} house={houses[id]} id={id}/>
                          )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <AdSection>

            </AdSection>
            <Executors>

            </Executors>

            <PostList>

            </PostList>

            <Footer>

            </Footer>
          </React.Fragment>
        );
    }
}

export default compose(withServer, withRouter)(LandingPage)