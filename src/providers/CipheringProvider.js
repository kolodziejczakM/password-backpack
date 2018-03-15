import { createCipher, createDecipher } from 'crypto';

const algorithm = 'aes-256-ctr';
const encodingFormat = {
  source: 'utf8',
  target: 'hex',
};

function encryptString(password, salt) {
  const cipher = createCipher(algorithm, salt);

  return [
    cipher.update(password, encodingFormat.source, encodingFormat.target),
    cipher.final(encodingFormat.target),
  ].join('');
}

function decryptString(password, salt) {
  const decipher = createDecipher(algorithm, salt);

  return [
    decipher.update(password, encodingFormat.target, encodingFormat.source),
    decipher.final(encodingFormat.source),
  ].join('');
}

function encryptObject(obj, salt) {
  return Object.keys(obj).reduce((acc, keyName) => {
    acc[encryptString(keyName, salt)] = encryptString(obj[keyName], salt);
    return acc;
  }, {});
}

function decryptObject(obj, salt) {
  return Object.keys(obj).reduce((acc, keyName) => {
    acc[decryptString(keyName, salt)] = decryptString(obj[keyName], salt);
    return acc;
  }, {});
}

export default class CipheringProvider {
  static encryptServices(services, salt) {
    return services.map(service => (
      {
        ...Object.keys(service).reduce((acc, serviceKey) => {
          acc[encryptString(serviceKey, salt)] = encryptObject(service[serviceKey], salt);
          return acc;
        }, {}),
      }
    ));
  }

  static decryptServices(services, salt) {
    return services.map(service => (
      {
        ...Object.keys(service).reduce((acc, serviceKey) => {
          acc[decryptString(serviceKey, salt)] = decryptObject(service[serviceKey], salt);
          return acc;
        }, {}),
      }
    ));
  }
}
