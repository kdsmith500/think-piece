import React, { Component, createContext } from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from 'firebase/firestore';

import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

class UserProvider extends Component {
  state = {
    user: null
  };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromAuth = onAuthStateChanged(auth, async userAuth => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, (snapshot) => {
          this.setState({ user: { uid: snapshot.id, ...snapshot.data()} })
        });

      }

      this.setState({ userAuth });
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return (
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    )
  }
}

export default UserProvider;