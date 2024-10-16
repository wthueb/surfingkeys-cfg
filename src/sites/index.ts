import { SiteConfig } from 'src/models';

import jira from './jira';
import plex from './plex';
import youtube from './youtube';

const sites: SiteConfig[] = [jira, plex, youtube];

for (const site of sites) {
  for (const keymap of site.keys) {
    keymap.opts = {
      domain: site.domain,
    };
  }
}

export default sites;
