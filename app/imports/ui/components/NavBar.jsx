import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Input } from 'semantic-ui-react';

import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px' };
    return (
      <div className='landing-green-background'>
        <Menu style={menuStyle} attached="top" borderless fluid widths={6} >
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <span className='bowfolio-green' style={{ fontWeight: 800, fontSize: '48px' }}>Grub-n-Go</span>
          </Menu.Item>
          {this.props.currentUser ? (
            <Menu.Item as={NavLink} id="homeMenuItem" activeClassName="active" exact to="/home" key='home'>Home</Menu.Item>
          ) : ''}
          {/* eslint-disable-next-line max-len */}
          <Menu.Item as={NavLink} id="venuesMenuItem" activeClassName="active" exact to="/venues" key='venues'>
            <span className='nav-bar-bowfolio-green' style={{ fontWeight: 800, fontSize: '24px' }}>Venues</span></Menu.Item>
          <Menu.Item as={NavLink} id="todaysMenuItem" activeClassName="active" exact to="/todaysMenu" key='todaysMenu'>
            <span className='nav-bar-bowfolio-green' style={{ fontWeight: 800, fontSize: '24px' }}>Todays Menu</span></Menu.Item>
          <Menu.Item as={NavLink} id="topPicks" activeClassName="active" exact to="/topPicks" key='topPicks'>
            <span className='nav-bar-bowfolio-green' style={{ fontWeight: 800, fontSize: '24px' }}>Top Picks</span></Menu.Item>
          <Menu.Item>
            <span className='nav-bar-bowfolio-green' style={{ fontWeight: 1000, fontSize: '14px' }}>
              <Input icon='search' placeholder='Search...' />
            </span>
          </Menu.Item>
          {this.props.currentUser ? (
            [<Menu.Item as={NavLink} id="addProjectMenuItem" activeClassName="active" exact to="/addProject" key='addP'>User Profile</Menu.Item>,
              <Menu.Item as={NavLink} id="filterMenuItem" activeClassName="active" exact to="/filter" key='filter'>Filter</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item as={NavLink} id="adminMenuItem" activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item>
            {this.props.currentUser === '' ? (
              <span className='grub-n-go-orange' style={{ fontWeight: 800, fontSize: '20px' }}>
                <Dropdown id="login-dropdown" text="Login" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown></span>
            ) : (
              <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter so that links work. */
export default withRouter(NavBarContainer);
