import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Image, Label, Header, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Interests } from '../../api/interests/Interests';
import { VendorClass } from '../../api/interests/vendorClassifications';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Vendors } from '../../api/vendor/Vendors';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  vendorTypes: { type: Array, label: 'Interests', optional: true },
  'vendorTypes.$': { type: String, allowedValues: allInterests },
});

function getProfileData(email) {
  const data = Vendors.collection.findOne({ email });
  const interests = _.pluck(VendorTypes.collection.find({ vendor: email }).fetch(), 'vendorType');
  const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
  const projectPictures = projects.map(project => Projects.collection.findOne({ name: project }).picture);
  return _.extend({ }, data, { interests, projects: projectPictures });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.vendor.picture} />
      <Card.Header>{props.vendor.vendorName} {props.vendor.vendorHours}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.vendor.campusLocation}</span>
      </Card.Meta>
      <Card.Description>
        {props.vendor.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.vendor.vendorTypes,
        (vendorType, index) => <Label key={index} size='tiny' color='teal'>{vendorType}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Projects</Header>
      {_.map(props.profile.projects, (project, index) => <Image key={index} size='mini' src={project}/>)}
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
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(VendorTypes.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub4 = Meteor.subscribe(Projects.userPublicationName);
  const sub5 = Meteor.subscribe(VendorClass.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(Filter);
