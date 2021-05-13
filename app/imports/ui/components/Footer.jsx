import React from 'react';
import { Header, Grid, Container, Image, Divider } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="footer-background">
          <Container textAlign='center'>
            <Header id='footer-header' as='h3'>Made By:</Header>
            <Grid textAlign='center' padded container columns='equal'>
              <Grid.Row>
                <Grid.Column width={4}>
                  <p id='crew'>The<Image spaced size='small' src="images/grub-n-go-inverted-logo.png"/>Crew</p>
                </Grid.Column>

                <Grid.Column width={1}>
                  <Divider id='footer-header' vertical inverted>Members</Divider>
                </Grid.Column>
                <Grid.Column textAlign='center' id='footer-header' style={{ paddingTop: '50px' }}>
                  <p>Ryan Vizcarra</p>
                  <p>Kristine Rivera</p>
                  <p>Karl Penuliar</p>
                  <p>Michael Pierce</p>

                </Grid.Column>
                <Grid.Column>
                  <Divider width={1} id='footer-header'vertical inverted>Collab</Divider>
                </Grid.Column>
                <Grid.Column id='footer-header'>
                  <Image centered size='small'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Hawaii_Warriors_logo.svg/1200px-Hawaii_Warriors_logo.svg.png'/>
                  <Header id='footer-header' as='h4'>Special Thanks to</Header>
                  <p>Professor: Philip Johnson </p>
                  <p>Teacher Assistant: Branden Ogata</p>
                </Grid.Column>
              </Grid.Row>

            </Grid>

          </Container>
        </div>
      </footer>

    );
  }
}

export default Footer;
