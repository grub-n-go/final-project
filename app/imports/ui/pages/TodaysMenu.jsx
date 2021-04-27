import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';

// /** Gets the Project data as well as Profiles and Interests associated with the passed Project name. */
// function getProjectData(name) {
//   const data = Projects.collection.findOne({ name });
//   const interests = _.pluck(ProjectsInterests.collection.find({ project: name }).fetch(), 'interest');
//   const profiles = _.pluck(ProfilesProjects.collection.find({ project: name }).fetch(), 'profile');
//   const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
//   return _.extend({ }, data, { interests, participants: profilePictures });
// }

/** Information regarding todays picks*/
function getBreakfastData (){
  const mealName = 'Breakfast';
  const mealType = 'Chinese';
  const mealPicture = 'images/orangechicken.jpg';
  const vendors = _.pluck(VendorTypes.collection.find({vendorType: mealType}).fetch(),'vendor');
  const vendorsPictures = vendors.map(vendor => Vendors.collection.findOne({email: vendor}).picture);
  return {mealName, mealType, mealPicture, vendorsPictures};
}
function getLunchData (){
  const mealName = 'Lunch';
  const mealType = 'Chinese';
  const mealPicture = 'images/orangechicken.jpg';
  const vendors = _.pluck(VendorTypes.collection.find({vendorType: mealType}).fetch(),'vendor');
  const vendorsPictures = vendors.map(vendor => Vendors.collection.findOne({email: vendor}).picture);
  return {mealName, mealType, mealPicture, vendorsPictures};
}
function getDinnerData (){
  const mealName = 'Dinner';
  const mealType = 'Chinese';
  const mealPicture = 'images/orangechicken.jpg';
  const vendors = _.pluck(VendorTypes.collection.find({vendorType: mealType}).fetch(),'vendor');
  const vendorsPictures = vendors.map(vendor => Vendors.collection.findOne({email: vendor}).picture);
  return {mealName, mealType, mealPicture, vendorsPictures};
}

/** Component for layout out a meal Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header textAlign='center' style={{ marginTop: '0px' }}>{props.mealInfo.mealName}</Card.Header>
    <Container textAlign='center'>{props.mealInfo.mealType} </Container>
    </Card.Content>
    <Card.Content>
      <Image circular size='large' src={props.mealInfo.mealPicture}/>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.mealInfo.vendorsPictures, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);
//{_.map(props.mealInfo.vendorsPictures, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
MakeCard.propTypes = {
  mealInfo: PropTypes.object.isRequired,
};

/** Renders Today's Menu as a set of Cards. */
class TodaysMenuPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const breakfastInfo = getBreakfastData();
    const lunchInfo = getLunchData();
    const dinnerInfo = getDinnerData();
    return (
      <div className='welcome-background' style={{ paddingTop: '20px' }}>
        <Container id="projects-page">
          <Card.Group>
            <MakeCard mealInfo={breakfastInfo}/>
            <MakeCard mealInfo={lunchInfo}/>
            <MakeCard mealInfo={dinnerInfo}/>
          </Card.Group>
        </Container>
        <div className='green-gradient' style={{ paddingTop: '100px' }}/>
        <div className='footer-background'/>
      </div>
    );
  }
}

TodaysMenuPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub2 = Meteor.subscribe(Projects.userPublicationName);
  const sub3 = Meteor.subscribe(ProjectsInterests.userPublicationName);
  const sub4 = Meteor.subscribe(Profiles.userPublicationName);
  const sub5 = Meteor.subscribe(Vendors.userPublicationName);
  const sub6 = Meteor.subscribe(VendorTypes.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
  };
})(TodaysMenuPage);
