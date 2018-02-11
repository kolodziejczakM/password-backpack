import React from 'react'

export default () => {
  const labels = {
    madeBy: 'Icons made by ',
    pageSource: 'from',
    licensedBy: 'is licensed by '
  };

  const links = {
    iconsAuthor: { text: 'Pixel Buddha', title: 'Pixel Buddha', href: 'https://www.flaticon.com/authors/pixel-buddha' },
    iconsPage: { text: 'www.flaticon.com', title: 'Flaticon', href: 'https://www.flaticon.com/' },
    license: { text: 'CC 3.0 BY', title: 'Creative Commons BY 3.0', href: 'http://creativecommons.org/licenses/by/3.0/' }
  };

  return (
    <footer>
      {labels.madeBy} <a href={links.iconsAuthor.href} title={links.iconsAuthor.title}>{links.iconsAuthor.text}</a>
      {labels.pageSource} <a href={links.iconsPage.href} title={links.iconsPage.title}>{links.iconsPage.text}</a>
      {labels.licensedBy} <a href={links.license.href} title={links.license.title}>{links.license.text}</a>
    </footer>
  );
}
