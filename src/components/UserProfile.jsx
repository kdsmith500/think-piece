import React, { Component } from 'react';

import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { auth, db, storage } from '../firebase';

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

  get file() {
    return this.imageInput && this.imageInput.files[0];
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

    if (this.file) {
      // storage // v8 firebase
      //   .ref()
      //   .child('user-profiles')
      //   .child(this.uid)
      //   .child(this.file.name)
      //   .put(this.file)
      //   .then(res => res.ref.getDownloadURL())
      //   .then(photoURL => this.userRef.update({ photoURL }));

      const storageRef = ref(storage, `user-profiles/${this.uid}/${this.file.name}`);

      uploadBytes(storageRef, this.file)
        .then(res => getDownloadURL(res.ref))
        .then(photoURL => updateDoc(this.userRef, { photoURL }));
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