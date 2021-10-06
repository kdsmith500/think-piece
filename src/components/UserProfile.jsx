import React, { Component } from 'react';

import { doc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../firebase';

class UserProfile extends Component {
  state = {
    displayName: ''
  };
  
  imageInput = null;

  get uid() { //es6 computer property
    return auth.currentUser.uid;
  }

  get userRef() {
    return doc(db, 'users', this.uid);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { displayName } = this.state;

    if (displayName) {
      updateDoc(this.userRef, { displayName });
    }
  }

  render() {
    const { displayName } = this.state;
    return (
      <section className="UserProfile">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            placeholder="Display Name" />
          <input type="file" ref={ref => this.imageInput = ref} />
          <input className="update" type="submit" />
        </form>
      </section>
    )
  }
}

export default UserProfile;