import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { VendorClass } from '../../api/interests/vendorClassifications';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';

/** Returns the Profiles and Projects associated with the passed Interest. */
function getInterestData(name) {
  const vendors = _.pluck(VendorTypes.collection.find({ vendorType: name }).fetch(), 'vendor');
  const vendorPictures = vendors.map(vendor => Vendors.collection.findOne({ email: vendor }).picture);
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({ }, { name, vendors: vendorPictures });
}

/** Component for layout out an Interest Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header style={{ marginTop: '0px' }}>{props.vendorType.name}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.vendorType.vendors, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
      {_.map(props.vendorType.projects, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  vendorType: PropTypes.object.isRequired,
};

/** Renders the Interests as a set of Cards. */
class InterestsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const vendorTypes = _.pluck(VendorClass.collection.find().fetch(), 'vendor');
    const vendorTypeData = vendorTypes.map(vendorType => getInterestData(vendorType));
    return (
      <div id='byCategory-Page' className='pages-background' style={{ paddingTop: '20px' }}>
        <Container id="interests-page">
          <Card.Group>
            {_.map(vendorTypeData, (vendorType, index) => <MakeCard key={index} vendorType={vendorType}/>)}
          </Card.Group>
        </Container>
        <div className='green-gradient' style={{ paddingTop: '100px' }}/>
        <div className='footer-background'/>
      </div>
    );
  }
}

InterestsPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(VendorClass.userPublicationName);
  const sub2 = Meteor.subscribe(Vendors.userPublicationName);
  const sub3 = Meteor.subscribe(VendorTypes.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(InterestsPage);
