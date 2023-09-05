import imdb from "./search-engines/imdb";
import github from "./search-engines/github";
import google from "./search-engines/google";
import wikipedia from "./search-engines/wikipedia";
import youtube from "./search-engines/youtube";

const { Normal, Front, Hints, Visual, RUNTIME } = api;

const INPUTABLE =
  "input:not([type=submit]), textarea, *[contenteditable=true], *[role=textbox], select, div.ace_cursor";

// https://github.com/brookhong/Surfingkeys/blob/master/src/content_scripts/ui/frontend.js#L280
enum Help {
  help = 0,
  mouseClick = 1,
  scroll = 2,
  tabs = 3,
  pageNav = 4,
  sessions = 5,
  searchSelectedWith = 6,
  clipboard = 7,
  omnibar = 8,
  visualMode = 9,
  vimMarks = 10,
  settings = 11,
  chromeURLs = 12,
  proxy = 13,
  misc = 14,
  insertMode = 15,
  lurkMode = 16,
}

api.unmapAllExcept(["?", "/", "v", "V", "n", "N", "w", "cs"]);

//api.mapkey("?", `#${Help.help}show usage`, () => Front.showUsage());

//api.mapkey("v", `#${Help.help}enter visual mode`, () => Visual.toggle());

api.mapkey("h", `#${Help.scroll}left`, () => Normal.scroll("left"));
api.mapkey("j", `#${Help.scroll}down`, () => Normal.scroll("down"));
api.mapkey("k", `#${Help.scroll}up`, () => Normal.scroll("up"));
api.mapkey("l", `#${Help.scroll}right`, () => Normal.scroll("right"));
api.mapkey("<Ctrl-d>", `#${Help.scroll}half page down`, () =>
  Normal.scroll("pageDown")
);
api.mapkey("<Ctrl-u>", `#${Help.scroll}half page up`, () =>
  Normal.scroll("pageUp")
);
api.mapkey("gg", `#${Help.scroll}top`, () => Normal.scroll("top"));
api.mapkey("G", `#${Help.scroll}bottom`, () => Normal.scroll("bottom"));

api.mapkey("a", `#${Help.help}temporary passthrough`, () => {
  const timeout = 1500;
  Normal.passThrough(timeout);
  Front.showBanner("temporary passthrough enabled", timeout);
});

api.mapkey("o", `#${Help.omnibar}open URL in current tab`, () =>
  Front.openOmnibar({ type: "URLs", tabbed: false })
);
api.mapkey("O", `#${Help.omnibar}open URL in new tab`, () =>
  Front.openOmnibar({ type: "URLs", tabbed: true })
);
api.mapkey("b", `#${Help.omnibar}open bookmark in current tab`, () =>
  Front.openOmnibar({ type: "Bookmarks", tabbed: false })
);
api.mapkey("B", `#${Help.omnibar}open bookmark in new tab`, () =>
  Front.openOmnibar({ type: "Bookmarks", tabbed: true })
);
api.mapkey("u", `#${Help.omnibar}open URL from history`, () =>
  Front.openOmnibar({ type: "History", tabbed: false })
);
api.mapkey("U", `#${Help.omnibar}open URL from history in new tab`, () =>
  Front.openOmnibar({ type: "History", tabbed: true })
);
api.mapkey(":", `#${Help.omnibar}open omnibar in command mode`, () =>
  Front.openOmnibar({ type: "Commands" })
);

api.mapkey("f", `#${Help.mouseClick}open link in current tab`, () =>
  Hints.create("", Hints.dispatchMouseClick, { tabbed: false })
);
api.mapkey("F", `#${Help.mouseClick}open link in new tab`, () =>
  Hints.create("", Hints.dispatchMouseClick, { tabbed: true, active: true })
);

api.mapkey("S", `#${Help.pageNav}go back in history`, () => history.back(), {
  repeatIgnore: true,
});
api.mapkey(
  "D",
  `#${Help.pageNav}go forward in history`,
  () => history.forward(),
  {
    repeatIgnore: true,
  }
);
api.mapkey("r", `#${Help.pageNav}reload the page`, () =>
  RUNTIME("reloadTab", { nocache: false })
);

api.mapkey("x", `#${Help.tabs}close current tab`, () => RUNTIME("closeTab"));
api.mapkey("X", `#${Help.tabs}restore closed tab`, () => RUNTIME("openLast"));
api.mapkey(">>", `#${Help.tabs}move tab to the right`, () =>
  RUNTIME("moveTab", { step: 1 })
);
api.mapkey("<<", `#${Help.tabs}move tab to the left`, () =>
  RUNTIME("moveTab", { step: -1 })
);

api.mapkey("zr", `#${Help.pageNav}zoom reset`, () => {
  RUNTIME("setZoom", {
    zoomFactor: 0,
  });
});
api.mapkey("zi", `#${Help.pageNav}zoom in`, () => {
  RUNTIME("setZoom", {
    zoomFactor: 0.1,
  });
});
api.mapkey("zo", `#${Help.pageNav}zoom out`, () => {
  RUNTIME("setZoom", {
    zoomFactor: -0.1,
  });
});

api.mapkey("gi", `#${Help.mouseClick}go to the first edit box`, () => {
  Hints.create(INPUTABLE, (elem) => Hints.dispatchMouseClick(elem));
});

api.mapkey("i", `#${Help.mouseClick}go to edit box`, function () {
  Hints.create(INPUTABLE, (elem) => Hints.dispatchMouseClick(elem));
});
api.mapkey("I", `#${Help.mouseClick}go to edit box with vim editor`, () =>
  Hints.create(INPUTABLE, (elem) => Front.showEditor(elem))
);

[..."abcdefghijklmnopqrstuvwxyz"].forEach((letter) => {
  api.removeSearchAlias(letter);
});

api.addSearchAlias(
  "g",
  "google",
  google.searchUrl,
  "s",
  google.compUrl,
  google.compFn,
  "o",
  { faviconUrl: google.faviconUrl, skipMaps: true }
);

api.addSearchAlias(
  "y",
  "youtube",
  youtube.searchUrl,
  "s",
  youtube.compUrl,
  youtube.compFn,
  "o",
  { faviconUrl: youtube.faviconUrl, skipMaps: true }
);

api.addSearchAlias(
  "wiki",
  "wikipedia",
  wikipedia.searchUrl,
  "s",
  wikipedia.compUrl,
  wikipedia.compFn,
  "o",
  { faviconUrl: wikipedia.faviconUrl, skipMaps: true }
);

api.addSearchAlias(
  "gh",
  "github",
  github.searchUrl,
  "s",
  github.compUrl,
  github.compFn,
  "o",
  { faviconUrl: github.faviconUrl, skipMaps: true }
);

api.addSearchAlias(
  "i",
  "imdb",
  imdb.searchUrl,
  "s",
  imdb.compUrl,
  imdb.compFn,
  "o",
  { faviconUrl: imdb.faviconUrl, skipMaps: true }
);

api.addSearchAlias("r", "radarr", "https://drake.wi1.xyz/radarr/add/new?term=");
api.addSearchAlias("s", "sonarr", "https://drake.wi1.xyz/sonarr/add/new?term=");
api.addSearchAlias(
  "c",
  "clash of clans wiki",
  "https://clashofclans.fandom.com/wiki/Special:Search?scope=internal&navigationSearch=true&query="
);

api.aceVimMap("kj", "<Esc>", "insert");

settings.hintAlign = "left";
settings.focusFirstCandidate = false;

Hints.style(`
color: #f8f8f2;
background: #282a36;
border: none;
font: bold 10pt "Monaco", "SF Mono", "Lucida Console", monospaced;
`);

Visual.style("cursor", "background: #bd93f9; color: #ff79c6;");

Visual.style("marks", "background: #f1fa8c;");

settings.theme = `
  .sk_theme {
    font: 10pt "Monaco", "SF Mono", "Lucida Console", monospaced;
    color: #f8f8f2;
    background: #282a36;
  }

  /* search engine */
  .sk_theme #sk_omnibarSearchArea .prompt {
    color: #ffb86c;
    font-size: 13pt;
  }

  .sk_theme #sk_omnibarSearchArea .separator {
    color: #f1fa8c;
    font-size: 13pt;
  }

  .sk_theme #sk_omnibarSearchArea input {
    color: #f8f8f2;
    font-size: 13pt;
  }

  /* result count */
  .sk_theme #sk_omnibarSearchArea .resultPage {
    color: #f1fa8c;
    font-size: 10pt;
  }

  .sk_theme #sk_omnibarSearchResult ul li {
    background: #282a36 !important;
  }

  .sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #44475a !important;
  }

  .sk_theme #sk_omnibarSearchResult ul li .url {
    color: #bd93f9;
    font-weight: normal;
  }

  /* matching text */
  .sk_theme #sk_omnibarSearchResult .omnibar_highlight {
    color: #ff79c6;
  }

  .sk_theme #sk_omnibarSearchResult .omnibar_folder {
    color: #ffb86c;
  }

  .sk_theme #sk_omnibarSearchResult .omnibar_timestamp {
    color: #6272a4;
  }

  .sk_theme #sk_omnibarSearchResult .omnibar_visitcount {
    color: #6272a4;
  }

  .sk_theme input#sk_find {
    color: #f8f8f2;
    font-size: 13pt;
  }

  .sk_theme .annotation {
    color: #f8f8f2;
  }

  #sk_status {
    font-size: 13pt;
  }
`;
