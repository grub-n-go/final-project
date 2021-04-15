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
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests, allProjects) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  bio: { type: String, label: 'Biographical statement', optional: true },
  title: { type: String, label: 'Title', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
  projects: { type: Array, label: 'Projects', optional: true },
  'projects.$': { type: String, allowedValues: allProjects },
});

/** Renders the AddUser Page: what appears after the user logs in. */
class AddUser extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { email, firstName, lastName, bio, title, picture, interests } = data;
    Profiles.collection.insert({ email, firstName, lastName, bio, title, picture, interests },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile added successfully', 'success');
          formRef.reset();
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
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const allProjects = _.pluck(Projects.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests, allProjects);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the user information.
    const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
    const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
    const profile = Profiles.collection.findOne({ email });
    const model = _.extend({}, profile, { interests, projects });
    return (
      <div className='welcome-background' style={{ paddingTop: '20px' }}>
        <Header as="h2" textAlign="center" inverted style={{ fontSize: '100px' }}>Welcome to Grub-n-Go</Header>
        <Grid id="AddUser-page" container centered className='landing-white-background'>
          <Grid.Column>
            <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
              <Header as="h2" textAlign="center" style={{ padding: '20px' }}>
                Please enter your details to sign up and be part of our great community
              </Header>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField id='firstName' name='firstName' showInlineError={true} placeholder={'First Name'}/>
                  <TextField id='lastName' name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                  <TextField name='email' showInlineError={true} placeholder={'email'}/>
                </Form.Group>
                <LongTextField id='bio' name='bio' placeholder='Write a little bit about yourself.'/>
                <Form.Group widths={'equal'}>
                  <TextField name='title' showInlineError={true} placeholder={'Title'}/>
                  <TextField name='picture' showInlineError={true} placeholder={'URL to picture'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
                  <MultiSelectField name='projects' showInlineError={true} placeholder={'Projects'}/>
                </Form.Group>
                <SubmitField id='AddUser-page-submit' value='Update'/>
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

AddUser.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Interests.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub5 = Meteor.subscribe(Projects.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(AddUser);
