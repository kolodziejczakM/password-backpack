import React from 'react';
import './DashboardPage.css';
import Tile from '../common/tile/Tile';
import Plus from '../../icons/plus.svg';
import Key from '../../icons/key.svg';

class DashboardPage extends React.Component {

  render() {
    return (
      <section className="dashboard-page">
        <Tile goAfterClick="/about" 
              imageSource={Plus} 
              alternativeText="Click to create new password file" 
              descriptiveText="create new password file">
        </Tile>
        <Tile goAfterClick="/about" 
              imageSource={Key} 
              alternativeText="Click to decrypt existing file" 
              descriptiveText="Decrypt existing file">
        </Tile>
      </section>
    );
  }
}

export default DashboardPage;
