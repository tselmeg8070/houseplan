import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import {changeQuery, showSignInDialogue} from "../../../redux/actions/page";
import {applySetAuthUser} from "../../../redux/actions/session";
import {compose} from "recompose";



class MainNavigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scrolled: true
    };
  }

  componentDidMount(){
    window.addEventListener('scroll', this.scrollHandler)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollHandler)
  }

  scrollHandler = () => {
    if(window.scrollY > 0){
      this.setState({
        scrolled: true
      })
    }
    else {
      this.setState({
        scrolled: true
      })
    }
  }

  render() {

    return (
      <header className={this.state.scrolled ? 'header scrolled' : 'header'}>
        <div className='container nav-container'>
          <div className='logo-container'>
            <img src={process.env.PUBLIC_URL + '/logo.png'}></img>
          </div>
          <div className='nav-links'>
            <Button className='nav-link-button' onClick={() => this.props.history.push('/')}>
              <span>
                Нүүр
              </span>
            </Button>
            <Button className='nav-link-button' onClick={() => this.props.history.push('/plans')}>
              <span>
                Планууд
              </span>
            </Button>
            <Button className='nav-link-button' onClick={() => this.props.history.push('/companies')}>
              <span>
                Гүйцэтгэл
              </span>
            </Button>
            <Button className='nav-link-button' onClick={() => this.props.history.push('/posts')}>
              <span>
                Нийтлэлүүд
              </span>
            </Button>
            <Button className='nav-link-button' onClick={() => this.props.history.push('/materials')}>
              <span>
                Материал
              </span>
            </Button>
            {this.props.authUser === null
              ? <Button className='nav-link-button' onClick={() => this.props.onShowSighIn()}>
                  <span>
                    Нэвтрэх
                  </span>
                </Button>

            : <Button className='nav-link-button' onClick={() => this.props.handleSignOut()}>
                <span>
                  Гарах
                </span>
              </Button>}

          </div>
        </div>
      </header>
    )
  }
}
const mapStateToProps = (state) => ({authUser: state.sessionState.authUser});

const mapDispatchToProps = (dispatch) => ({
  onShowSighIn: () => {
    dispatch(showSignInDialogue());
  },
  handleSignOut: () => {
    localStorage.removeItem('authUser');
    dispatch(applySetAuthUser(null))
  }
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps), withRouter)(MainNavigation)
