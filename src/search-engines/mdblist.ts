import { SearchEngine } from 'src/models';
import { searchResult } from 'src/utils';

type MdblistCompResult = {
  success: boolean;
  results?: {
    title: string;
    description: string;
    image?: string | null;
    url: string;
  }[];
};

const engine: SearchEngine = {
  alias: 'mdb',
  name: 'mdblist',
  searchUrl:
    'https://www.google.com/search?q={0}+site%3Amdblist.com%2Fmovie%2F+OR+{0}+site%3Amdblist.com%2Fshow%2F',
  compUrl: 'https://mdblist.com/ajax/quicksearch/?q=%s&limit=20',
  compFn: (res) => {
    const response = JSON.parse(res.text) as MdblistCompResult;
    if (!response.success) return [];

    return (response.results ?? []).map((item) => {
      const url = new URL(item.url, 'https://mdblist.com').href;
      const markup = searchResult({
        title: item.title,
        description: item.description,
        img: item.image ?? undefined,
        url,
      });

      return { html: markup, props: { url } };
    });
  },
  faviconUrl: 'https://mdblist.com/static/favicon.ico',
};

export default engine;
