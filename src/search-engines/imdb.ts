type ImdbCompResult = {
  d: { id: string; l: string; y: number }[];
};

export default {
  searchUrl: "https://www.imdb.com/find?q=%s",
  compUrl: "https://v3.sg.media-imdb.com/suggestion/x/%s.json?includeVideos=0",
  compFn: (res: { text: string }) =>
    (JSON.parse(res.text) as ImdbCompResult).d.map((item) => {
      const title = `${item.l} (${item.y})`;
      const url = `https://imdb.com/title/${item.id}/`;

      const html = `
        <div>
          <div style="font-weight: bold">${title}</div>
          <div style="opacity: 0.7; line-height: 1.3em">${url}</div>
        </div>`;

      return { html, props: { url } };
    }),
  faviconUrl: "https://www.imdb.com/favicon.ico",
};
