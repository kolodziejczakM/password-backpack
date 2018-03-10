import { createCipher, createDecipher } from 'crypto';

const algorithm = 'aes-256-ctr';
const encodingFormat = {
  source: 'utf8',
  target: 'hex',
};

function encryptServicePassword(password, salt) {
  const cipher = createCipher(algorithm, salt);

  return [
    cipher.update(password, encodingFormat.source, encodingFormat.target),
    cipher.final(encodingFormat.target),
  ].join('');
}

function decryptServicePassword(password, salt) {
  const decipher = createDecipher(algorithm, salt);

  return [
    decipher.update(password, encodingFormat.target, encodingFormat.source),
    decipher.final(encodingFormat.source),
  ].join('');
}

export default class PasswordValuesCipheringProvider {
  static encryptServicesPasswords(services, salt) {
    return services.map(service => (
      {
        ...service,
        serviceCore: {
          ...service.serviceCore,
          passwordValue: encryptServicePassword(service.serviceCore.passwordValue, salt),
        },
      }
    ));
  }

  static decryptServicesPasswords(services, salt) {
    return services.map(service => (
      {
        ...service,
        serviceCore: {
          ...service.serviceCore,
          passwordValue: decryptServicePassword(service.serviceCore.passwordValue, salt),
        },
      }
    ));
  }
}
