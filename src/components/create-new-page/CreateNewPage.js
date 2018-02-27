import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './CreateNewPage.css';
import Tile from '../common/tile/Tile';
import Plus from '../../icons/plus.svg';

class CreateNewPage extends React.Component {
  constructor() {
    super();
    this.goToDashboard = this.goToDashboard.bind(this);
    this.showNewServiceForm = this.showNewServiceForm.bind(this);

    this.staticTexts = new Map([
      ['page.create_new.header', 'Create new password file'],
      ['page.go_back', 'Go back'],
      ['alt.service_new', 'Click to add new service'],
      ['desc.service_new', 'Add new service'],
    ]);
  }

  goToDashboard() {
    this.props.history.push('/');
  }

  showNewServiceForm() {
    console.log('this: ', this);
  }

  render() {
    return (
      <section>
        <header>
          <button onClick={this.goToDashboard}>{this.staticTexts.get('page.go_back')}</button>
          <h1 className="create-new-page-heading-text">{this.staticTexts.get('page.create_new.header')}</h1>
        </header>
        <Tile
          doAfterClick={this.showNewServiceForm}
          imageSource={Plus}
          alternativeText={this.staticTexts.get('alt.service_new')}
          descriptiveText={this.staticTexts.get('desc.service_new')}
        />
      </section>
    );
  }
}

CreateNewPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(CreateNewPage);
