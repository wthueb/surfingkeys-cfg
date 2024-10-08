import { SearchEngine } from 'src/models';

import config from 'config.json';
import { html, searchResult } from 'src/utils';

type Thumbnail = {
  url: string;
  width?: number;
  height?: number;
};

type Thumbnails = {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
};

type Snippet = {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  title: string;
};

type YoutubeCompletionChannelResult = {
  etag: string;
  id: {
    channelId: string;
    kind: 'youtube#channel';
  };
  kind: 'youtube#searchResult';
  snippet: Snippet;
};

type YoutubeCompletionVideoResult = {
  etag: string;
  id: {
    kind: 'youtube#video';
    videoId: string;
  };
  kind: 'youtube#searchResult';
  snippet: Snippet;
};

type YoutubeCompletionResult = {
  etag: string;
  items: (YoutubeCompletionChannelResult | YoutubeCompletionVideoResult)[];
  kind: 'youtube#searchListResponse';
  pageInfo: { totalResults: number; resultsPerPage: number };
  regionCode: string;
};

const engine: SearchEngine = {
  alias: 'y',
  name: 'youtube',
  searchUrl: 'https://www.youtube.com/results?search_query=%s',
  compUrl: `https://www.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&type=video,channel&key=${config.googleKey}&safeSearch=none&q=%s`,
  compFn: (res) =>
    (JSON.parse(res.text) as YoutubeCompletionResult).items.map((item) => {
      const thumb = item.snippet.thumbnails.default;

      let markup = '';
      let url = '';

      switch (item.id.kind) {
        case 'youtube#channel': {
          url = `https://youtube.com/channel/${item.id.channelId}`;
          markup = searchResult({
            title: item.snippet.channelTitle,
            description: item.snippet.description,
            url: 'channel',
            img: thumb.url,
          });
          break;
        }
        case 'youtube#video': {
          url = `https://www.youtube.com/watch?v=${item.id.videoId}`;
          const date = new Date(item.snippet.publishedAt).toLocaleDateString();
          markup = searchResult({
            title: item.snippet.title,
            description: item.snippet.description,
            url: `video by ${item.snippet.channelTitle}`,
            img: thumb.url,
            timestamp: date,
          });
          break;
        }
        default: {
          markup = html`<div>something is broken, item printed to console</div>`;
          console.error(item);
          break;
        }
      }

      return { html: markup, props: { url } };
    }),
  faviconUrl: 'https://www.youtube.com/favicon.ico',
};

export default engine;
