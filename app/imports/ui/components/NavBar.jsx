import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Container, Image } from 'semantic-ui-react';

import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
      <Container>
        <Menu fixed="top" borderless >
          <Menu.Item position='right' id="logo" as={NavLink} activeClassName="" exact to="/" style={{ marginRight: '100px' }}>
            <Image size='tiny' src="images/grub-n-go-inverted-logo.png"/>
          </Menu.Item>

          {this.props.currentUser && !Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
            <Menu.Item position='right' as={NavLink} id='userProfileMenuItem' activeClassName="active" exact to="/userprofile"
              key='userprofile'><span>User Profile</span></Menu.Item>
          ) : ''}

          <Menu.Item position='right' as={NavLink} id="venuesMenuItem" activeClassName="active" exact to="/venues" key='venues'>
            <span>Venues</span>
          </Menu.Item>

          <Menu.Item position='right' as={NavLink} id="todaysMenuMenuItem" activeClassName="active" exact to="/todaysMenu" key='todaysMenu'>
            <span>Today&apos;s Menu</span>
          </Menu.Item>

          <Menu.Item position='right' as={NavLink} id="topPicks" activeClassName="active" exact to="/topPicks" key='topPicks'>
            <span>By Category</span>
          </Menu.Item>

          {this.props.currentUser ? (
            [<Menu.Item className='menu-item' position='right' as={NavLink} id="filterMenuItem" activeClassName="active"
              exact to="/filter" key='filter'><span>Filter</span></Menu.Item>]
          ) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'vendor') ? (
            [<Menu.Item className='add-vendor' position='right' as={NavLink} id="addvendorMenuItem" activeClassName="active"
              exact to="/addvendor" key='filter'><span>Vendor</span></Menu.Item>]
          ) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item position='right' as={NavLink} activeClassName="active" id='adminMenuItem' exact to="/admin" key='admin'>
              <span>
                Admin
              </span>
            </Menu.Item>
          ) : ''}

          <Menu.Item id='dropdown' position='left' style={{ marginLeft: '100px' }}>
            {this.props.currentUser === '' ? (
              <Dropdown id="login-dropdown" text="Login&nbsp;&nbsp;" pointing="top left" icon={'user'}>
                <Dropdown.Menu floated>
                  <Dropdown.Item id="login-dropdown-sign-in" icon="user"
                    text="Sign In" as={NavLink} exact to="/signin"/>
                  <Dropdown.Item id="login-dropdown-sign-up" icon="add user"
                    text="User Sign Up" as={NavLink} exact to="/signup"/>
                  <Dropdown.Item id="login-dropdown-sign-up-vendor" icon="add user"
                    text="Vendor Sign Up" as={NavLink} exact to="/vendorsignup"/>
                </Dropdown.Menu>
              </Dropdown>

            ) : (
              <Dropdown id="navbar-current-user"
                text={this.props.currentUser} pointing="top left" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out"
                    as={NavLink} exact to="/signout"/>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Menu.Item>
        </Menu>
      </Container>

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
