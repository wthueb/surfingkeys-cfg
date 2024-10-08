import { SearchEngine } from 'src/models';
import { searchResult } from 'src/utils';

type ImdbCompResult = {
  d: {
    i?: {
      height: number;
      imageUrl: string;
      width: number;
    };
    id: string;
    l: string;
    rank: number;
    s: string;
    y?: number;
  }[];
};

const engine: SearchEngine = {
  alias: 'i',
  name: 'imdb',
  searchUrl: 'https://www.imdb.com/find/?q=%s',
  compUrl: 'https://v3.sg.media-imdb.com/suggestion/x/%s.json?includeVideos=0',
  compFn: (res) =>
    (JSON.parse(res.text) as ImdbCompResult).d
      .filter((item) => !item.id.startsWith('/')) // remove unrelated ads
      .map((item) => {
        let title = item.l;
        if (item.y !== undefined) title += ` (${item.y})`;

        let url = 'https://imdb.com';
        if (item.id.startsWith('tt')) url += `/title/${item.id}/`;
        else if (item.id.startsWith('nm')) url += `/name/${item.id}/`;
        else throw new Error(`unknown imdb id: ${item}`);

        const markup = searchResult({
          title,
          description: item.s,
          url,
          img: item.i?.imageUrl,
        });

        return { html: markup, props: { url } };
      }),
  faviconUrl: 'https://www.imdb.com/favicon.ico',
};

export default engine;
