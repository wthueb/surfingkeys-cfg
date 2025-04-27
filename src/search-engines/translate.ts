import { SearchEngine } from 'src/models';

const engine: SearchEngine = {
  alias: 't',
  name: 'translate',
  searchUrl: 'https://translate.google.com/?op=translate&sl=auto&tl=en&text=%s',
  faviconUrl: 'https://translate.google.com/favicon.ico',
};

export default engine;
