import { SiteConfig } from 'src/models';

import jira from './jira';
import youtube from './youtube';

const sites: SiteConfig[] = [jira, youtube];

sites.forEach((site) => {
    site.keys.forEach((keymap) => {
        keymap.opts = {
            domain: site.domain,
        };
    });
});

export default sites;
