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
            action: () => sendKey('j'),
            desc: 'go back 10 seconds',
        },
        {
            keys: 's',
            action: () => sendKey('k'),
            desc: 'play/pause',
        },
        {
            keys: 'd',
            action: () => sendKey('l'),
            desc: 'go forward 10 seconds',
        },
    ],
};

export default config;
