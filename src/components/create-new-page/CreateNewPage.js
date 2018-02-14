import React from 'react';
import './CreateNewPage.css';

class CreateNewPage extends React.Component {
 render() {
    const staticTexts = {
      header: 'Create new password file'
    };

   return (
     <section>
       <h1 className="create-new-page-heading-text">{staticTexts.header}</h1>
       <p></p>
     </section>
   );
 }
}

export default CreateNewPage;
