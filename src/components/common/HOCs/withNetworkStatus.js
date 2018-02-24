import React from 'react';

const withNetworkStatus = WrappedComponent => class extends React.Component {
  constructor() {
    super();
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);

    this.state = {
      isOnline: navigator.onLine
    };
  }

  updateOnlineStatus() {
    this.setState({
      isOnline: navigator.onLine
    });
  }

  componentDidMount() {
    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online',  this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  render() {
    return (
      <WrappedComponent {...this.props} isOnline={this.state.isOnline}/>
    );
  }
};

export default withNetworkStatus;
