import React, { Component } from 'react'
import './plan-item.css'
import * as HOUSE from "../../../constants/house";
import * as ROUTES from "../../../constants/routes";

import {withRouter} from  'react-router-dom'


class PlanItem extends Component {
  constructor(props){
    super(props);

  }

  handleclick = () => {
    this.props.history.push(ROUTES.PLAN + this.props.id);
  };

  render(){
    const {house} = this.props;
    const key = this.props.id;
    const {code, images, area, rooms, floors, builtWith, price} = house;
    return(
      <div className='col-lg-4 col-md-6 col-sm-12 mb-3' onClick={this.handleclick}>
        {console.log(house)}
        <div className='plan-item-container '>
          <div className='image-container'>
            <img src={images}>

          </img>
          <div className='plan-item-id-container'>
            <h6 className='m-0'>
              План #{code}
            </h6>
          </div>
        </div>
        <div className='detail-container'>
          <div className='row'>
            <div className='col-md-6'>
              <p>Өрөөний тоо:</p>
            </div>
            <div className='col-md-6'>
              <p className='font-weight-bold'>
                {rooms}
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <p>Талбай:</p>
            </div>
            <div className='col-md-6'>
              <p className='font-weight-bold'> {area} мкв</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <p>Хийцлэл:</p>
            </div>
            <div className='col-md-6'>
              <p className='font-weight-bold'>{HOUSE.builtWith[builtWith].text}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <p>Давхар:</p>
            </div>
            <div className='col-md-6'>
              <p className='font-weight-bold'>{floors}</p>
            </div>
          </div>
        </div>
        <div className='title-container'>
          <h6 className='text-center'>
            House plan design
          </h6>
        </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PlanItem);
