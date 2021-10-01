import React, { Component } from 'react';

import { postsQ } from '../firebase';
import { onSnapshot } from 'firebase/firestore';

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null

  componentDidMount = async () => {
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
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
