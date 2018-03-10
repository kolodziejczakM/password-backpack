import ServicesFactory from './ServicesFactory';
import CustomIcon from '../icons/services/custom.svg';

const servicesFactory = ServicesFactory();
const customService = servicesFactory.createService('Custom', CustomIcon);

function createServiceTemplate(templateName, name = templateName, icon = '', passwordValue = '') {
  return {
    templateName,
    name,
    icon,
    passwordValue,
  };
}

export default class ServiceTemplatesProvider {
  static getServiceTemplates() {
    return [
      createServiceTemplate(customService.name, '', customService.src),
      ...servicesFactory.getSupportedServices()
        .map(ss => createServiceTemplate(ss.name, undefined, ss.src)),
    ];
  }

  static getServiceTemplateByName(templateName) {
    return this.getServiceTemplates().find(template => template.templateName === templateName);
  }
}
