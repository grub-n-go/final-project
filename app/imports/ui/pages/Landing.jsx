import React from 'react';
import { Grid, Container, Header, Item, Segment } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className='welcome-background' id='landing-page'>
        <div>

          <Container textAlign='center' style={{ paddingTop: '200px' }}>
            <Header id='aloha'>Aloha!</Header>
          </Container>

        </div>
        <div className='white-containers'>
          <Segment>
            <Container textAlign='center' style={{ marginTop: '50px' }}>
              <Header as='h1'>
            Grub-n-Go is your one stop site for all things food around the university of Hawaii at Manoa Campus</Header>
            </Container>

            <Container textAlign='center'>
              <Header as='h2' style={{ paddingTop: '25px' }}>
              &quot;Takeout so convenient you can take it anywhere!&quot;</Header>
              <Header as='h2' style={{ fontStyle: 'italic' }}> - Foo Magazine</Header>
            </Container>
          </Segment>
          <Container style={{ marginTop: '50px' }}>
            <Header id='accent-header' as='h1' textAlign='center'>Today&apos;s Special</Header>
            <Grid container stackable columns='equal' textAlign='center'>
              <Grid.Column>
                <Item.Image size='medium'
                  src="https://thesurfingpighawaii.com/wp-content/uploads/2018/04/449d5a_57f413dec56944eabdb7b35c6497df23mv2_d_3669_3669_s_4_2.jpg"/>
              </Grid.Column>
              <Grid.Column>

                <Item.Image size='medium' src="/images/bana.png"/>

              </Grid.Column>
            </Grid>
          </Container>
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
