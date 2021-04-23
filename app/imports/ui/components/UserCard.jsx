import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserCard extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.userCard.picture} />
            <Card.Header>{this.props.userCard.firstName} {this.props.userCard.lastName}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.props.userCard.title}</span>
            </Card.Meta>
            <Card.Description>
              {this.props.userCard.bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {_.map(this.props.userCard.interests,
                (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
          </Card.Content>
          <Card.Content extra>
            <Link as={NavLink} id="EditUserMenuItem" activeClassName="active" exact to={`/edituser/${this.props.userCard.email}`} key='home'>Edit User</Link>
          </Card.Content>
        </Card>
    );
  }
}

// Require a document to be passed to this component.
UserCard.propTypes = {
  userCard: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserCard);
