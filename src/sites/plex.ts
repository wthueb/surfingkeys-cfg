import { SiteConfig } from 'src/models';
import { sendKey } from 'src/utils';
import config from 'config.json';

const c: SiteConfig = {
  domain: new RegExp(config.plexDomainRegex, 'i'),
  keys: [
    {
      keys: 'F',
      action: () => sendKey('f', 'KeyF', 70),
      desc: 'toggle fullscreen',
    },
    {
      keys: 'a',
      action: () => sendKey('ArrowLeft', 'ArrowLeft', 37),
      desc: 'go back 10 seconds',
    },
    {
      keys: 's',
      action: () => sendKey(' ', 'Space', 32),
      desc: 'play/pause',
    },
    {
      keys: 'd',
      action: () => sendKey('ArrowRight', 'ArrowRight', 39),
      desc: 'go forward 30 seconds',
    },
  ],
};

export default c;
