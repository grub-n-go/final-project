import React from 'react';
import { Grid, Header, Loader, Container, Image, Item, Label, Icon, Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';

/** Gets the Project data as well as Profiles and Interests associated with the passed Project name. */
function getProjectData(name) {
  const data = Projects.collection.findOne({ name });
  const interests = _.pluck(ProjectsInterests.collection.find({ project: name }).fetch(), 'interest');
  const profiles = _.pluck(ProfilesProjects.collection.find({ project: name }).fetch(), 'profile');
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  return _.extend({ }, data, { interests, participants: profilePictures });
}

/** Component for layout out a Project Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='left' avatar src={props.project.picture}/>
      <Card.Header style={{ marginTop: '0px' }}>{props.project.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.project.title}</span>
      </Card.Meta>
      <Card.Description>
        {props.project.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.project.interests, (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      {_.map(props.project.participants, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  project: PropTypes.object.isRequired,
};

/** Renders the UserProfile Page: what appears after the user logs in. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const email = Meteor.user().username;
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
    const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
    const profile = Profiles.collection.findOne({ email });
    const projectData = projects.map(project => getProjectData(project));
    return (
      <div>
        <Container className='landing-white-background'>
          <Grid id="UserProfile-page" container centered>
            <Grid.Column width={12}>
              <Header as="h2">{profile.firstName} {profile.lastName}</Header>
            </Grid.Column>

            <Grid.Row>
              <Grid.Column width={3}>
                <Image src={profile.picture}/>
              </Grid.Column>
              <Grid.Column width={9}>

                <Item.Group relaxed>
                  <Item>
                    <Item.Header as='h5'>Title:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.title}</Item.Content>
                  </Item>

                  <Item>
                    <Item.Header as='h5'>Bio:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.bio}</Item.Content>
                  </Item>

                  <Item>
                    <Item.Header as='h5'>Preferences:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{interests}</Item.Content>
                  </Item>

                </Item.Group>
              </Grid.Column>

              <Grid.Column width={12}>
                <Label attached='bottom right'>
                  <Icon name='setting' />
                  <Link as={NavLink} id="homeMenuItem" activeClassName="active" exact to="/home" key='home'>Edit Profile</Link>
                </Label>
              </Grid.Column>

            </Grid.Row>

          </Grid>
        </Container>

        <Container centered className='landing-white-background'>
          <Header as="h2" textAlign='center'>Favorites</Header>
          <Card.Group centered>
            {_.map(projectData, (project, index) => <MakeCard key={index} project={project}/>)}
          </Card.Group>
        </Container>

      </div>
    );
  }
}

UserProfile.propTypes = {
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
})(UserProfile);
