import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import './DashboardPage.css';
import Tile from '../common/tile/Tile';
import ServiceDecrypted from './ServiceDecrypted/ServiceDecrypted';
import NetworkStatusBar from '../common/network-status-bar/NetworkStatusBar';
import withNetworkStatus from '../common/HOCs/withNetworkStatus';
import CipheringProvider from '../../providers/CipheringProvider';
import Plus from '../../icons/plus.svg';
import Key from '../../icons/key.svg';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const { dialog } = electron.remote;

function isFileEmpty(fileContent) {
  return fileContent.length === 0;
}

const staticTexts = new Map([
  ['alt.create_new', 'Click to create new password file'],
  ['desc.create_new', 'Create new password file'],
  ['alt.decrypt', 'Click to decrypt existing file'],
  ['desc.decrypt', 'Decrypt existing file'],
  ['alert.text.empty_file', 'Chosen file is empty. You have to choose password file.'],
  ['alert.text.user_online', 'Being online due creating password file may cause password interception.'],
  ['salt.decryption_text',
    'Type the password that you\'ve used to protect your password file.'],
  ['placeholder.password_file', 'e.g. jakMamaWypijeKawe12'],
  ['alert.lack_of_password_for_file_unlock', 'You have to provide password that will unlock your password file to continue.'],
]);

class DashboardPage extends React.Component {
  constructor() {
    super();

    this.navigateToCreatorIfOffline = this.navigateToCreatorIfOffline.bind(this);
    this.showOpenFileDialogIfOffline = this.showOpenFileDialogIfOffline.bind(this);
    this.parseJsonFile = this.parseJsonFile.bind(this);

    this.offlineAlertOptions = { buttons: { cancel: true, confirm: true }, dangerMode: true };
    this.state = {
      services: [],
    };
  }

  getUserOnlineAgreement() {
    if (this.props.isOnline) {
      return swal(staticTexts.get('alert.text.user_online'), this.offlineAlertOptions);
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

  async parseJsonFile(name) {
    if (!name) {
      return;
    }

    const [filePath] = name;

    const passwordFileSalt = await swal(staticTexts.get('salt.decryption_text'), {
      content: {
        element: 'input',
        attributes: {
          placeholder: staticTexts.get('placeholder.password_file'),
          type: 'password',
        },
      },
    });

    if (passwordFileSalt === null || !passwordFileSalt.length) {
      const userWantsToContinue = await swal(
        staticTexts.get('alert.lack_of_password_for_file_unlock'),
        { buttons: { cancel: true, confirm: true }, dangerMode: true },
      );

      if (userWantsToContinue) {
        this.parseJsonFile(name);
      }

      return;
    }

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileContent) => {
      if (!err && !isFileEmpty(fileContent)) {
        const encryptedFileContent = JSON.parse(fileContent);
        const decryptedFileContent = CipheringProvider.decryptServices(
          encryptedFileContent,
          passwordFileSalt,
        );

        this.setState({ services: decryptedFileContent });
      } else {
        swal(staticTexts.get('alert.text.empty_file'));
      }
    });
  }

  render() {
    return (
      <section className="dashboard-page">
        <Tile
          doAfterClick={this.navigateToCreatorIfOffline}
          imageSource={Plus}
          alternativeText={staticTexts.get('alt.create_new')}
          descriptiveText={staticTexts.get('desc.create_new')}
        />

        <Tile
          doAfterClick={this.showOpenFileDialogIfOffline}
          imageSource={Key}
          alternativeText={staticTexts.get('alt.decrypt')}
          descriptiveText={staticTexts.get('desc.decrypt')}
        />

        <NetworkStatusBar />

        <section className="service-list">
          {
            this.state.services.map(service => (
              <ServiceDecrypted
                key={service.serviceCore.id}
                icon={service.serviceCore.icon}
                name={service.serviceCore.name}
                passwordValue={service.serviceCore.passwordValue}
                passwordTypeValue={service.passwordType.value}
              />
            ))}
        </section>
      </section>
    );
  }
}

DashboardPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  isOnline: PropTypes.bool.isRequired,
};

export default compose(withRouter, withNetworkStatus)(DashboardPage);
