import { SearchEngine } from 'src/models';
import { html, searchResult } from 'src/utils';

type PersonResult = {
  id: `nm${string}`;
  l: string; // full name
  s: string; // description
};

type ContentResult = {
  id: `tt${string}`;
  i?: {
    height: number;
    imageUrl: string;
    width: number;
  }; // image
  l: string; // title
  q: 'feature' | 'TV series' | 'short';
  s: string; // cast
  y?: number; // year
};

type ImdbCompResult = {
  d: (PersonResult | ContentResult)[];
};

const movieImgHtml = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="48"
  height="48"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path fill="none" d="M0 0h24v24H0V0z"></path>
  <path
    d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"
  ></path>
</svg>`;

const seriesImgHtml = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="48"
  height="48"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path fill="none" d="M0 0h24v24H0V0z"></path>
  <path
    d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"
  ></path>
</svg>`;

const personImgHtml = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="48"
  height="48"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path fill="none" d="M0 0h24v24H0V0z"></path>
  <path
    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"
  ></path>
</svg>`;

const engine: SearchEngine = {
  alias: 'i',
  name: 'imdb',
  searchUrl: 'https://www.imdb.com/find/?q=%s',
  compUrl: 'https://v3.sg.media-imdb.com/suggestion/x/%s.json?includeVideos=0',
  compFn: (res) =>
    (JSON.parse(res.text) as ImdbCompResult).d
      .filter((item) => !item.id.startsWith('/')) // remove unrelated ads
      .map((item) => {
        if (item.id.startsWith('nm')) {
          item = item as PersonResult;

          const url = `https://imdb.com/name/${item.id}/`;

          const markup = searchResult({
            title: item.l,
            description: item.s,
            url,
            imgHtml: personImgHtml,
          });

          return { html: markup, props: { url } };
        }

        if (item.id.startsWith('tt')) {
          item = item as ContentResult;

          const title = `${item.l} (${item.y ?? 'unknown'})`;
          const url = `https://imdb.com/title/${item.id}/`;

          let markup: string;

          if (item.i) {
            markup = searchResult({
              title,
              description: item.s,
              url,
              img: item.i.imageUrl,
            });
          } else {
            const imgHtml = item.q === 'TV series' ? seriesImgHtml : movieImgHtml;

            markup = searchResult({
              title,
              description: item.s,
              url,
              imgHtml,
            });
          }

          return { html: markup, props: { url } };
        }

        throw new Error('Invalid item type');
      }),
  faviconUrl: 'https://www.imdb.com/favicon.ico',
};

export default engine;
