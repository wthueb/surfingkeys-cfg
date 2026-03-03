import { SearchEngine } from 'src/models';
import { searchResult } from 'src/utils';

import config from 'config.json';

type RadarrCompResult = {
  id?: number;
  title: string;
  year: number;
  overview: string;
  remotePoster: string;
  imdbId: string;
  tmdbId: number;

  runtime: number;
  genres: string[];
  keywords: string[];
  ratings: Ratings;
};

type Ratings = {
  imdb?: Rating;
  tmdb?: Rating;
  metacritic?: Rating;
  rottenTomatoes?: Rating;
  trakt?: Rating;
};

type Rating = {
  votes: number;
  value: number;
  type: string;
};

type SonarrCompResult = {
  id?: number;
  title: string;
  year: number;
  overview: string;
  remotePoster: string;
  imdbId: string;
  tvdbId: number;
  titleSlug: string;
  firstAired?: string;
  lastAired?: string;
  ended: boolean;
  genres: string[];
};

function mkRadarrSearchEngine(
  alias: string,
  name: string,
  config: { url: string; apiKey: string },
): SearchEngine {
  return {
    alias,
    name,
    searchUrl: `${config.url}/add/new?term=%s`,
    compUrl: `${config.url}/api/v3/movie/lookup?term=%s`,
    headers: { 'X-Api-Key': config.apiKey },
    compFn: (res) => {
      return (JSON.parse(res.text) as RadarrCompResult[]).map((item) => {
        const title = `${item.title} (${item.year})`;

        const markup = searchResult({
          title,
          description: item.overview,
          url: `https://www.imdb.com/title/${item.imdbId}`,
          img: item.remotePoster,
        });

        const url = item.id
          ? `${config.url}/movie/${item.tmdbId}`
          : `${config.url}/add/new?term=tmdb:${item.tmdbId}`;

        return { html: markup, props: { url } };
      });
    },
    faviconUrl: `${config.url}/favicon.ico`,
  };
}

function mkSonarrSearchEngine(
  alias: string,
  name: string,
  config: { url: string; apiKey: string },
): SearchEngine {
  return {
    alias,
    name,
    searchUrl: `${config.url}/add/new?term=%s`,
    compUrl: `${config.url}/api/v3/series/lookup?term=%s`,
    headers: { 'X-Api-Key': config.apiKey },
    compFn: (res) => {
      return (JSON.parse(res.text) as SonarrCompResult[]).map((item) => {
        let year = item.year.toString();

        if (item.firstAired) {
          const firstAiredYear = new Date(item.firstAired).getFullYear();

          if (item.ended) {
            const lastAiredYear = item.lastAired ? new Date(item.lastAired).getFullYear() : '?';
            year = `${firstAiredYear}-${lastAiredYear}`;
          }
        }
        const title = `${item.title} (${year})`;

        const markup = searchResult({
          title,
          description: item.overview,
          url: `https://www.imdb.com/title/${item.imdbId}`,
          img: item.remotePoster,
        });

        const url = item.id
          ? `${config.url}/series/${item.titleSlug}`
          : `${config.url}/add/new?term=tvdb:${item.tvdbId}`;

        return { html: markup, props: { url } };
      });
    },
    faviconUrl: `${config.url}/favicon.ico`,
  };
}

const radarr = mkRadarrSearchEngine('r', 'radarr', config.radarr);
const radarr4k = mkRadarrSearchEngine('r4k', 'radarr4k', config.radarr4k);
const sonarr = mkSonarrSearchEngine('s', 'sonarr', config.sonarr);
const sonarr4k = mkSonarrSearchEngine('s4k', 'sonarr4k', config.sonarr4k);

export default { radarr, radarr4k, sonarr, sonarr4k };
