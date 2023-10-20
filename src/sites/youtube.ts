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
            action: () => sendKey('j', 'KeyJ', 74, 106),
            desc: 'go back 10 seconds',
        },
        {
            keys: 's',
            action: () => sendKey('k', 'KeyK', 75, 107),
            desc: 'play/pause',
        },
        {
            keys: 'd',
            action: () => sendKey('l', 'KeyL', 76, 108),
            desc: 'go forward 10 seconds',
        },
    ],
};

export default config;
