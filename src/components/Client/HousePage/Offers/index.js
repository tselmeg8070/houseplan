import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './offers.css';
import * as COMPANY from '../../../../constants/company'
import {withServer} from "../../../../Server";
import * as ROUTES from "../../../../constants/routes";
import {Link} from "react-router-dom";
import {numberWithCommas} from "../../../../utils/HelperFunctions";

const limit = 8;
class Executors extends Component {

  constructor(props) {
    super(props);
    const data = {};
    Object.keys(this.props.offers).map(key => {
      Object.keys(this.props.offers[key]).map(offerKey => {
        data[offerKey] = {...this.props.offers[key][offerKey]}
      });
    });
    this.state = {
      data: data,
      activity: 99,
      pager: 0
    };
  }


  handleClick = (index) => {
      let data = {};
      if (this.props.offers[index] !== undefined)
        data = this.props.offers[index];
      if (index === 99)
        Object.keys(this.props.offers).map(key => {
          Object.keys(this.props.offers[key]).map(offerKey => {
            data[offerKey] = {...this.props.offers[key][offerKey]}
          });
        });
      this.setState({
        data: data,
        activity: index,
        pager: limit
      })
  };



  render() {
    const companies = this.state.data;
    const offers = this.props.offers;
    return (
      <div className='container-fluid darkened-bg py-5'>
        {console.log(this.state.data)}
        <h1 className='text-center mb-5 text-uppercase'>
          <span className='highlighted-text grey-text'>үнийн</span> санал
        </h1>

        <div className='container'>
          <div className='button-list'>
            <Button onClick={() => this.handleClick(99)} className={this.state.activity === 99 ? 'nav-link-button active': 'nav-link-button'}>
                  <span>
                    Бүгд
                  </span>
            </Button>
            {Object.keys(offers).slice(0,7).map(activity =>
                <Button onClick={() => this.handleClick(COMPANY.activities[activity].id)} className={this.state.activity === parseInt(activity) ? 'nav-link-button active': 'nav-link-button'}>
                  <span>
                    {COMPANY.activities[activity].text}
                  </span>
                </Button>
            )}
          </div>
          <div className='button-list'>
            {Object.keys(offers).slice(7,16).map(activity =>
                <Button onClick={() => this.handleClick(COMPANY.activities[activity].id)} className={this.state.activity === parseInt(activity) ? 'nav-link-button active': 'nav-link-button'}>
                  <span>
                    {COMPANY.activities[activity].text}
                  </span>
                </Button>
            )}
          </div>
          <div className='row mt-5'>
            {Object.keys(companies).sort((a,b)=>companies[b].membership - companies[a].membership).map(key =>
                <div className='col-md-4'>
                  <Link to={ROUTES.COMPANY + companies[key].id} style={{textDecoration: 'none'}}>
                      <div className='row offer-container bg-white'>
                          <div className='col-md-6 p-0'>
                              <img src={companies[key].logo}>
                              </img>
                          </div>
                          <div className='col-md-6 p-2 text-center'>
                              <h6 ><b style={{color: '#212529'}}> {companies[key].name}</b></h6>
                              <p className='text-secondary small'>{companies[key].description}</p>
                              <h5 className='text-secondary small'><b >Үнийн санал: <br/> {numberWithCommas(companies[key].price)}₮</b></h5>
                          </div>
                          <div className={'executor-member-ribbon ' + COMPANY.memberships[companies[key].membership].class}>
                              <p>
                                  {COMPANY.memberships[companies[key].membership].text}
                              </p>
                          </div>
                      </div>

                  </Link>
                </div>
            )}

          </div>
        </div>
      </div>
    )
  }
}

export default withServer(Executors)
