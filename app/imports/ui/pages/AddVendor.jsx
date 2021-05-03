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
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import { updateVendorMethod } from '../../startup/both/Methods';
import { VendorClass } from '../../api/interests/vendorClassifications';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allTypes) => new SimpleSchema({
  email: { type: String, label: 'Business Email', optional: false },
  vendorName: { type: String, label: 'Vendor Name', optional: false },
  campusLocation: { type: String, label: 'Campus Location', optional: false },
  vendorHours: { type: String, label: 'Hours', optional: false },
  description: { type: String, label: 'Description Statement', optional: false },
  picture: { type: String, label: 'Picture URL', optional: false },
  vendorType: { type: Array, label: 'Types Of Food Served', optional: false },
  'vendorType.$': { type: String, allowedValues: allTypes },
});

/** Renders the AddUser Page: what appears after the user logs in. */
class AddVendor extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { vendorName, campusLocation, vendorHours, description, picture, vendorType } = data;
    const email = Meteor.user().username;
    Vendors.collection.insert({ email, vendorName, campusLocation, vendorHours, description, picture, vendorType },
      Meteor.call(updateVendorMethod, data, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile added successfully', 'success');
          formRef.reset();
        }
      }));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const allTypes = _.pluck(VendorClass.collection.find().fetch(), 'vendor');
    const formSchema = makeSchema(allTypes);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const vendorTypes = _.pluck(VendorTypes.collection.find({ vendor: email }).fetch(), 'vendorType');
    const vendor = Vendors.collection.findOne({ email });
    const model = _.extend({}, vendor, { vendorTypes });
    return (
      <div className='pages-background' id='add-vendor-page' style={{ paddingTop: '20px' }}>
        <Grid className='containers' id="AddVendor-page" container centered>
          <Grid.Column>
            <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
              <Header as="h1" textAlign="center">Welcome to Grub-n-Go</Header>
              <Header as="h2" textAlign="center" style={{ padding: '20px' }}>
                  Please Enter The Details To Your Food Venue
              </Header>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='email' id='email' showInlineError={true} placeholder={'Where can you be reached'}/>
                  <TextField id='vendorName' name='vendorName' showInlineError={true} placeholder={'The Name Of Your Venue'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <TextField id='campusLocation' name='campusLocation' showInlineError={true} placeholder={'Where On Campus Is It Located?'}/>
                  <TextField id='vendorHours' name='vendorHours' showInlineError={true} placeholder={'Hours Of Operation Of Your Business'}/>
                </Form.Group>
                <LongTextField id='description' name='description' placeholder='Write a little bit about your venue.'/>
                <TextField name='picture' id='picture' showInlineError={true} placeholder={'URL to picture'}/>
                <Form.Group widths={'equal'}>
                  <MultiSelectField id='vendorType' name='vendorType'
                    showInlineError={true} placeholder={'i.e. Chinese, Korean, Indian'}/>
                </Form.Group>
                <SubmitField id='AddVendor-page-submit' value='Submit'/>
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

AddVendor.propTypes = {
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
})(AddVendor);
