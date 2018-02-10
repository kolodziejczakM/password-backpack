import React from 'react';
import { Link } from 'react-router-dom';

class DashboardPage extends React.Component {
  render() {
    return (
      <section className="dashboard-page-wrapper">
        <h1>Dashboard</h1>
        <p>This is dashboard page!</p>
        <Link to="about" className="btn btn-primary">Read about authors</Link>
      </section>
    );
  }
}

export default DashboardPage;
