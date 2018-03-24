import React from 'react';
import PropTypes from 'prop-types';
import withNetworkStatus from '../HOCs/withNetworkStatus';
import './NetworkStatusBar.css';

const baseClassName = 'network-status-bar';

const themes = {
  online: `${baseClassName} ${baseClassName}--online`,
  offline: `${baseClassName} ${baseClassName}--offline`,
};

const staticTexts = new Map([
  ['status.online', 'Online'],
  ['status.offline', 'Offline'],
]);

const NetworkStatusBar = (props) => {
  const getThemeClassName = () => {
    if (props.isOnline) {
      return `${themes.online}`;
    }
    return `${themes.offline}`;
  };

  const getNetworkStatusName = () => {
    if (props.isOnline) {
      return staticTexts.get('status.online');
    }
    return staticTexts.get('status.offline');
  };

  return <aside className={getThemeClassName()}>{getNetworkStatusName()}</aside>;
};

NetworkStatusBar.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default withNetworkStatus(NetworkStatusBar);
