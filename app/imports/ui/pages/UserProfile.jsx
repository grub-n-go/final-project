import React from 'react';
import { Grid, Header, Loader, Container, Image, Item, Label, Icon } from 'semantic-ui-react';
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
    const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
    const profile = Profiles.collection.findOne({ email });

    return (
      <div className='pages-background' id='userprofile-page' style={{ paddingTop: '50px' }}>
        <Container className='containers' >
          <Header id='welcome2' as="h2" style={{ textAlign: 'center' }}>{profile.firstName}&nbsp;{profile.lastName}</Header>
          <Grid id="UserProfile-page" container centered>

            <Grid.Row>
              <Grid.Column width={5}>
                <Image size='massive' src={profile.picture}/>
              </Grid.Column>
              <Grid.Column width={10}>

                <Item.Group relaxed>

                  <Item>
                    <Item.Header as='h5'>Email:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.email}</Item.Content>
                  </Item>

                  <Item>
                    <Item.Header as='h5'>Title:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.title}</Item.Content>
                  </Item>

                  <Item>
                    <Item.Header as='h5'>Bio:</Item.Header>
                    <Item.Content verticalAlign='middle'>&nbsp;{profile.bio}</Item.Content>
                  </Item>

                  <Item>
                    <Item.Header as='h5'>Food Preferences:</Item.Header>
                    <Item.Content verticalAlign='middle'>{_.map(interests,
                      (interest, index) => <Label style={{ margin: '5px' }} key={index} size='large' color='teal'>{interest}</Label>)}</Item.Content>
                  </Item>

                </Item.Group>
              </Grid.Column>

              <Grid.Column width={1}>
                <Label attached='bottom right'>
                  <Icon name='setting' />
                  <Link as={NavLink} id="editUser-Button" activeClassName="active" exact to="/edituser" key='home'>Edit</Link>
                </Label>
              </Grid.Column>

            </Grid.Row>

          </Grid>
        </Container>

        <div className='green-gradient'>
          <Container style={{ paddingTop: '200px' }}>
          </Container>
        </div>

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
