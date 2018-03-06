export function getMyIp() {
  return new Promise((resolve, reject) => {
    setTimeout(reject, 1000);
  });
  // return fetch('https://api.ipify.org?format=json');
}
