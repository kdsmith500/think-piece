import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { doc, collection, onSnapshot, query, addDoc } from 'firebase/firestore';

import Post from './Post';
import Comments from './Comments';
import { db } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import withUser from './withUser';

class PostPage extends Component {
  state = {
    post: null,
    comments:[]
  };

  get postId() {
    return this.props.match.params.id;
  };

  get postRef() {
    return doc(db, 'posts', this.postId);
  };

  get commentsRef() {
    return collection(this.postRef, 'comments');
  };

  unsubscribeFromPost = null;
  unsubscribeFromComments = null;

  createComment = (comment) => {
    const { user } = this.props;

    addDoc(this.commentsRef, {
      ...comment,
      user
    });
  };

  componentDidMount = async () => {
    this.unsubscribeFromPost = onSnapshot(this.postRef, snapshot => {
      const post = collectIdsAndDocs(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = onSnapshot(query(this.commentsRef), (querySnapshot) => {
      const comments = querySnapshot.docs.map(collectIdsAndDocs);

      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  };

  render() {
    const { post, comments } = this.state;

    return (
      <section>
        { post && <Post {...post} /> }
        <Comments
         comments={comments}
         onCreate={this.createComment}
        />
      </section>
    )
  }
}

export default withRouter(withUser(PostPage));