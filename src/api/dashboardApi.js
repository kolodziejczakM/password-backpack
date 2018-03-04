export function getMyIp() {
  return fetch('https://api.ipify.org?format=json');
}
