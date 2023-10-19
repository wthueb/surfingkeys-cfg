// https://github.com/brookhong/Surfingkeys/blob/master/src/content_scripts/ui/frontend.js#L280
export enum Help {
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

export interface Keymap {
  keys: Keys;
  action: () => void;
  desc: string;
  opts?: Parameters<typeof api.mapkey>[3];
  helpClass?: Help;
}
