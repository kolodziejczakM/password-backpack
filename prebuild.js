const fs = require('fs');

function copyFile(source, target) {
  const rd = fs.createReadStream(source);
  const wr = fs.createWriteStream(target);

  return new Promise(((resolve, reject) => {
    rd.on('error', reject);
    wr.on('error', reject);
    wr.on('finish', resolve);
    rd.pipe(wr);
  })).catch((error) => {
    rd.destroy();
    wr.end();
    throw error;
  });
}

copyFile('./icon.icns', './build/icon.icns');
copyFile('./icon.ico', './build/icon.ico');
