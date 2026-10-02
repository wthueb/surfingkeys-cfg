import { SiteConfig } from 'src/models';
import { sendKey } from 'src/utils';

const config: SiteConfig = {
  domain: /youtube\.com/i,
  keys: [
    {
      keys: 'F',
      action: () => {
        const elem = document.querySelector('.ytp-fullscreen-button') as HTMLElement;
        elem.click();
      },
      desc: 'toggle fullscreen',
    },
    {
      keys: 'a',
      // action: () => sendKey('j', 'KeyJ', 74, 106),
      action: () => sendKey('ArrowLeft', 'ArrowLeft', 37),
      desc: 'go back 10 seconds',
    },
    {
      keys: 's',
      hold: { key: ' ', code: 'Space', keyCode: 32 },
      desc: 'play/pause; hold for 2x speed',
    },
    {
      keys: 'd',
      // action: () => sendKey('l', 'KeyL', 76, 108),
      action: () => sendKey('ArrowRight', 'ArrowRight', 39),
      desc: 'go forward 10 seconds',
    },
  ],
};

export default config;
