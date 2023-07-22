import config from "config.json";

type YoutubeCompletionChannelResult = {
  etag: string;
  id: {
    channelId: string;
    kind: "youtube#channel";
  };
  kind: "youtube#searchResult";
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
    title: string;
  };
};

type YoutubeCompletionVideoResult = {
  etag: string;
  id: {
    kind: "youtube#video";
    videoId: string;
  };
  kind: "youtube#searchResult";
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    title: string;
  };
};

type YoutubeCompletionResult = {
  etag: string;
  items: (YoutubeCompletionChannelResult | YoutubeCompletionVideoResult)[];
  kind: "youtube#searchListResponse";
  pageInfo: { totalResults: number; resultsPerPage: number };
  regionCode: string;
};

export default {
  searchUrl: "https://www.youtube.com/results?search_query=",
  compUrl: `https://www.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&type=video,channel&key=${config.youtubeKey}&safeSearch=none&q=%s`,
  compFn: (res: { text: string }) =>
    (JSON.parse(res.text) as YoutubeCompletionResult).items.map((item) => {
      const thumb = item.snippet.thumbnails.default;

      let html: string = "";
      let url: string = "";

      switch (item.id.kind) {
        case "youtube#channel":
          url = `https://youtube.com/channel/${item.id.channelId}`;
          html = `
            <div style="display: flex; flex-direction: row">
              <img
                style="width: 120px; height: 90px; margin-right: 0.8em"
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
        case "youtube#video":
          url = `https://www.youtube.com/watch?v=${item.id.videoId}`;
          const date = new Date(item.snippet.publishedAt).toLocaleDateString();
          html = `
            <div style="display: flex; flex-direction: row">
              <img
                style="width: 120px; height: 90px; margin-right: 0.8em"
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
            </div>
          `;
          break;
        default:
          html = "<div>something is broken, item printed to console</div>";
          console.error(item);
          break;
      }

      return { html, props: { url } };
    }),
};
