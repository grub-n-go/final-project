import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Image, Label, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { VendorClass } from '../../api/interests/vendorClassifications';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import { Vendors } from '../../api/vendor/Vendors';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  vendorTypes: { type: Array, label: 'Interests', optional: true },
  'vendorTypes.$': { type: String, allowedValues: allInterests },
});

function getProfileData(email) {
  const data = Vendors.collection.findOne({ email });
  const interests = _.pluck(VendorTypes.collection.find({ vendor: email }).fetch(), 'vendorType');
  return _.extend({ }, data, { interests });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.vendor.picture} />
      <Card.Header>{props.vendor.vendorName}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.vendor.campusLocation}</span>
      </Card.Meta>
      <Card.Meta>
        <span className='date'>{props.vendor.vendorHours}</span>
      </Card.Meta>
      <Card.Description>
        {props.vendor.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.vendor.vendorTypes,
        (vendorType, index) => <Label key={index} size='tiny' color='teal'>{vendorType}</Label>)}
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  vendor: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = { vendorTypes: [] };
  }

  submit(data) {
    this.setState({ vendorTypes: data.vendorTypes || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allInterests = _.pluck(VendorClass.collection.find().fetch(), 'vendor');
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(VendorTypes.collection.find({ vendorType: { $in: this.state.vendorTypes } }).fetch(), 'vendor');
    const profileData = _.uniq(emails).map(email => getProfileData(email));
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='vendorTypes' name='vendorTypes' showInlineError={true} placeholder={'Interests'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(profileData, (vendor, index) => <MakeCard key={index} vendor={vendor}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Filter.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Vendors.userPublicationName);
  const sub2 = Meteor.subscribe(VendorTypes.userPublicationName);
  const sub3 = Meteor.subscribe(VendorClass.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(Filter);
