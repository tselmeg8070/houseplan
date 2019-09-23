import React from 'react';
import {withRouter} from "react-router-dom";
import * as ROUTES from '../../../constants/routes';
import {connect} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import {Toolbar} from "@material-ui/core";
import Tab from '@material-ui/core/Tab';
import useStyles from './styles';
import {compose} from 'recompose';
import {changeQuery, showSignInDialogue} from "../../../redux/actions/page";
import {applySetAuthUser} from "../../../redux/actions/session";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

const Navigation = (props) => {

  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleOnClick(link) {
    props.history.push(link);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (<Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }} id={mobileMenuId} keepMounted="keepMounted" transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>

    <MenuItem>
      <Tab onClick={() => handleOnClick(ROUTES.LANDING)} className={classes.menuButton} label='Нүүр'/>
    </MenuItem>
    <MenuItem>
      <Tab onClick={() => handleOnClick(ROUTES.PLANS)} className={classes.menuButton} label='План зураг'/>
    </MenuItem>
    <MenuItem>
      <Tab onClick={() => handleOnClick(ROUTES.COMPANIES)} className={classes.menuButton} label='Гүйцэтгэгч'/>

    </MenuItem>
    <MenuItem>
      <Tab onClick={() => handleOnClick(ROUTES.POSTS)} className={classes.menuButton} label='Нийтлэл'/>
    </MenuItem>
    <MenuItem>
      <Tab onClick={() => handleOnClick(ROUTES.MATERIALS)} className={classes.menuButton} label='Материал'/>
    </MenuItem>

  </Menu>);

  return (
    <div>
      <AppBar position="sticky" color={'primary'}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap="noWrap">
            <img src={process.env.PUBLIC_URL + '/logo.png'} className={classes.logo}/>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Tab onClick={() => handleOnClick(ROUTES.LANDING)} className={classes.menuButton} label={'Нүүр'}/>
            <Tab onClick={() => handleOnClick(ROUTES.PLANS)} className={classes.menuButton} label='План зураг'/>
            <Tab onClick={() => handleOnClick(ROUTES.COMPANIES)} className={classes.menuButton} label='Гүйцэтгэгч'/>
            <Tab onClick={() => handleOnClick(ROUTES.POSTS)} className={classes.menuButton} label='Нийтлэл'/>
            <Tab onClick={() => handleOnClick(ROUTES.MATERIALS)} className={classes.menuButton} label='Материал'/> {
              props.authUser === null
                ? <Tab onClick={() => props.onShowSighIn()} className={classes.menuButton} label='Нэвтрэх'/>
                : <Tab onClick={() => props.handleSignOut()} className={classes.menuButton} label='Гарах'/>
            }

          </div>
          <div className={classes.sectionDesktop}>
            {/* {props.authUser === null || props.authUser === undefined */
            } {/* ? <Button className={classes.signInButton} onClick={props.onShowSighIn}>{MENUS.SIGN_IN}</Button> */
            } {/* :  <SignOutButton>{MENUS.SIGN_OUT}</SignOutButton>} */
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label="Show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreIcon/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
)
};

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
// withFirebase,
connect(mapStateToProps, mapDispatchToProps), withRouter)(Navigation)
