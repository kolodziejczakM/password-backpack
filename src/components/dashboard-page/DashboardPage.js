import React from 'react';
import { withRouter } from "react-router-dom";
import './DashboardPage.css';
import Tile from '../common/tile/Tile';
import Plus from '../../icons/plus.svg';
import Key from '../../icons/key.svg';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.navigateToCreator = this.navigateToCreator.bind(this);
  }

  navigateToCreator() {
    this.props.history.push('/create-new');
  }

  render() {
    return (
      <section className="dashboard-page">
        <Tile doAfterClick={this.navigateToCreator}
              imageSource={Plus} 
              alternativeText="Click to create new password file" 
              descriptiveText="create new password file">
        </Tile>
        <Tile doAfterClick={this.navigateToCreator} 
              imageSource={Key} 
              alternativeText="Click to decrypt existing file" 
              descriptiveText="Decrypt existing file">
        </Tile>
      </section>
    );
  }
}

export default withRouter(DashboardPage);
