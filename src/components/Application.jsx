import React, { Component } from 'react';

import { postsQ, db } from '../firebase';
import { getDoc, getDocs, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';
import { firestore } from 'firebase-admin';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null
  
  handleCreate = async post => {
    // const { posts } = this.state;

    // const docRef = await firestore.collection('posts'); // v8 firebase

    await addDoc(postsQ, post); // firebase add will create a new document and return a reference to it
    // const docRef = await addDoc(postsQ, post); // firebase add will create a new document and return a reference to it
    // const doc = await getDoc(docRef);

    // const newPost = collectIdsAndDocs(doc);

    // this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async id => {
    // const allPosts = this.state.posts;

    // await firestore.doc(`posts/$id}`).delete(); // v8 firebase

    await deleteDoc(doc(db, 'posts', id));

    // const posts = allPosts.filter(post => post.id !== id);

    // this.setState({ posts });
  }

  componentDidMount = async () => {
    // this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => { // firebase v8
    //   const posts = snapshot.docs.map(collectIdsAndDocs);
    //   this.setState({posts});
    // })

    this.unsubscribe = onSnapshot(postsQ, (querySnapshot) => {
      const posts = querySnapshot.docs.map(collectIdsAndDocs);

      this.setState({ posts });
    })
  }

  componentWillUnmount = () => {
    this.unsubscribe();
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts 
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
