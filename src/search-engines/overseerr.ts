import { SearchEngine } from 'src/models';

import config from 'config.json';
import { searchResult } from 'src/utils';

type OverseerrCompResult = {
  results: ({
    id: number;
    mediaType: string;
    overview: string;
    posterPath: string;
  } & ({ title: string; name: undefined } | { title: undefined; name: string }))[];
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

      const markup = searchResult({
        title: item.title ?? item.name,
        description: item.overview,
        url,
        img: posterUrl,
      });

      return { html: markup, props: { url } };
    }),
  faviconUrl: `${config.overseerrUrl}/favicon.ico`,
};

export default engine;
