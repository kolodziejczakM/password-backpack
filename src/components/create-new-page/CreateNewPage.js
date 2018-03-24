import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddServiceForm from './add-service-form/AddServiceForm';
import ListIcon from '../../icons/list.svg';
import GoBackIcon from '../../icons/goback.svg';
import './CreateNewPage.css';
import Service from './service/Service';
import InlineInformativeBlock from '../common/inline-informative-block/InlineInformativeBlock';
import CipheringProvider from '../../providers/CipheringProvider';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const { dialog } = electron.remote;

const staticTexts = new Map([
  ['common.error', 'Something bad happened, try again.'],
  ['page.create_new.header', 'Create new password file'],
  ['page.go_back', 'Go back'],
  ['alt.service_new', 'Click to add new service'],
  ['desc.service_new', 'Add new service'],
  ['no_content', 'Append service to see it on the list'],
  ['no_content.icon.alt', 'No content icon. You must service to see it here.'],
  ['btn.label.create_ps_file', 'Create password file'],
  ['salt.creation_text',
    'Type the password that will be used to protect your password file. Do not tell it anyone and keep it in a save place.'],
  ['placeholder.password_file', 'e.g. jakMamaWypijeKawe12'],
  ['alert.lack_of_password_for_file', 'You have to provide password that will protect your password file to continue.'],
  ['file_storage.location', 'Your file has been stored in:'],
  ['alt.go_back', 'Click to go back'],
]);

const noContentIconDimension = 80;
const goBackiconDimension = 40;

function writeJsonFile(cipheredServices, targetPathName) {
  if (!targetPathName) {
    return;
  }

  const [targetFolderPath] = targetPathName;
  const outputFilePath = `${targetFolderPath}/${Date.now()}.json`;

  fs.writeFile(outputFilePath, JSON.stringify(cipheredServices), (err) => {
    if (err) {
      swal(
        staticTexts.get('common.error'),
        { icon: 'error' },
      );
    } else {
      swal(
        `${staticTexts.get('file_storage.location')} ${outputFilePath}`,
        { icon: 'success' },
      );
    }
  });
}

class CreateNewPage extends React.Component {
  constructor() {
    super();
    this.goToDashboard = this.goToDashboard.bind(this);
    this.appendService = this.appendService.bind(this);
    this.dropService = this.dropService.bind(this);
    this.makePasswordFile = this.makePasswordFile.bind(this);

    this.state = {
      services: [],
    };
  }

  goToDashboard() {
    this.props.history.push('/');
  }

  appendService(service) {
    this.setState({ services: [...this.state.services, service] });
  }

  dropService(serviceId) {
    this.setState({
      services: this.state.services.filter(service => service.serviceCore.id !== serviceId),
    });
  }

  isServiceListEmpty() {
    return !this.state.services.length;
  }

  async makePasswordFile() {
    const passwordFileSalt = await swal(staticTexts.get('salt.creation_text'), {
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
        staticTexts.get('alert.lack_of_password_for_file'),
        { buttons: { cancel: true, confirm: true }, dangerMode: true },
      );

      if (userWantsToContinue) {
        this.makePasswordFile();
      }

      return;
    }

    const encryptedServices = CipheringProvider.encryptServices(
      this.state.services,
      passwordFileSalt,
    );

    dialog.showOpenDialog(
      { properties: ['openDirectory'] },
      writeJsonFile.bind(null, encryptedServices),
    );
  }

  render() {
    return (
      <section className="create-new-page">
        <header className="create-new-page__header">
          <button onClick={this.goToDashboard} className="go-back-button">
            <img
              alt={staticTexts.get('alt.go_back')}
              src={GoBackIcon}
              width={goBackiconDimension}
              height={goBackiconDimension}
            />
          </button>
          <h1 className="create-new-page-heading-text">{staticTexts.get('page.create_new.header')}</h1>
        </header>
        <AddServiceForm onFormSubmit={this.appendService} />

        <section className="create-new-page__make-file-section">
          <button
            className="create-new-page__make-password-file-btn password-backpack-button"
            onClick={this.makePasswordFile}
            disabled={this.isServiceListEmpty()}
          >
            {staticTexts.get('btn.label.create_ps_file')}
          </button>
        </section>
        <hr />
        {
          this.isServiceListEmpty() &&
          <InlineInformativeBlock
            iconSrc={ListIcon}
            iconWidth={noContentIconDimension}
            iconHeight={noContentIconDimension}
            altText={staticTexts.get('no_content.icon.alt')}
            text={staticTexts.get('no_content')}
          />
        }

        <section className="service-list">
          {
            this.state.services.map(service => (
              <Service
                key={service.serviceCore.id}
                id={service.serviceCore.id}
                icon={service.serviceCore.icon}
                name={service.serviceCore.name}
                templateName={service.serviceCore.templateName}
                passwordValue={service.serviceCore.passwordValue}
                passwordTypeValue={service.passwordType.value}
                onDeleteClick={this.dropService}
              />
          ))}
        </section>
      </section>
    );
  }
}

CreateNewPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(CreateNewPage);
