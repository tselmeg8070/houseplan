import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './executors.css';
import * as COMPANY from '../../../constants/company'
import {withServer} from "../../../Server";
import * as ROUTES from "../../../constants/routes";
import {Link} from "react-router-dom";

const limit = 8;
class Executors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      activity: 99,
      pager: 0
    };
  }

  componentDidMount() {
    this.props.server.getCompanies(0, limit, null).then(res=>this.setState({
      data: res.data,
      pager: limit
    }))
  }

  handleClick = (index) => {
    if(index === 99) index = null;
    this.props.server.getCompanies(0, limit, index).then(res=>{
      if(index === null) index = 99;
      this.setState({
        data: res.data,
        activity: index,
        pager: limit
      })
    }
  )
  };

  handleClickMore = () => {
    let category = this.state.activity;
    if(this.state.activity === 99) category = null;
    this.props.server.getCompanies(this.state.pager, limit, category).then(res => {
      if(category === null) category = 99;
      this.setState(current => {
        return ({
          data: Object.assign(current.data, res.data),
          activity: category,
          pager: current.pager + limit
        })
      })
    })
  };

  render() {
    const companies = this.state.data;
    return (
      <div className='container-fluid darkened-bg py-5'>
        {console.log(this.state.data)}
        <h1 className='text-center mb-5 text-uppercase'>
          <span className='highlighted-text grey-text'>House</span> Гүйцэтгэгчид
        </h1>

        <div className='container'>
          <div className='button-list'>
            <Button onClick={() => this.handleClick(99)} className={this.state.activity === 99 ? 'nav-link-button active': 'nav-link-button'}>
                  <span>
                    Бүгд
                  </span>
            </Button>
            {COMPANY.activities.slice(0,7).map(activity =>
                <Button onClick={() => this.handleClick(activity.id)} className={this.state.activity === activity.id ? 'nav-link-button active': 'nav-link-button'}>
                  <span>
                    {activity.text}
                  </span>
                </Button>
            )}
          </div>
          <div className='button-list'>
            {COMPANY.activities.slice(7,16).map(activity =>
                <Button onClick={() => this.handleClick(activity.id)} className={this.state.activity === activity.id ? 'nav-link-button active': 'nav-link-button'}>
                  <span>
                    {activity.text}
                  </span>
                </Button>
            )}
          </div>
          <div className='row mt-5'>
            {Object.keys(companies).map(key =>
                <div className='col-md-3 m-2'>
                  <Link to={ROUTES.COMPANY + key} className={{textDecoration: 'none'}}>
                  <div className='executor-container'>
                    <img src={companies[key].logo}>
                    </img>
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
          <Button onClick={this.handleClickMore} className='btn btn-block'>Цааш үзэх</Button>
        </div>
      </div>
    )
  }
}

export default withServer(Executors)
