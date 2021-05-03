import React from 'react';
import { Grid, Container, Header, Item, Card } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class AboutUs extends React.Component {
  render() {
    return (
      <div className='pages-background'>
        <div>
          <Container textAlign='center' style={{ paddingTop: '200px' }}>
            <Header as='h1' inverted style={{ fontSize: '250px' }}>ALOHA!</Header>
            <Container text style={{ paddingBottom: '100px' }}>
              <Card.Group centered>
                <Card fluid className='grub-n-go-orange'>
                  <Header as='h3' style={{ fontSize: '20px', color: '#ff0000' }}>
                      Grub-n-Go is your one stop site for all things food around the university of Hawaii at Manoa Campus</Header>
                </Card>
              </Card.Group>
            </Container>
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

export default AboutUs;
