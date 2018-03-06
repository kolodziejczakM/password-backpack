import * as serviceIcons from '../icons/services';
import GooglePlusIcon from '../icons/services/googleplus.svg'; // Because naming affects const creation (+)

const createService = (name, src) => ({ name, src });
const supportedServiceNames = [
  'Dropbox',
  'Facebook',
  'Gmail',
  'Instagram',
  'LinkedIn',
  'Medium',
  'Mega',
  'Netflix',
  'PayPal',
  'Pinterest',
  'Skype',
  'SoundCloud',
  'Spotify',
  'Telegram',
  'Trello',
  'Twitter',
  'Unsplash',
  'WhatsApp',
  'Wordpress',
  'Youtube',
];

const iconSuffix = 'Icon';

const supportedServices = [
  createService('Google+', GooglePlusIcon),
  ...supportedServiceNames.map(serviceName => createService(serviceName, serviceIcons[`${serviceName}${iconSuffix}`])),
];

export default function ServiceFactory() {
  return {
    createService,
    getSupportedServices() {
      return supportedServices.sort((a, b) => (a.name < b.name ? -1 : 1));
    },
  };
}
