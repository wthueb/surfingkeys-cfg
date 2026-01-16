import searchEngines from 'src/search-engines';
import sites from 'src/sites';

import { Help, Keymap } from 'src/models';

import theme from 'src/css/catppuccin-mocha-sky.css';
import { css } from './utils';

const { Normal, Front, Hints, Visual, RUNTIME } = api;

const INPUTABLE =
  'input:not([type=submit]), textarea, *[contenteditable=true], *[role=textbox], select, div.ace_cursor';

api.unmapAllExcept(['?', '/', 'v', 'V', 'n', 'N', 'w', 'cs']);

//api.mapkey("?", `#${Help.help}show usage`, () => Front.showUsage());

//api.mapkey("v", `#${Help.help}enter visual mode`, () => Visual.toggle());

let keymaps: Keymap[] = [
  {
    keys: 'h',
    action: () => Normal.scroll('left'),
    desc: 'left',
    helpClass: Help.scroll,
  },
  {
    keys: 'j',
    action: () => Normal.scroll('down'),
    desc: 'down',
    helpClass: Help.scroll,
  },
  {
    keys: 'k',
    action: () => Normal.scroll('up'),
    desc: 'up',
    helpClass: Help.scroll,
  },
  {
    keys: 'l',
    action: () => Normal.scroll('right'),
    desc: 'right',
    helpClass: Help.scroll,
  },
  {
    keys: '<Ctrl-d>',
    action: () => Normal.scroll('pageDown'),
    desc: 'half page down',
    helpClass: Help.scroll,
  },
  {
    keys: '<Ctrl-u>',
    action: () => Normal.scroll('pageUp'),
    desc: 'half page up',
    helpClass: Help.scroll,
  },
  {
    keys: 'gg',
    action: () => Normal.scroll('top'),
    desc: 'top',
    helpClass: Help.scroll,
  },
  {
    keys: 'G',
    action: () => Normal.scroll('bottom'),
    desc: 'bottom',
    helpClass: Help.scroll,
  },
  {
    keys: 'a',
    action: () => {
      const timeout = 2000;
      Normal.passThrough(timeout);
      Front.showBanner('temporary passthrough enabled', timeout);
    },
    desc: 'temporary passthrough',
    helpClass: Help.help,
  },
  {
    keys: 'p',
    action: () => {
      const timeout = 2000;
      Normal.passThrough(timeout);
      Front.showBanner('temporary passthrough enabled', timeout);
    },
    desc: 'temporary passthrough',
    helpClass: Help.help,
  },
  {
    keys: 'o',
    action: () => Front.openOmnibar({ type: 'URLs', tabbed: false }),
    desc: 'open URL in current tab',
    helpClass: Help.omnibar,
  },
  {
    keys: 'O',
    action: () => Front.openOmnibar({ type: 'URLs', tabbed: true }),
    desc: 'open URL in new tab',
    helpClass: Help.omnibar,
  },
  {
    keys: 'b',
    action: () => Front.openOmnibar({ type: 'Bookmarks', tabbed: false }),
    desc: 'open bookmark in current tab',
    helpClass: Help.omnibar,
  },
  {
    keys: 'B',
    action: () => Front.openOmnibar({ type: 'Bookmarks', tabbed: true }),
    desc: 'open bookmark in new tab',
    helpClass: Help.omnibar,
  },
  {
    keys: 'u',
    action: () => Front.openOmnibar({ type: 'History', tabbed: false }),
    desc: 'open URL from history',
    helpClass: Help.omnibar,
  },
  {
    keys: 'U',
    action: () => Front.openOmnibar({ type: 'History', tabbed: true }),
    desc: 'open URL from history in new tab',
    helpClass: Help.omnibar,
  },
  {
    keys: ':',
    action: () => Front.openOmnibar({ type: 'Commands' }),
    desc: 'open omnibar in command mode',
    helpClass: Help.omnibar,
  },
  {
    keys: 'f',
    action: () => Hints.create('', Hints.dispatchMouseClick, { tabbed: false }),
    desc: 'open link in current tab',
    helpClass: Help.mouseClick,
  },
  {
    keys: 'F',
    action: () =>
      Hints.create('', Hints.dispatchMouseClick, {
        tabbed: true,
        active: true,
      }),
    desc: 'open link in new tab',
    helpClass: Help.mouseClick,
  },
  {
    keys: 'S',
    action: () => history.back(),
    opts: { repeatIgnore: true },
    desc: 'go back in history',
    helpClass: Help.pageNav,
  },
  {
    keys: 'D',
    action: () => history.forward(),
    opts: { repeatIgnore: true },
    desc: 'go forward in history',
    helpClass: Help.pageNav,
  },
  {
    keys: 'r',
    action: () => RUNTIME('reloadTab', { nocache: false }),
    desc: 'reload the page',
    helpClass: Help.pageNav,
  },
  {
    keys: 'x',
    action: () => RUNTIME('closeTab'),
    desc: 'close current tab',
    helpClass: Help.tabs,
  },
  {
    keys: 'X',
    action: () => RUNTIME('openLast'),
    desc: 'restore closed tab',
    helpClass: Help.tabs,
  },
  {
    keys: '>>',
    action: () => RUNTIME('moveTab', { step: 1 }),
    desc: 'move tab to the right',
    helpClass: Help.tabs,
  },
  {
    keys: '<<',
    action: () => RUNTIME('moveTab', { step: -1 }),
    desc: 'move tab to the left',
    helpClass: Help.tabs,
  },
  {
    keys: 'zr',
    action: () => RUNTIME('setZoom', { zoomFactor: 0 }),
    desc: 'zoom reset',
    helpClass: Help.pageNav,
  },
  {
    keys: 'zi',
    action: () => RUNTIME('setZoom', { zoomFactor: 0.1 }),
    desc: 'zoom in',
    helpClass: Help.pageNav,
  },
  {
    keys: 'zo',
    action: () => RUNTIME('setZoom', { zoomFactor: -0.1 }),
    desc: 'zoom out',
    helpClass: Help.pageNav,
  },
  {
    keys: 'gi',
    action: () => Hints.create(INPUTABLE, (elem) => Hints.dispatchMouseClick(elem)),
    desc: 'go to the first edit box',
    helpClass: Help.mouseClick,
  },
  {
    keys: 'i',
    action: () => Hints.create(INPUTABLE, (elem) => Hints.dispatchMouseClick(elem)),
    desc: 'go to edit box',
    helpClass: Help.mouseClick,
  },
  {
    keys: 'I',
    action: () => Hints.create(INPUTABLE, (elem) => Front.showEditor(elem)),
    desc: 'go to edit box with vim editor',
    helpClass: Help.mouseClick,
  },
];

for (const site of sites) {
  keymaps = keymaps.concat(site.keys);
}

for (const keymap of keymaps) {
  const helpClass = keymap.helpClass ?? Help.misc;
  api.mapkey(keymap.keys, `#${helpClass}${keymap.desc}`, keymap.action, keymap.opts);
}

for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
  api.removeSearchAlias(letter);
}

for (const searchEngine of searchEngines) {
  api.addSearchAlias(
    searchEngine.alias,
    searchEngine.name,
    searchEngine.searchUrl,
    's',
    searchEngine.compUrl,
    searchEngine.compFn,
    'o',
    { faviconUrl: searchEngine.faviconUrl, skipMaps: true },
  );
}

api.addSearchAlias(
  'c',
  'clash of clans wiki',
  'https://clashofclans.fandom.com/wiki/Special:Search?scope=internal&navigationSearch=true&query=',
);

api.aceVimMap('kj', '<Esc>', 'insert');

settings.hintAlign = 'left';
settings.focusFirstCandidate = false;

Hints.style(css`
  color: #f8f8f2;
  background: #282a36;
  border: none;
  font-family: 'Source Code Pro', 'Monaco', 'SF Mono', 'Lucida Console', monospaced;
  font-size: 0.8rem;
`);

Visual.style(
  'cursor',
  css`
    background: #bd93f9;
    color: #ff79c6;
  `,
);

Visual.style(
  'marks',
  css`
    background: #f1fa8c;
  `,
);

settings.theme = theme;
