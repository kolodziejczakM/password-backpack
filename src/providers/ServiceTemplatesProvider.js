import UniqueIdentifierProvider from './UniqueIdentifierProvider';

import CustomIcon from '../icons/services/custom.svg';
import DropboxIcon from '../icons/services/dropbox.svg';
import FacebookIcon from '../icons/services/facebook.svg';
import GmailIcon from '../icons/services/gmail.svg';
import GooglePlusIcon from '../icons/services/googleplus.svg';
import InstagramIcon from '../icons/services/instagram.svg';
import LinkedinIcon from '../icons/services/linkedin.svg';
import MediumIcon from '../icons/services/medium.svg';
import MegaIcon from '../icons/services/mega.svg';
import NetflixIcon from '../icons/services/netflix.svg';
import PayPalIcon from '../icons/services/paypal.svg';
import PinterestIcon from '../icons/services/pinterest.svg';
import SkypeIcon from '../icons/services/skype.svg';
import SoundCloudIcon from '../icons/services/soundcloud.svg';
import SpotifyIcon from '../icons/services/spotify.svg';
import TelegramIcon from '../icons/services/telegram.svg';
import TrelloIcon from '../icons/services/trello.svg';
import TwitterIcon from '../icons/services/twitter.svg';
import UnsplashIcon from '../icons/services/unsplash.svg';
import WhatsAppIcon from '../icons/services/whatsapp.svg';
import WordpressIcon from '../icons/services/wordpress.svg';
import YoutubeIcon from '../icons/services/youtube.svg';

const customService = { name: 'Custom', src: CustomIcon };
const supportingServices = [
  { name: 'Dropbox', src: DropboxIcon },
  { name: 'Facebook', src: FacebookIcon },
  { name: 'Gmail', src: GmailIcon },
  { name: 'Google+', src: GooglePlusIcon },
  { name: 'Instagram', src: InstagramIcon },
  { name: 'Linkedin', src: LinkedinIcon },
  { name: 'Medium', src: MediumIcon },
  { name: 'Mega', src: MegaIcon },
  { name: 'Netflix', src: NetflixIcon },
  { name: 'PayPal', src: PayPalIcon },
  { name: 'Pinterest', src: PinterestIcon },
  { name: 'Skype', src: SkypeIcon },
  { name: 'SoundCloud', src: SoundCloudIcon },
  { name: 'Spotify', src: SpotifyIcon },
  { name: 'Telegram', src: TelegramIcon },
  { name: 'Trello', src: TrelloIcon },
  { name: 'Twitter', src: TwitterIcon },
  { name: 'Unsplash', src: UnsplashIcon },
  { name: 'WhatsApp', src: WhatsAppIcon },
  { name: 'Wordpress', src: WordpressIcon },
  { name: 'Youtube', src: YoutubeIcon },
];

const servicePrefix = 'service';

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
      ...supportingServices.map(ss => (this.createServiceTemplate(ss.name, undefined, ss.src))),
    ];
  }

  static getServiceTemplateByName(templateName) {
    return this.getServiceTemplates().find(template => template.templateName === templateName);
  }
}
