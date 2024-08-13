import { SearchEngine } from 'src/models';

import config from 'config.json';

type OverseerrCompResult = {
  results: {
    id: number;
    mediaType: string;
    title?: string;
    name?: string;
    overview: string;
    posterPath: string;
  }[];
};

const engine: SearchEngine = {
  alias: 'o',
  name: 'overseerr',
  searchUrl: `${config.overseerrUrl}/search?query=`,
  compUrl: `${config.overseerrUrl}/api/v1/search?page=1&language=en&query=%s`,
  compFn: (res) =>
    (JSON.parse(res.text) as OverseerrCompResult).results.map((item) => {
      const posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.posterPath}`;
      const url = `${config.overseerrUrl}/${item.mediaType}/${item.id}`;

      const html = `
        <div style="display: flex; flex-direction: row">
          <img
            style="max-width: 160px; height: 90px; margin-right: 0.8em"
            alt="thumbnail"
            src="${posterUrl}">
          <div>
            <div class="title">${item.title ?? item.name}</div>
            <div>
              <div>${item.overview}</div>
              <div class="url">${url}</div>
            </div>
          </div>
        </div>`;

      return { html, props: { url } };
    }),
  faviconUrl: `${config.overseerrUrl}/favicon.ico`,
};

export default engine;
