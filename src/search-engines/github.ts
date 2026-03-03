import { SearchEngine } from 'src/models';
import { searchResult } from 'src/utils';

type GithubCompResult = {
  items: {
    full_name: string;
    stargazers_count?: number;
    html_url: string;
  }[];
};

const engine: SearchEngine = {
  alias: 'gh',
  name: 'github',
  searchUrl: 'https://github.com/search?q=%s',
  compUrl: 'https://api.github.com/search/repositories?sort=stars&order=desc&q=%s',
  compFn: (res) =>
    (JSON.parse(res.text) as GithubCompResult).items.map((item) => {
      let title = '';
      if (item.stargazers_count) {
        title += `${item.stargazers_count}⭐ `;
      }
      title += item.full_name;

      const markup = searchResult({
        title,
        url: item.html_url,
      });

      return { html: markup, props: { url: item.html_url } };
    }),
  faviconUrl: 'https://github.com/favicon.ico',
};

export default engine;
