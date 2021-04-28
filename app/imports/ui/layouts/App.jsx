import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Venues from '../pages/Venues';
import AddProject from '../pages/AddProject';
import TodaysMenu from '../pages/TodaysMenu';
import Filter from '../pages/Filter';
import TodaysPicks from '../pages/TodaysPicks';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import UserProfile from '../pages/UserProfile';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';
import Admin from '../pages/Admin';
import AddVendor from '../pages/AddVendor';
import VendorSignup from '../pages/VendorSignup';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <div>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <ProtectedRoute path="/edituser" component={EditUser}/>
              <ProtectedRoute path="/userprofile" component={UserProfile}/>
              <ProtectedRoute path="/adduser" component={AddUser}/>
              <Route path="/venues" component={Venues}/>
              <Route path="/todaysMenu" component={TodaysMenu}/>
              <Route path="/topPicks" component={TodaysPicks}/>
              <ProtectedRoute path="/addproject" component={AddProject}/>
              <ProtectedRoute path="/filter" component={Filter}/>
              <ProtectedRoute path="/addvendor" component={AddVendor}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/vendorsignup" component={VendorSignup}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <AdminProtectedRoute path="/admin" component={Admin}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
