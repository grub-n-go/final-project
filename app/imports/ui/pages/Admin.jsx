import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import UserCard from '../components/UserCard';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import VendorCard from '../components/VendorCard';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
  const projectPictures = projects.map(project => Projects.collection.findOne({ name: project }).picture);
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({ }, data, { interests, projects: projectPictures });
}

function getVendorData(email) {
  const data = Vendors.collection.findOne({ email });
  const vendorType = _.pluck(VendorTypes.collection.find({ profile: email }).fetch(), 'vendorType');
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({ }, data, { vendorType });
}

/** Renders the Profile Collection as a set of Cards. */
class Admin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const userEmails = _.pluck(Profiles.collection.find().fetch(), 'email');
    const profileData = userEmails.map(userEmail => getProfileData(userEmail));
    const vendorEmails = _.pluck(Vendors.collection.find().fetch(), 'email');
    const vendorData = vendorEmails.map(vendorEmail => getVendorData(vendorEmail));
    return (
      <div id='admin-page' style={{ paddingTop: '20px' }}>
        <Header as="h2" textAlign="center">List Of Users</Header>
        <Container id="profiles-page">
          <Card.Group centered>
            {_.map(profileData, (userCard, index) => <UserCard key={index} userCard={userCard}/>)}
          </Card.Group>
        </Container>
        <Header as="h2" textAlign="center">List Of Vendors</Header>
        <Container id="profiles-page">
          <Card.Group centered>
            {_.map(vendorData, (vendorCard, index) => <VendorCard key={index} vendorCard={vendorCard}/>)}
          </Card.Group>
        </Container>
        <div className='green-gradient' style={{ paddingTop: '100px' }}/>
        <div className='footer-background'/>
      </div>
    );
  }
}

Admin.propTypes = {
  userCard: PropTypes.array.isRequired,
  vendorCard: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub4 = Meteor.subscribe(Projects.userPublicationName);
  const sub5 = Meteor.subscribe(VendorTypes.userPublicationName);
  const sub6 = Meteor.subscribe(Vendors.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
  };
})(Admin);
