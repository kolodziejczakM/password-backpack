import React from 'react';
import withNetworkStatus from '../HOCs/withNetworkStatus';
import './NetworkStatusBar.css';

const baseClassName = 'network-status-bar';

const themes = {
  online: `${baseClassName} ${baseClassName}--online`,
  offline: `${baseClassName} ${baseClassName}--offline`
};

const staticTexts = new Map([
  ['label.online_status', 'Your internet status:'],
  ['status.online', 'Online'],
  ['status.offline', 'Offline']
]);

const NetworkStatusBar = props => {

  const getThemeClassName = () => {
    if (props.isOnline) {
      return `${themes.online}`
    }

    return `${themes.offline}`;
  };
  
  const getNetworkStatusName = () => {
    if(props.isOnline) {
      return staticTexts.get('status.online');
    }
    
    return staticTexts.get('status.offline');
  };

  return <aside className={getThemeClassName()}>{staticTexts.get('label.online_status')} {getNetworkStatusName()}</aside>
};

export default withNetworkStatus(NetworkStatusBar);
