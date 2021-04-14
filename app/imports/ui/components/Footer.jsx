import React from 'react';
import { Menu, Header, Grid, Form, Button, Item, Container } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <div className='footer-background'>
        <footer>
          <div className="footer-background">
            <Container>
              <Grid padded container stackable columns='equal'>
                <Grid.Column>
                  <Header as="h5" inverted>Navigation</Header>

                  <Menu text vertical>
                    <Menu.Item as='a'>Profiles</Menu.Item>
                    <Menu.Item as='a'>Projects</Menu.Item>
                    <Menu.Item as='a'>Interest</Menu.Item>
                  </Menu>

                </Grid.Column>

                <Grid.Column>
                  <Header as="h5" inverted>Contact Us</Header>
                  <Form>
                    <Form.Field>
                      <input placeholder='Name'/>
                    </Form.Field>
                    <Form.Field>
                      <input placeholder='Email Address'/>
                    </Form.Field>
                    <Form.Field>
                      <input placeholder='Let us know'/>
                    </Form.Field>
                    <Button color='blue' type='Subscribe'>Email</Button>
                  </Form>
                </Grid.Column>

                <Grid.Column>
                  <Item.Group relaxed>
                    <Item>
                      <Item.Image size='small' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Hawaii_Warriors_logo.svg/1200px-Hawaii_Warriors_logo.svg.png'/>
                    </Item>
                    <Header as='h1' inverted>Grub-n-Go</Header>
                  </Item.Group>
                </Grid.Column>

                <Grid.Column>
                  <Header as="h5" inverted>Grub-n-Go Crew</Header>
                </Grid.Column>
              </Grid>

            </Container>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
