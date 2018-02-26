import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import './DashboardPage.css';
import Tile from '../common/tile/Tile';
import NetworkStatusBar from '../common/network-status-bar/NetworkStatusBar';
import withNetworkStatus from '../common/HOCs/withNetworkStatus';
import Plus from '../../icons/plus.svg';
import Key from '../../icons/key.svg';


const electron = window.require('electron');
const fs = electron.remote.require('fs');
const { dialog } = electron.remote;

function isFileEmpty(fileContent) {
  return fileContent.length === 0;
}

class DashboardPage extends React.Component {
  constructor() {
    super();

    this.navigateToCreatorIfOffline = this.navigateToCreatorIfOffline.bind(this);
    this.showOpenFileDialogIfOffline = this.showOpenFileDialogIfOffline.bind(this);
    this.parseJsonFile = this.parseJsonFile.bind(this);

    this.staticTexts = new Map([
      ['alt.create_new', 'Click to create new password file'],
      ['desc.create_new', 'Create new password file'],
      ['alt.decrypt', 'Click to decrypt existing file'],
      ['desc.decrypt', 'Decrypt existing file'],
      ['alert.text.empty_file', 'Chosen file is empty. You have to choose password file.'],
      ['alert.text.user_online', 'Being online due creating password file may cause password interception.'],
    ]);

    this.offlineAlertOptions = { buttons: { cancel: true, confirm: true }, dangerMode: true };
  }

  getUserOnlineAgreement() {
    if (this.props.isOnline) {
      return swal(this.staticTexts.get('alert.text.user_online'), this.offlineAlertOptions).then(userAgrees => userAgrees);
    }

    return Promise.resolve(true);
  }

  async showOpenFileDialogIfOffline() {
    if (await this.getUserOnlineAgreement()) {
      dialog.showOpenDialog(
        {
          properties: ['openFile'],
          filters: [{ name: 'All Files', extensions: ['json'] }],
        },
        this.parseJsonFile,
      );
    }
  }

  async navigateToCreatorIfOffline() {
    if (await this.getUserOnlineAgreement()) {
      this.props.history.push('/create-new');
    }
  }

  parseJsonFile(name) {
    if (!name) {
      return;
    }

    const [filePath] = name;

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileContent) => {
      if (!err && !isFileEmpty(fileContent)) {
        // const data = JSON.parse(fileContent);
      } else {
        swal(this.staticTexts.get('alert.text.empty_file'));
      }
    });
  }

  render() {
    return (
      <section className="dashboard-page">
        <Tile
          doAfterClick={this.navigateToCreatorIfOffline}
          imageSource={Plus}
          alternativeText={this.staticTexts.get('alt.create_new')}
          descriptiveText={this.staticTexts.get('desc.create_new')}
        />

        <Tile
          doAfterClick={this.showOpenFileDialogIfOffline}
          imageSource={Key}
          alternativeText={this.staticTexts.get('alt.decrypt')}
          descriptiveText={this.staticTexts.get('desc.decrypt')}
        />

        <NetworkStatusBar />
      </section>
    );
  }
}

DashboardPage.propTypes = {
  isOnline: PropTypes.bool.isRequired,
  history: PropTypes.isRequired,
};

export default compose(withRouter, withNetworkStatus)(DashboardPage);
