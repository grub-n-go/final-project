import React from 'react';
import { Grid, Segment, Header, Form, Loader, Container } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { VendorClass } from '../../api/interests/vendorClassifications';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import { updateVendorMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allvendorTypes) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  vendorName: { type: String, label: 'Vendor Name', optional: true },
  campusLocation: { type: String, label: 'Campus Location', optional: true },
  vendorHours: { type: String, label: 'Vendor Hours', optional: true },
  description: { type: String, label: 'Description Of Vendor', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  vendortypes: { type: Array, label: 'Vendor Types', optional: true },
  'vendortypes.$': { type: String, allowedValues: allvendorTypes },
});

/** Renders the EditUSer Page: what appears after the user logs in. */
class EditVendor extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateVendorMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Vendor updated successfully', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const allvendorTypes = _.pluck(VendorClass.collection.find().fetch(), 'vendortype');
    const formSchema = makeSchema(allvendorTypes);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const vendortypes = _.pluck(VendorTypes.collection.find({ profile: email }).fetch(), 'vendortype');
    const vendor = Vendors.collection.findOne({ email });
    const model = _.extend({}, vendor, { vendortypes });
    return (
      <div className='pages-background' style={{ paddingTop: '20px' }}>
        <Header as="h2" textAlign="center" inverted style={{ fontSize: '100px' }}>Edit Your Vendor Profile</Header>
        <Grid id="EditUSer-page" container centered>
          <Grid.Column>
            <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField id='vendorName' name='vendorName' showInlineError={true} placeholder={'Vendor Name'}/>
                  <TextField id='campusLocation' name='campusLocation' showInlineError={true} placeholder={'Campus Location'}/>
                  <TextField id='vendorHours' name='vendorHours' showInlineError={true} placeholder={'Vendor Hours'}/>
                  <TextField name='email' showInlineError={true} placeholder={'email'} disabled/>
                </Form.Group>
                <LongTextField id='description' name='description' placeholder='Write a little bit about your food.'/>
                <Form.Group widths={'equal'}>
                  <TextField name='title' showInlineError={true} placeholder={'Title'}/>
                  <TextField name='picture' showInlineError={true} placeholder={'URL to picture'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='vendorTypes' showInlineError={true} placeholder={'VendorTypes'}/>
                </Form.Group>
                <SubmitField id='EditUSer-page-submit' value='Update'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>

        <div className='green-gradient'>
          <Container style={{ paddingTop: '200px' }}>
          </Container>
        </div>

      </div>
    );
  }
}

EditVendor.propTypes = {
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
})(EditVendor);
