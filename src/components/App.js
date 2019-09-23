import React from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import {withAuthentication} from '../Session/index';
import {compose} from 'recompose';
import * as ROUTES from '../constants/routes';
import CreateMaterial from './Admin/Materials/Create/';
import EditMaterial from './Admin/Materials/Update';
import EditCompany from './Admin/Companies/Update';
import EditHouse from './Admin/Houses/Update';
import CreateHouse from './Admin/Houses/Create/';
import HousesPage from './Client/HousesPage'
import CreateCompany from "./Admin/Companies/Create";
import HousePage from './Client/HousePage'
import MaterialsPage from "./Client/MaterialsPage";
import MaterialPage from "./Client/MaterialPage";
import CompaniesPage from './Client/CompaniesPage';
import CompanyPage from './Client/CompanyPage';
import ActivityHouse from './Admin/Houses/Activity';
import CreatePost from './Admin/Posts/Create';
import EditPost from './Admin/Posts/Update';
import PostsPage from './Client/PostsPage';
import PostPage from './Client/PostPage';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LandingPage from './Client/LandingPage';
import SignDialogue from './Client/SignDialogue';
import {withServer} from "../Server";
import AdminRequests from './Admin/Requests';
import PostsSearch from './Client/PostsSearchPage';

import MainNavigation from './Client/Navigation/navigation-v2.js';

class App extends React.Component {



    render() {
      const theme = createMuiTheme({
          palette: {
              primary: {
                  main: '#000',
              },
              secondary: {
                  main: '#CE574E',
              },

          }
      });

    return (

        <Router>
            <ThemeProvider theme={theme}>
            <MainNavigation/>
                <Route exact path={ROUTES.LANDING} component={LandingPage}/>
                <Route exact path={ROUTES.ADMIN_CREATE_PLAN} component={CreateHouse}/>
                <Route exact path={ROUTES.ADMIN_ACTIVITY_PLAN+':id'} render={(props) => (
                    <ActivityHouse key={props.match.params.id} {...props} />)
                }/>
                <Route exact path={ROUTES.ADMIN_EDIT_PLAN+':id'} render={(props) => (
                    <EditHouse key={props.match.params.id} {...props} />)
                }/>

                <Route exact path={ROUTES.ADMIN_CREATE_COMPANY} component={CreateCompany}/>
                <Route exact path={ROUTES.ADMIN_EDIT_COMPANY+':id'} render={(props) => (
                    <EditCompany key={props.match.params.id} {...props} />)
                }/>

                <Route exact path={ROUTES.ADMIN_CREATE_MATERIAL} component={CreateMaterial}/>
                <Route exact path={ROUTES.ADMIN_EDIT_MATERIAL+':id'} render={(props) => (
                    <EditMaterial key={props.match.params.id} {...props} />)
                }/>

                <Route exact path={ROUTES.ADMIN_CREATE_POST} component={CreatePost}/>
                <Route exact path={ROUTES.ADMIN_EDIT_POST+':id'} render={(props) => (
                    <EditPost key={props.match.params.id} {...props} />)
                }/>

                <Route exact path={ROUTES.MATERIALS} component={MaterialsPage}/>
                <Route exact path={ROUTES.MATERIAL+':id'} render={(props) => (
                    <MaterialPage key={props.match.params.id} {...props} />)
                }/>
                <Route exact path={ROUTES.PLANS} component={HousesPage}/>
                <Route exact path={ROUTES.PLAN+':id'} render={(props) => (
                    <HousePage key={props.match.params.id} {...props} />)
                }/>
                <Route exact path={ROUTES.COMPANY+':id'} render={(props) => (
                  <CompanyPage key={props.match.params.id} {...props} />)
                }/>
                <Route exact path={ROUTES.COMPANIES} component={CompaniesPage}/>

                <Route exact path={ROUTES.POSTS} component={PostsPage}/>
                <Route exact path={ROUTES.POST+':id'} render={(props) => (
                    <PostPage key={props.match.params.id} {...props} />)
                }/>
                <Route exact path={ROUTES.ADMIN_REQUESTS} component={AdminRequests}/>
                <Route exact path={ROUTES.POSTS_SEARCH} component={PostsSearch}/>
                <SignDialogue/>
            </ThemeProvider>

        </Router>
    );
  }
}

export default  compose(
    withServer,
    withAuthentication,
)(App);
