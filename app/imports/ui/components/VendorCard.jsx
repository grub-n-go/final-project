import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';

/** Renders a single row in the List Vendors. See pages/Admin.jsx. */
class VendorCard extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.vendorCard.picture} />
          <Card.Header>{this.props.vendorCard.vendorName}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.vendorCard.campusLocation}</span>
            <span className='date'>{this.props.vendorCard.vendorHours}</span>
            <span className='date'>{this.props.vendorCard.email}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.vendorCard.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {_.map(this.props.vendorCard.vendorTypes,
            (vendorType, index) => <Label key={index} size='tiny' color='teal'>{vendorType}</Label>)}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
VendorCard.propTypes = {
  vendorCard: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(VendorCard);
