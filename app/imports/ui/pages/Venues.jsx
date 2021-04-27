import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Vendors } from '../../api/vendor/Vendors';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
function getVendorData(email) {
  const data = Vendors.collection.findOne({ email });
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({ }, data);
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image src={props.vendor.picture} />
      <Card.Header>{props.vendor.vendorName}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.vendor.campusLocation}</span>
      </Card.Meta>
      <Card.Description>
        {props.vendor.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {props.vendor.vendorHours}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  vendor: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class Venues extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(Vendors.collection.find().fetch(), 'email');
    const vendorData = emails.map(email => getVendorData(email));
    return (
      <div className='welcome-background' style={{ paddingTop: '20px' }}>
        <Container id="venues-page">
          <Card.Group>
            {_.map(vendorData, (vendor, index) => <MakeCard key={index} vendor={vendor}/>)}
          </Card.Group>
        </Container>
        <div className='green-gradient' style={{ paddingTop: '100px' }}/>
        <div className='footer-background'/>
      </div>
    );
  }
}

Venues.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Vendors.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(Venues);
