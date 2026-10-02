/**
 * Surfingkeys 1.19.2, upstream revision 79d70e7e18f60dc6580018672a0c8e6eaa27cdc1.
 * https://github.com/brookhong/Surfingkeys/blob/79d70e7e18f60dc6580018672a0c8e6eaa27cdc1/docs/API.md
 * Checked against src/user_scripts/index.js, common/api.js, common/runtime.js,
 * and background/start.js; implementation takes precedence over stale documentation.
 */
/* eslint @typescript-eslint/no-explicit-any: 0 */

export type Keys = string;
export type VimModes = 'normal' | 'insert' | 'visual';
export type AceKeymap = {
  keys: Keys;
  context?: VimModes;
  isEdit?: boolean;
  exitVisualBlock?: boolean;
  interlaceInsertRepeat?: boolean;
} & (
  | { type: 'keyToKey'; toKeys: Keys }
  | { type: 'action'; action: string; actionArgs?: object; motion?: string }
  | { type: 'motion'; motion: string; motionArgs?: object }
  | { type: 'operator'; operator: string; operatorArgs?: object }
  | {
      type: 'operatorMotion';
      operator: string;
      motion: string;
      operatorArgs?: object;
      motionArgs?: object;
      operatorMotionArgs?: object;
    }
  | { type: 'search'; searchArgs?: object }
  | { type: 'ex' | 'idle' }
);

export type SearchSuggestion =
  | string
  | { title: string; url: string }
  | { html: string; props?: Record<string, unknown> };

export type HintOptions = {
  active?: boolean;
  tabbed?: boolean;
  multipleHits?: boolean;
  statusLine?: string;
  mouseEvents?: string[];
};

export type OmnibarItem = { title: string; url: string; [key: string]: unknown };

export type TabQuery = {
  active?: boolean;
  audible?: boolean;
  autoDiscardable?: boolean;
  cookieStoreId?: string;
  currentWindow?: boolean;
  discarded?: boolean;
  groupId?: number;
  highlighted?: boolean;
  index?: number;
  lastFocusedWindow?: boolean;
  muted?: boolean;
  pinned?: boolean;
  status?: 'loading' | 'complete';
  title?: string;
  url?: string | string[];
  windowId?: number;
  windowType?: 'normal' | 'popup' | 'panel' | 'app' | 'devtools';
};

export type KeyMappingOptions = {
  domain?: RegExp;
  repeatIgnore?: boolean;
};

export type DefineKeyMapping = (
  keys: Keys,
  annotation: string,
  callback: (key: string) => void,
  options?: KeyMappingOptions,
) => void;

export type RemapKeyMapping = (
  newKeystroke: Keys,
  oldKeystroke: Keys,
  domain?: RegExp,
  newAnnotation?: string,
) => void;

export type ReadTextOptions = {
  enqueue?: boolean;
  voiceName?: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  gender?: 'male' | 'female';
  extensionId?: string;
  requiredEventTypes?: string[];
  desiredEventTypes?: string[];
  verbose?: boolean;
  onEnd?: () => void;
};

export type TextResponse = { text: string; error?: string };

export type SearchAliasOptions = {
  favicon_url?: string;
  skipMaps?: boolean;
  headers?: Record<string, string>;
};

export type OpenOmnibarOptions = {
  type:
    | 'Bookmarks'
    | 'AddBookmark'
    | 'History'
    | 'URLs'
    | 'RecentlyClosed'
    | 'TabURLs'
    | 'Tabs'
    | 'CloseTabs'
    | 'Containers'
    | 'LLMChat'
    | 'Windows'
    | 'VIMarks'
    | 'SearchEngine'
    | 'Commands'
    | 'OmniQuery'
    | 'UserURLs';
  tabbed?: boolean;
  extra?: any;
  pref?: string;
  style?: string;
  onEnter?: (item: OmnibarItem, ctrlKey: boolean, shiftKey: boolean) => void;
};

export type InlineQueryOptions = {
  url: string | ((query: string) => string);
  parseResult: (result: TextResponse) => string;
  headers?: Record<string, string>;
};

declare global {
  const api: {
    mapkey: DefineKeyMapping;
    vmapkey: DefineKeyMapping;
    imapkey: DefineKeyMapping;
    map: RemapKeyMapping;
    unmap: (keystroke: Keys, domain?: RegExp) => void;
    unmapAllExcept: (keystrokes: Keys[], domain?: RegExp) => void;
    imap: RemapKeyMapping;
    iunmap: (keystroke: Keys, domain?: RegExp) => void;
    cmap: RemapKeyMapping;
    vmap: RemapKeyMapping;
    vunmap: (keystroke: Keys, domain?: RegExp) => void;
    lmap: RemapKeyMapping;
    aceVimMap: (lhs: Keys, rhs: Keys, ctx: VimModes) => void;
    addVimMapKey: (...objects: AceKeymap[]) => void;
    /** Available in the Chrome MV3 user-script API. */
    addCommand: (name: string, description: string, action: (...args: string[]) => void) => void;
    getBrowserName: () => 'Chrome' | 'Firefox' | 'Safari' | 'Safari-iOS';
    readText: (text: string, options?: ReadTextOptions) => void;
    addSearchAlias: (
      alias: string,
      prompt: string,
      searchUrl: string,
      searchLeaderKey?: Keys | null,
      suggestionUrl?: string | null,
      callbackToParseSuggestion?:
        | ((
            response: TextResponse,
            request: { query: string; url: string },
          ) => SearchSuggestion[] | Promise<SearchSuggestion[]>)
        | null,
      onlyThisSiteKey?: Keys | null,
      options?: SearchAliasOptions | null,
    ) => void;
    removeSearchAlias: (
      alias: string,
      searchLeaderKey?: Keys | null,
      onlyThisSiteKey?: Keys | null,
    ) => void;
    searchSelectedWith: (
      se: string,
      onlyThisSite?: boolean,
      interactive?: boolean,
      alias?: string,
    ) => void;
    Clipboard: {
      read: (onReady: (response: { data: string }) => void) => void;
      write: (text: string) => void;
    };
    Hints: {
      setNumeric: () => void;
      setCharacters: (characters: string) => void;
      click: (
        links: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
        force?: boolean,
      ) => void;
      /** The user-script API returns false when an element list is empty. */
      create: {
        (
          cssSelector: string,
          onHintKey: (element: HTMLElement, shiftKey?: boolean) => void,
          attrs?: HintOptions | null,
        ): Promise<number>;
        (
          elements: HTMLElement | HTMLElement[],
          onHintKey: (element: HTMLElement, shiftKey?: boolean) => void,
          attrs?: HintOptions | null,
        ): Promise<number> | false;
        (
          pattern: RegExp,
          onHintKey: (
            match: [node: Text, offset: number, text: string],
            shiftKey?: boolean,
          ) => void,
          attrs?: HintOptions | null,
        ): Promise<number>;
      };
      dispatchMouseClick: (element: HTMLElement) => void;
      style: (css: string, mode?: 'text' | null) => void;
    };
    Normal: {
      passThrough: (timeout?: number) => void;
      scroll: (
        type:
          | 'down'
          | 'up'
          | 'pageDown'
          | 'fullPageDown'
          | 'pageUp'
          | 'fullPageUp'
          | 'top'
          | 'bottom'
          | 'left'
          | 'right'
          | 'leftmost'
          | 'rightmost'
          | 'byRatio',
      ) => void;
      feedkeys: (keys: Keys) => void;
      jumpVIMark: (mark: string) => void;
    };
    Visual: {
      style: (element: 'marks' | 'cursor', style: string) => void;
    };
    Front: {
      showEditor: (
        element: HTMLElement | string,
        onWrite?: (data: string) => void,
        type?: string,
        useNeovim?: boolean,
      ) => void;
      openOmnibar: (args: OpenOmnibarOptions) => void;
      registerInlineQuery: (args: InlineQueryOptions) => void;
      showBanner: (msg: string, timeout?: number) => void;
      showPopup: (msg: string) => void;
    };
    isElementPartiallyInViewport: (el: Element, ignoreSize?: boolean) => boolean;
    getClickableElements: (selectorString: string, pattern?: RegExp) => HTMLElement[];
    tabOpenLink: (str: string, simultaneousness?: number) => void;
    RUNTIME: {
      (action: string, args?: object | null, callback?: (result: any) => void): void;
      repeats: number;
    };
  };

  const settings: {
    /** @default false */
    showModeStatus: boolean;
    /** @default false */
    showProxyInStatusBar: boolean;
    /** @default 1000 */
    richHintsForKeystroke: number;
    /** @default true */
    useLocalMarkdownAPI: boolean;
    /** @default true */
    focusOnSaved: boolean;
    /** @default 10 */
    omnibarMaxResults: number;
    /** @default 100 */
    omnibarHistoryCacheSize: number;
    /** @default "middle" */
    omnibarPosition: 'middle' | 'bottom';
    /** @default true */
    omnibarSuggestion: boolean;
    /** @default 200 */
    omnibarSuggestionTimeout: number;
    /** @default false */
    focusFirstCandidate: boolean;
    /** @default {} */
    omnibarTabsQuery: TabQuery;
    /** @default 100 */
    tabsThreshold: number;
    /** @default true */
    verticalTabs: boolean;
    /** @default false */
    showTabIndices: boolean;
    /** @default "|" */
    tabIndicesSeparator: string;
    /** @default "" */
    clickableSelector: string;
    /** @default /(https?:\/\/|thunder:\/\/|magnet:)\S+/ig */
    clickablePat: RegExp;
    /** @default "div.CodeMirror-scroll,div.ace_content" */
    editableSelector: string;
    /** @default true */
    smoothScroll: boolean;
    /** @default "" */
    modeAfterYank: '' | 'Caret' | 'Normal';
    /** @default 70 */
    scrollStepSize: number;
    /** @default 0 */
    scrollFriction: number;
    /** @default false */
    scrollFallback: boolean;
    /** @default false */
    smartPageBoundary: boolean;
    /** @default /(\b(next)\b)|下页|下一页|后页|下頁|下一頁|後頁|>>|»/i */
    nextLinkRegex: RegExp;
    /** @default /(\b(prev|previous)\b)|上页|上一页|前页|上頁|上一頁|前頁|<<|«/i */
    prevLinkRegex: RegExp;
    /** @default [] */
    pageUrlRegex: RegExp[];
    /** @default /(^[\n\r\s]*\S{3,}|\b\S{4,})/g */
    textAnchorPat: RegExp;
    /** @default "center" */
    hintAlign: 'left' | 'center' | 'right';
    /** @default false */
    hintExplicit: boolean;
    /** @default false */
    hintShiftNonActive: boolean;
    /** @default "g" */
    defaultSearchEngine: string;
    /** @default undefined */
    blocklistPattern: RegExp | undefined;
    /** @default undefined */
    lurkingPattern: RegExp | undefined;
    /**
     * CSS selector, not a regular expression.
     * @default undefined
     */
    disabledOnActiveElementPattern: string | undefined;
    /** @default "right" */
    focusAfterClosed: 'left' | 'right' | 'last';
    /** @default 9 */
    repeatThreshold: number;
    /** @default true */
    tabsMRUOrder: boolean;
    /** @default true */
    historyMUOrder: boolean;
    /** @default "default" */
    newTabPosition: 'left' | 'right' | 'first' | 'last' | 'default';
    /** @default [] */
    interceptedErrors: string[];
    /** @default false */
    enableEmojiInsertion: boolean;
    /** @default 2 */
    startToShowEmoji: number;
    /** @default undefined */
    language: string | undefined;
    /** @default true */
    stealFocusOnLoad: boolean;
    /** @default true */
    enableAutoFocus: boolean;
    /** @default undefined */
    theme: string | undefined;
    /** @default false */
    caseSensitive: boolean;
    /** @default true */
    smartCase: boolean;
    /** @default true */
    cursorAtEndOfInput: boolean;
    /** @default true */
    digitForRepeat: boolean;
    /** @default true */
    editableBodyCare: boolean;
    /** @default ["https://tpc.googlesyndication.com"] */
    ignoredFrameHosts: string[];
    /** @default "vim" */
    aceKeybindings: 'vim' | 'emacs';
    /** @default null */
    caretViewport: [top: number, left: number, bottom: number, right: number] | null;
    /** @default [] */
    mouseSelectToQuery: string[];
    /** @default false */
    autoSpeakOnInlineQuery: boolean;
    /** @default "Daniel" */
    defaultVoice: string;
    /** @default false */
    useNeovim: boolean;
    /** @default false */
    experiment: boolean;
    /** @default "ollama" */
    defaultLLMProvider: string;
    /** @default {} */
    llm: {
      ollama?: { model: string };
      bedrock?: {
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken?: string;
        model: string;
      };
      custom?: Record<string, { serviceUrl: string; apiKey: string; model: string }>;
    };
    /** @default ["read_page", "search_page", "list_page_links"] */
    llmAllowedTools: string[];
    /** @default 5 */
    llmMaxTabs: number;
    /** @default "auto" */
    llmTranslateTarget: string;
  };
}
