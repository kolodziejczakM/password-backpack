import React from 'react';
import { withRouter } from "react-router-dom";
import './DashboardPage.css';
import Tile from '../common/tile/Tile';
import Plus from '../../icons/plus.svg';
import Key from '../../icons/key.svg';
import swal from 'sweetalert';

const electron = window.require('electron');
const fs = electron.remote.require('fs');
const { dialog } = electron.remote;

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.navigateToCreator = this.navigateToCreator.bind(this);
    this.showOpenFileDialog = this.showOpenFileDialog.bind(this);
    this.parseJsonFile = this.parseJsonFile.bind(this);

    this.staticTexts = new Map([
      ['alt.create_new', 'Click to create new password file'],
      ['desc.create_new', 'Create new password file'],
      ['alt.decrypt', 'Click to decrypt existing file'],
      ['desc.decrypt', 'Decrypt existing file'],
      ['alert.header', 'Oops'],
      ['alert.text', 'Something went wrong!'],
      ['alert.type_error', 'error']
    ]);
  }

  navigateToCreator() {
    this.props.history.push('/create-new');
  }

  showOpenFileDialog() {
    dialog.showOpenDialog(
      {  
        properties: ['openFile'],
        filters: [{ name: 'All Files', extensions: ['json'] }]
      },
      this.parseJsonFile
    );
  }

  parseJsonFile(name) {
    const [filePath] = name;

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileContent) => {

      if (!err && !this.isFileEmpty(fileContent)) {
        // const data = JSON.parse(fileContent);
      } else {
        swal(
          this.staticTexts.get('alert.header'),
          this.staticTexts.get('alert.text'), 
          this.staticTexts.get('alert.type_error')
        );
      }
    });
  }

  isFileEmpty(fileContent) {
    return fileContent.length === 0;
  }

  render() {
    return (
      <section className="dashboard-page">
        <Tile doAfterClick={this.navigateToCreator}
              imageSource={Plus} 
              alternativeText={this.staticTexts.get('alt.create_new')} 
              descriptiveText={this.staticTexts.get('desc.create_new')}>
        </Tile>
        <Tile doAfterClick={this.showOpenFileDialog} 
              imageSource={Key} 
              alternativeText={this.staticTexts.get('alt.decrypt')} 
              descriptiveText={this.staticTexts.get('desc.decrypt')}>
        </Tile>
      </section>
    );
  }
}

export default withRouter(DashboardPage);
