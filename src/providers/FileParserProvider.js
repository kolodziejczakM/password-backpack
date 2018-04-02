import swal from 'sweetalert';
import CipheringProvider from './CipheringProvider';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

const isFileEmpty = fileContent => fileContent.length === 0;

const staticTexts = new Map([
  ['alert.text.empty_file', 'Chosen file is empty. You have to choose password file.'],
  ['salt.decryption_text',
    'Type the password that you\'ve used to protect your password file.'],
  ['placeholder.password_file', 'e.g. jakMamaWypijeKawe12'],
  ['decryption.error', 'Error occured during decryption:'],
]);

export default class FileParserProvider {
  static parseContent(filePath, passwordFileSalt, callback) {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileContent) => {
      if (!err && !isFileEmpty(fileContent)) {
        const encryptedFileContent = JSON.parse(fileContent);
        const decryptedFileContent = CipheringProvider.decryptServices(
          encryptedFileContent,
          passwordFileSalt,
        );

        if (!decryptedFileContent[0].serviceCore) {
          swal(
            `${staticTexts.get('decryption.error')} ${filePath}`,
            { icon: 'error' },
          );
          return;
        }

        callback(decryptedFileContent);
      } else {
        swal(staticTexts.get('alert.text.empty_file'));
      }
    });
  }

  static getPasswordSalt() {
    return swal(staticTexts.get('salt.decryption_text'), {
      content: {
        element: 'input',
        attributes: {
          placeholder: staticTexts.get('placeholder.password_file'),
          type: 'password',
        },
      },
    });
  }
}
