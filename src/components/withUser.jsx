import React from 'react';
import { UserContext } from '../providers/UserProvider';

// add displayName as component name, or name, or just component
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const withUser = Component => {
  const WrappedComponent = props => {
    return (
      <UserContext.Consumer>
        {user => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  }

  WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})` // this will return the withUser component with the name WithUser{displayName} in the tree
  return WrappedComponent;
}

export default withUser;