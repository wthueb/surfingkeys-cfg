import { SiteConfig } from 'src/models';
import { sendKey } from 'src/utils';

const config: SiteConfig = {
  domain: /jira\..*\.com/i,
  keys: [
    {
      keys: ',',
      action: () => sendKey(',', 'Comma', 188, 50),
      desc: 'actions',
    },
  ],
};

export default config;
