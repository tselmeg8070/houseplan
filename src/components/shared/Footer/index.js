import React, { Component } from 'react'
import './footer.css';

import location from '../../../assets/images/location.svg';
import phone from '../../../assets/images/phone.svg';
import mail from '../../../assets/images/mail.svg';
import facebook from '../../../assets/images/facebook.svg';

class Footer extends Component {

  constructor(props){
    super(props);
  }


  render(){
    return(
      <div className='footer-container'>
        <div className='container footer-main'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='footer-detail-item'>
                <div className='footer-detail-item-icon'>
                  <img src={location}></img>
                </div>
                <div className='footer-detail-item-info'>
                  <h5>
                    Хаяг, байршил
                  </h5>
                  <p>
                    labore malis tempor fugiat sunt
                  </p>
                </div>

              </div>
            </div>
            <div className='col-md-3'>
              <div className='footer-detail-item'>
                <div className='footer-detail-item-icon'>
                  <img src={phone}></img>
                </div>
                <div className='footer-detail-item-info'>
                  <h5>
                    Холбоо барих
                  </h5>
                  <p>
                    9911-9911
                  </p>
                  <p>
                    7711-7711
                  </p>
                </div>

              </div>
            </div>
            <div className='col-md-3'>
              <div className='footer-detail-item'>
                <div className='footer-detail-item-icon'>
                  <img src={mail}></img>
                </div>
                <div className='footer-detail-item-info'>
                  <h5>
                    И-мэйл бичих
                  </h5>
                  <p>
                    info@houseplan.mn
                  </p>
                  <p>
                    marketing@houseplan.mn
                  </p>
                </div>

              </div>
            </div>
            <div className='col-md-3'>
              <div className='footer-detail-item'>
                <div className='footer-detail-item-icon'>
                  <img src={facebook}></img>
                </div>
                <div className='footer-detail-item-info'>
                  <h5>
                    FACEBOOK хаяг
                  </h5>
                  <p>
                    fb.com/houseplan.mn
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className='footer-end py-2'>
          <p className='text-center font-weight-normal m-0'>
            &copy;Houseplan.mn 2018
          </p>
        </div>
      </div>
    )
  }
}

export default Footer
