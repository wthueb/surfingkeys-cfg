import config from "config.json";
import { SearchEngine } from "src/models";

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
    kind: "youtube#channel";
  };
  kind: "youtube#searchResult";
  snippet: Snippet;
};

type YoutubeCompletionVideoResult = {
  etag: string;
  id: {
    kind: "youtube#video";
    videoId: string;
  };
  kind: "youtube#searchResult";
  snippet: Snippet;
};

type YoutubeCompletionResult = {
  etag: string;
  items: (YoutubeCompletionChannelResult | YoutubeCompletionVideoResult)[];
  kind: "youtube#searchListResponse";
  pageInfo: { totalResults: number; resultsPerPage: number };
  regionCode: string;
};

const engine: SearchEngine = {
  alias: "y",
  name: "youtube",
  searchUrl: "https://www.youtube.com/results?search_query=%s",
  compUrl: `https://www.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&type=video,channel&key=${config.googleKey}&safeSearch=none&q=%s`,
  compFn: (res) =>
    (JSON.parse(res.text) as YoutubeCompletionResult).items.map((item) => {
      const thumb = item.snippet.thumbnails.default;

      let html: string = "";
      let url: string = "";

      switch (item.id.kind) {
        case "youtube#channel": {
          url = `https://youtube.com/channel/${item.id.channelId}`;
          html = `
                        <div style="display: flex; flex-direction: row">
                            <img
                                style="max-width: 160px; height: 90px; margin-right: 0.8em"
                                alt="thumbnail"
                                src="${thumb.url}">
                            <div>
                                <div class="title">
                                    ${item.snippet.channelTitle}
                                </div>
                                <div>
                                    <div>${item.snippet.description}</div>
                                    <div class="url">channel</div>
                                </div>
                            </div>
                        </div>`;
          break;
        }
        case "youtube#video": {
          url = `https://www.youtube.com/watch?v=${item.id.videoId}`;
          const date = new Date(item.snippet.publishedAt).toLocaleDateString();
          html = `
                        <div style="display: flex; flex-direction: row">
                            <img
                                style="max-width: 160px; height: 90px; margin-right: 0.8em"
                                alt="thumbnail"
                                src="${thumb.url}">
                            <div>
                                <div class="title">
                                    ${item.snippet.title}
                                </div>
                                <div>
                                    <div>${item.snippet.description}</div>
                                    <div class="url">
                                        video by ${item.snippet.channelTitle}
                                        <span class="omnibar_timestamp"># ${date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>`;
          break;
        }
        default: {
          html = "<div>something is broken, item printed to console</div>";
          console.error(item);
          break;
        }
      }

      return { html, props: { url } };
    }),
  faviconUrl: "https://www.youtube.com/favicon.ico",
};

export default engine;
