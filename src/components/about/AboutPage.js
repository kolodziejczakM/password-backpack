import React from 'react';
import { Link } from 'react-router-dom';

class AboutPage extends React.Component {
 render() {
   return (
     <section>
       <h1>About</h1>
       <p>This is about page</p>
       <Link to="/" className="btn btn-primary">Go to dashboard</Link>
     </section>
   );
 }
}

export default AboutPage;
