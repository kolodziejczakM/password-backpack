import React from 'react';
import './Footer.css';

export default () => {
  const labels = {
    madeBy: 'Icons made by ',
    pageSource: ' from ',
    licensedBy: ' is licensed by ',
  };

  const links = {
    iconsAuthor: {
      text: 'Pixel Buddha & Freepik & Dave Gandy & Pixel perfect & UIUXER & Smashicons && Eleonor Wang',
    },
    iconsPage: {
      text: 'www.flaticon.com',
      title: 'Flaticon',
      href: 'https://www.flaticon.com/',
    },
    license: {
      text: 'CC 3.0 BY',
      title: 'Creative Commons BY 3.0',
      href: 'http://creativecommons.org/licenses/by/3.0/',
    },
  };

  const appAuthorCredentials = 'Application made with ❤ by Marcin Kołodziejczak';
  const hideFooterForAWhile = false;
  return (
    hideFooterForAWhile &&
    <footer>
      <div>
        {appAuthorCredentials}
      </div>
      <div>
        {labels.madeBy} {links.iconsAuthor.text}

        {labels.pageSource}
        <a href={links.iconsPage.href} title={links.iconsPage.title}>
          {links.iconsPage.text}
        </a>
        {labels.licensedBy}
        <a href={links.license.href} title={links.license.title}>
          {links.license.text}
        </a>
      </div>
    </footer>
  );
};
