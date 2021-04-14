import React from 'react';
import { Grid, Container, Header, Item } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='welcome-background'>
        <div>
          <Container textAlign='center' style={{ paddingTop: '300px' }}>
            <Header as='h1' inverted style={{ fontSize: '250px' }}>ALOHA!</Header>
          </Container>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h1' textAlign='center'>TODAY&apos;S SPECIAL</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Item.Image size='medium'
                src="https://thesurfingpighawaii.com/wp-content/uploads/2018/04/449d5a_57f413dec56944eabdb7b35c6497df23mv2_d_3669_3669_s_4_2.jpg"/>
            </Grid.Column>
            <Grid.Column>

              <Item.Image size='medium' src="/images/bana.png"/>

            </Grid.Column>
          </Grid>
        </div>

        <div className='green-gradient'>
          <Container style={{ paddingTop: '200px' }}>
          </Container>
        </div>

      </div>

    );
  }
}

export default Landing;
