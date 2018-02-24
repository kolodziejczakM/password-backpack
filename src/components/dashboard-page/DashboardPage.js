import React from 'react';
import { withRouter } from 'react-router-dom';
import './DashboardPage.css';
import Tile from '../common/tile/Tile';
import NetworkStatusBar from '../common/network-status-bar/NetworkStatusBar';
import Plus from '../../icons/plus.svg';
import Key from '../../icons/key.svg';
import swal from 'sweetalert';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const { dialog } = electron.remote;

class DashboardPage extends React.Component {
  constructor() {
    super();

    // TODO: remove after leverage HoC -> choose fn for composing HoC
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
    this.navigateToCreatorIfOffline = this.navigateToCreatorIfOffline.bind(this);
    this.showOpenFileDialogIfOffline = this.showOpenFileDialogIfOffline.bind(this);
    this.parseJsonFile = this.parseJsonFile.bind(this);

    this.staticTexts = new Map([
      ['alt.create_new', 'Click to create new password file'],
      ['desc.create_new', 'Create new password file'],
      ['alt.decrypt', 'Click to decrypt existing file'],
      ['desc.decrypt', 'Decrypt existing file'],
      ['alert.text.empty_file', 'Chosen file is empty. You have to choose password file.'],
      ['alert.text.user_online', 'You have to be offline to continue.']
    ]);

    // TODO: remove after leverage HoC -> choose fn for composing HoC
    this.state = {
      online: navigator.onLine
    };
  }

  // TODO: remove after leverage HoC -> choose fn for composing HoC
  componentDidMount() {
    window.addEventListener('online',  this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  // TODO: remove after leverage HoC -> choose fn for composing HoC
  componentWillUnmount() {
    window.removeEventListener('online',  this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  // TODO: remove after leverage HoC -> choose fn for composing HoC
  updateOnlineStatus() {
    this.setState({
      online: navigator.onLine
    });
  }

  navigateToCreatorIfOffline() {
    if(this.isOnline()) {
      swal(this.staticTexts.get('alert.text.user_online'));
      return;
    }

    this.props.history.push('/create-new');
  }

  showOpenFileDialogIfOffline() {
    if(this.isOnline()) {
      swal(this.staticTexts.get('alert.text.user_online'));
      return;
    }

    dialog.showOpenDialog(
      {  
        properties: ['openFile'],
        filters: [{ name: 'All Files', extensions: ['json'] }]
      },
      this.parseJsonFile
    );
  }

  parseJsonFile(name) {
    if (!name) {
      return;
    }

    const [filePath] = name;

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileContent) => {
      if (!err && !this.isFileEmpty(fileContent)) {
        // const data = JSON.parse(fileContent);
      } else {
        swal(this.staticTexts.get('alert.text.empty_file'));
      }
    });
  }

  isOnline() {
    return this.state.online;
  }

  isFileEmpty(fileContent) {
    return fileContent.length === 0;
  }

  render() {
    return (
      <section className="dashboard-page">
        <Tile doAfterClick={this.navigateToCreatorIfOffline}
              imageSource={Plus} 
              alternativeText={this.staticTexts.get('alt.create_new')} 
              descriptiveText={this.staticTexts.get('desc.create_new')}>
        </Tile>
        <Tile doAfterClick={this.showOpenFileDialogIfOffline} 
              imageSource={Key} 
              alternativeText={this.staticTexts.get('alt.decrypt')} 
              descriptiveText={this.staticTexts.get('desc.decrypt')}>
        </Tile>
        <NetworkStatusBar></NetworkStatusBar>
      </section>
    );
  }
}

export default withRouter(DashboardPage);
