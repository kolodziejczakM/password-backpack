import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';
import FileParserProvider from '../../providers/FileParserProvider';
import './DashboardPage.css';
import Tile from '../common/tile/Tile';
import InlineInformativeBlock from '../common/inline-informative-block/InlineInformativeBlock';
import ServiceDecrypted from './ServiceDecrypted/ServiceDecrypted';
import withNetworkStatus from '../common/HOCs/withNetworkStatus';
import ListIcon from '../../icons/list.svg';
import Plus from '../../icons/plus.svg';
import Key from '../../icons/key.svg';
import Pencil from '../../icons/pencil.svg';

const electron = window.require('electron');
const { dialog } = electron.remote;


const staticTexts = new Map([
  ['alt.create_new', 'Click to create new password file'],
  ['desc.create_new', 'Create new password file'],
  ['alt.decrypt', 'Click to decrypt existing file'],
  ['desc.decrypt', 'Decrypt existing file'],
  ['alt.edit', 'Click to edit current file'],
  ['desc.edit', 'Edit current file'],
  ['alert.text.user_online', 'Being online due creating password file may cause password interception.'],
  ['alert.lack_of_password_for_file_unlock', 'You have to provide password that will unlock your password file to continue.'],
  ['no_decrypted_content', 'Decrypt file to see services on the list'],
  ['no_decrypted_content.icon.alt', 'List image: there is no decrypted content'],
]);

const noContentIconDimension = 80;

class DashboardPage extends React.Component {
  constructor() {
    super();

    this.navigateToCreatorIfOffline = this.navigateToCreatorIfOffline.bind(this);
    this.navigateToEditorIfOffline = this.navigateToEditorIfOffline.bind(this);
    this.showOpenFileDialogIfOffline = this.showOpenFileDialogIfOffline.bind(this);
    this.parseJsonFile = this.parseJsonFile.bind(this);

    this.offlineAlertOptions = { buttons: { cancel: true, confirm: true }, dangerMode: true };
    this.state = {
      services: [],
      allowEditMode: false,
    };
  }

  async getUserOnlineAgreement() {
    if (!window.allowUnsafeMode && this.props.isOnline) {
      const userDecision = await swal(staticTexts.get('alert.text.user_online'), this.offlineAlertOptions);
      window.allowUnsafeMode = userDecision;
      return userDecision;
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
      this.props.history.push('/form');
    }
  }

  async navigateToEditorIfOffline() {
    if (await this.getUserOnlineAgreement()) {
      this.props.history.push({
        pathname: '/form',
        state: this.state.services,
      });
    }
  }

  async parseJsonFile(name) {
    this.setState({ allowEditMode: false });

    if (!name) {
      return;
    }

    const [filePath] = name;
    const passwordFileSalt = await FileParserProvider.getPasswordSalt();

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

    FileParserProvider.parseContent(
      filePath,
      passwordFileSalt,
      (decryptedFileContent) => {
        this.setState({ services: decryptedFileContent, allowEditMode: true });
      },
    );
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

        {
          this.state.allowEditMode &&
          <Tile
            doAfterClick={this.navigateToEditorIfOffline}
            imageSource={Pencil}
            alternativeText={staticTexts.get('alt.edit')}
            descriptiveText={staticTexts.get('desc.edit')}
          />
        }

        <hr />
        {
          this.state.services.length === 0 &&
          <div className="no-decrypted-services-container">
            <InlineInformativeBlock
              iconSrc={ListIcon}
              iconWidth={noContentIconDimension}
              iconHeight={noContentIconDimension}
              altText={staticTexts.get('no_decrypted_content.icon.alt')}
              text={staticTexts.get('no_decrypted_content')}
            />
          </div>
        }

        <section className="service-list">
          {this.state.services.map(service => (
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
