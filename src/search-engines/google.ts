export default {
  searchUrl: "https://www.google.com/search?q=%s",
  compUrl:
    "https://www.google.com/complete/search?client=chrome-omni&gs_ri=chrome-ext&oit=1&pgcl=7&q=%s",
  compFn: (res: { text: string }) => JSON.parse(res.text)[1],
  faviconUrl: "https://www.google.com/favicon.ico",
};
