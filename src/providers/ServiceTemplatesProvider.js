import UniqueIdentifierProvider from './UniqueIdentifierProvider';
import ServicesFactory from './ServicesFactory';
import CustomIcon from '../icons/services/custom.svg';

const servicePrefix = 'service';
const servicesFactory = ServicesFactory();
const customService = servicesFactory.createService('Custom', CustomIcon);

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
      ...servicesFactory.getSupportedServices()
        .map(ss => this.createServiceTemplate(ss.name, undefined, ss.src)),
    ];
  }

  static getServiceTemplateByName(templateName) {
    return this.getServiceTemplates().find(template => template.templateName === templateName);
  }
}
