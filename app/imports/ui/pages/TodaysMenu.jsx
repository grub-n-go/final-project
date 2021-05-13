import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Grid, Segment, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Vendors } from '../../api/vendor/Vendors';
import { VendorTypes } from '../../api/vendor/VendorTypes';
import { VendorMenus } from '../../api/vendor/VendorMenus';

/** Component for layout out a menu item row. */
// eslint-disable-next-line no-unused-vars
const MakeMenuRow = (props) => (
  <Grid.Row centered>
    <Grid.Column>{props.menu.menuItem}</Grid.Column>
    <Grid.Column>{props.menu.menuItemDescription}</Grid.Column>
  </Grid.Row>
);
MakeMenuRow.propTypes = {
  menu: PropTypes.object.isRequired,
};

/** Component for layout out a menu Card. */
// eslint-disable-next-line no-unused-vars
const MakeCard = (props) => (
  <Grid.Row>
    <Card fluid>
      <Segment>
        <Grid>
          <Grid.Column width={4}>
            <Card.Content>
              <Grid.Row><Header as='h3' textAlign='center'>{props.menuInfo.vendorName}</Header></Grid.Row>
              <Grid.Row>
                <Image circular size='large'
                  src={props.menuInfo.vendorPicture}/>
              </Grid.Row>
            </Card.Content>
          </Grid.Column>
          <Grid.Column width={9}>
            <Card.Content>
              <Grid columns='equal' relaxed>
                <Grid.Row><Header as='h3'>{props.menuInfo.menuTitle}</Header></Grid.Row>
                {_.map(props.menuInfo.menu, (item, index) => <MakeMenuRow key={index}
                  menu={props.menuInfo.menu[index]}/>)}
              </Grid>
            </Card.Content>
          </Grid.Column>
        </Grid>

      </Segment>
    </Card>
  </Grid.Row>
);
MakeCard.propTypes = {
  menuInfo: PropTypes.object.isRequired,
};

/** Renders Today's Menu as a set of Cards. */
class TodaysMenuPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const vendorMenus = _.map(VendorMenus.collection.find().fetch(), (vendorMenu) => ({ vendorName: vendorMenu.vendorName,
      vendorPicture: vendorMenu.vendorPicture,
      menuTitle: vendorMenu.menuTitle,
      menu: vendorMenu.menu,
    }));
    return (
      <div className='pages-background' id='todaysMenu-page' style={{ paddingTop: '20px' }}>
        <Container id="projects-page" textAlign='centered'>
          <Grid columns='equal'>
            {_.map(vendorMenus, (menuInfo, index) => <MakeCard key={index} menuInfo={menuInfo}/>)}
          </Grid>
        </Container>
        <div className='green-gradient' style={{ paddingTop: '100px' }}/>
        <div className='footer-background'/>
      </div>
    );
  }
}

TodaysMenuPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Vendors.userPublicationName);
  const sub2 = Meteor.subscribe(VendorTypes.userPublicationName);
  const sub3 = Meteor.subscribe(VendorMenus.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(TodaysMenuPage);
