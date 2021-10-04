import React, { Component, createContext } from 'react';

import { postsQ } from '../firebase';
import { onSnapshot } from 'firebase/firestore';
import { collectIdsAndDocs } from '../utilities';

export const PostsContext = createContext();

class PostsProvider extends Component {
  state = {
    posts: [],
  };

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = onSnapshot(postsQ, (querySnapshot) => {
      const posts = querySnapshot.docs.map(collectIdsAndDocs);

      this.setState({ posts });
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  }

  render() {
    const { posts } = this.state;
    const { children } = this.props;

    return (
      <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
    )
  }
}

export default PostsProvider;