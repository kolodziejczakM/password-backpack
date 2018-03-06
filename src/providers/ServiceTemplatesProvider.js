import UniqueIdentifierProvider from './UniqueIdentifierProvider';
import * as serviceIcons from '../icons/services';
import GooglePlusIcon from '../icons/services/googleplus.svg'; // Because naming affects const creation (+)
import CustomIcon from '../icons/services/custom.svg';

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
const servicePrefix = 'service';

const customService = createService('Custom', CustomIcon);

const supportedServices = [
  createService('Google+', GooglePlusIcon),
  ...supportedServiceNames.map(serviceName => createService(serviceName, serviceIcons[`${serviceName}${iconSuffix}`])),
];

const supportedServicesSorted = supportedServices.sort((a, b) => (a.name < b.name ? -1 : 1));

export default class ServiceTemplatesProvider {
  static createServiceTemplate(templateName, name = templateName, icon = '', passwordValue = '') {
    return {
      id: UniqueIdentifierProvider.getPrefixedUUID(servicePrefix),
      templateName,
      name,
      icon,
      passwordValue,
    };
  }

  static getServiceTemplates() {
    return [
      this.createServiceTemplate(customService.name, '', customService.src),
      ...supportedServicesSorted.map(ss => this.createServiceTemplate(ss.name, undefined, ss.src)),
    ];
  }

  static getServiceTemplateByName(templateName) {
    return this.getServiceTemplates().find(template => template.templateName === templateName);
  }
}
