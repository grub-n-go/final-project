import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Dropdown } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profiles/Profiles';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange= (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the AddUser page. */
  submit= () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Profiles.collection.insert({ email }, (err2) => {
          if (err2) {
            this.setState({ error: err2.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/adduser' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    const campusStatus = [
      {
        key: 'student',
        text: 'Student',
        value: 'Student',
      },
      {
        key: 'vendor',
        text: 'Vendor',
        value: 'Vendor',
      },
      {
        key: 'admin',
        text: 'Admin',
        value: 'Student',
      },
    ];

    return (
      <div className='welcome-background'>
        <div>
          <Container id="signup-page" style={{ paddingTop: '10px' }}>
            <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
              <Grid.Column>
                <Header as="h2" textAlign="center">
                Sign up for a new account
                </Header>
                <Form onSubmit={this.submit}>
                  <Segment stacked>
                    <Form.Input
                      label="Email"
                      id="signup-form-email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                    />
                    <Form.Input
                      label="Password"
                      id="signup-form-password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                    />
                    <Dropdown placeholder='You are a..' selection style={{ marginBottom: '10px' }}
                      options={campusStatus}/>
                    <Form.Button id="signup-form-submit" content="Submit"/>
                  </Segment>
                </Form>
                <Message>
                Already have an account? Login <Link to="/signin">here</Link>
                </Message>
                {this.state.error === '' ? (
                  ''
                ) : (
                  <Message
                    error
                    header="Registration was not successful"
                    content={this.state.error}
                  />
                )}
              </Grid.Column>
            </Grid>
          </Container>
          <div className='green-gradient'>
            <Container style={{ paddingTop: '200px' }}>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
