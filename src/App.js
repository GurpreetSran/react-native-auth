import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends React.Component {

  state = { loggedIn: null };

  componentDidMount() {
      firebase.initializeApp({
      apiKey: 'AIzaSyDtMop_m9fNvAVebA9WfexeQBUyvtUiTtA',
      authDomain: 'auth-fcc00.firebaseapp.com',
      databaseURL: 'https://auth-fcc00.firebaseio.com',
      storageBucket: 'auth-fcc00.appspot.com',
      messagingSenderId: '191271392052'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
          return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
