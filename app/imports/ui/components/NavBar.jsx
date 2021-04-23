import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Input, Container } from 'semantic-ui-react';

import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px' };
    return (
      <Container>
        <Menu style={menuStyle} attached="top" borderless>
          <Menu.Item position='left' as={NavLink} activeClassName="" exact to="/">
            <span className='bowfolio-red'>Grub-n-Go</span>
          </Menu.Item>

          {this.props.currentUser ? (
            <Menu.Item position='left' as={NavLink} id="userprofileMenuItem" activeClassName="active" exact to="/userprofile"
              key='userprofile'><span className='nav-bar-bowfolio-red'>User Profile</span></Menu.Item>
          ) : ''}

          <Menu.Item position='left' as={NavLink} id="venuesMenuItem" activeClassName="active" exact to="/venues" key='venues'>
            <span className='nav-bar-bowfolio-red'>Venues</span>
          </Menu.Item>

          <Menu.Item position='left' as={NavLink} id="todaysMenuItem" activeClassName="active" exact to="/todaysMenu" key='todaysMenu'>
            <span className='nav-bar-bowfolio-red'>Today&apos;s Menu</span>
          </Menu.Item>

          <Menu.Item position='left' as={NavLink} id="topPicks" activeClassName="active" exact to="/topPicks" key='topPicks'>
            <span className='nav-bar-bowfolio-red'>Top Picks</span>
          </Menu.Item>

          {this.props.currentUser ? (
            [<Menu.Item position='left' as={NavLink} id="addProjectMenuItem" activeClassName="active"
              exact to="/addProject" key='addP'><span className='nav-bar-bowfolio-red'>Add Project</span></Menu.Item>,

            <Menu.Item position='left' as={NavLink} id="filterMenuItem" activeClassName="active"
              exact to="/filter" key='filter'><span className='nav-bar-bowfolio-red'>Filter</span></Menu.Item>]
          ) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            <Menu.Item position='left' as={NavLink} id="adminMenuItem" activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}

          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/adduser" key='adduser'>Add User</Menu.Item>
          ) : ''}
          <Menu.Item fitted position='right'>

            <span>
              <Input className='nav-bar-bowfolio-red' icon='search' placeholder='Search...' />
            </span>
          </Menu.Item>

          <Menu.Item position='right'>
            {this.props.currentUser === '' ? (
              <Dropdown className='grub-n-go-orange' id="login-dropdown" text="Login" pointing="top left" icon={'user'}>
                <Dropdown.Menu floated>
                  <Dropdown.Item id="login-dropdown-sign-in" icon="user"
                    text="Sign In" as={NavLink} exact to="/signin"/>
                  <Dropdown.Item id="login-dropdown-sign-up" icon="add user"
                    text="Sign Up" as={NavLink} exact to="/signup"/>
                </Dropdown.Menu>
              </Dropdown>

            ) : (
              <Dropdown className="grub-n-go-orange" id="navbar-current-user" pointing="top left" icon={'user'}>
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
