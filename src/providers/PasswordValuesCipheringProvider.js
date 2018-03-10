import { createCipher } from 'crypto';

const algorithm = 'aes-256-ctr';
const encodingFormat = {
  source: 'utf8',
  target: 'hex',
};

function encryptServicePassword(password, salt) {
  const cipher = createCipher(algorithm, salt);
  let crypted = cipher.update(password, encodingFormat.source, encodingFormat.target);

  crypted += cipher.final(encodingFormat.target);
  return crypted;
}

function decryptServicePassword(password, salt) {
  const decipher = crypto.createDecipher(algorithm, salt);
  let dec = decipher.update(password, encodingFormat.target, encodingFormat.source);

  dec += decipher.final(encodingFormat.source);
  return dec;
}

export default class PasswordValuesCipheringProvider {
  static encryptServicesPasswords(services, salt) {
    return services.map(service => (
      {
        ...service,
        passwordValue: encryptServicePassword(service.serviceCore.passwordValue, salt),
      }
    ));
  }

  static decryptServicesPasswords(services, salt) {
    return services.map(service => (
      {
        ...service,
        passwordValue: decryptServicePassword(service.serviceCore.passwordValue, salt),
      }
    ));
  }
}
