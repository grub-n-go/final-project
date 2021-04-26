import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Label, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { VendorClass } from '../../api/interests/vendorClassifications';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allvendorTypes) => new SimpleSchema({
  vendortypes: { type: Array, label: 'VendorTypes', optional: true },
  'vendortypes.$': { type: String, allowedValues: allvendorTypes },
});

function getVendorData(email) {
  const data = Vendors.collection.findOne({ email });
  const vendortypes = _.pluck(VendorTypes.collection.find({ vendor: email }).fetch(), 'vendortype');
  return _.extend({ }, data, { vendortypes });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header>{props.vendor.vendorName}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.vendor.campusLocation}</span>
      </Card.Meta>
      <Card.Description>
        {props.vendor.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.vendor.vendortypes,
        (vendortype, index) => <Label key={index} size='tiny' color='teal'>{vendortype}</Label>)}
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
    this.state = { vendortypes: [] };
  }

  submit(data) {
    this.setState({ vendortypes: data.vendortypes || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allvendorTypes = _.pluck(VendorClass.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allvendorTypes);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(VendorTypes.collection.find({ vendortype: { $in: this.state.vendortypes } }).fetch(), 'vendor');
    const vendorData = _.uniq(emails).map(email => getVendorData(email));
    return (
      <Container id="filter-page">
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='vendortypes' name='vendortypes' showInlineError={true} placeholder={'VendorTypes'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(vendorData, (vendor, index) => <MakeCard key={index} vendor={vendor}/>)}
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
