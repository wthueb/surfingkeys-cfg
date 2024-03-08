import { SearchEngine } from 'src/models';

const engine: SearchEngine = {
  alias: 'g',
  name: 'google',
  searchUrl: 'https://www.google.com/search?q=',
  compUrl:
    'https://www.google.com/complete/search?client=chrome-omni&gs_ri=chrome-ext&oit=1&pgcl=7&q=%s',
  compFn: (res) => JSON.parse(res.text)[1],
  faviconUrl: 'https://www.google.com/favicon.ico',
};

export default engine;
