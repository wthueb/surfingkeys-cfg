import { SiteConfig } from 'src/models';

import youtube from './youtube';

const sites: SiteConfig[] = [youtube];

sites.forEach((site) => {
    site.keys.forEach((keymap) => {
        keymap.opts = {
            domain: site.domain,
        };
    });
});

export default sites;
