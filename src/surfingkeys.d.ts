/* eslint @typescript-eslint/no-explicit-any: 0 */

type Keys = string;
type VimModes = 'normal' | 'insert' | 'visual';
type AceKeymap =
    | { keys: Keys; type: 'keyToKey'; toKeys: Keys; context?: VimModes }
    | {
          keys: Keys;
          type: 'action';
          action: string;
          context?: VimModes;
          isEdit?: boolean;
          actionArgs?: object;
      };

declare const api: {
    mapkey: (
        keys: Keys,
        annotation: string,
        jscode: (() => void) | ((key: string) => void),
        options?: { domain?: RegExp; repeatIgnore?: boolean },
    ) => void;
    vmapkey: (
        keys: Keys,
        annotation: string,
        jscode: (() => void) | ((key: string) => void),
        options?: { domain?: RegExp; repeatIgnore?: boolean },
    ) => void;
    imapkey: (
        keys: Keys,
        annotation: string,
        jscode: (() => void) | ((key: string) => void),
        options?: { domain?: RegExp; repeatIgnore?: boolean },
    ) => void;
    map: (newKeystroke: Keys, oldKeystroke: Keys, domain?: RegExp, newAnnotation?: string) => void;
    unmap: (keystroke: Keys, domain?: RegExp) => void;
    unmapAllExcept: (keystrokes: Keys[], domain?: RegExp) => void;
    imap: (newKeystroke: Keys, oldKeystroke: Keys, domain?: RegExp, newAnnotation?: string) => void;
    iunmap: (keystroke: Keys, domain?: RegExp) => void;
    cmap: (newKeystroke: Keys, oldKeystroke: Keys, domain?: RegExp, newAnnotation?: string) => void;
    vmap: (newKeystroke: Keys, oldKeystroke: Keys, domain?: RegExp, newAnnotation?: string) => void;
    vunmap: (keystroke: Keys, domain?: RegExp) => void;
    lmap: (newKeystroke: Keys, oldKeystroke: Keys, domain?: RegExp, newAnnotation?: string) => void;
    aceVimMap: (lhs: Keys, rhs: Keys, ctx: VimModes) => void;
    addVimMapKey: (...objects: AceKeymap) => void;
    addSearchAlias: (
        alias: string,
        prompt: string,
        searchUrl: string,
        searchLeaderKey: Keys = 's',
        suggestionUrl?: string,
        callbackToParseSuggestion?: (
            response: { text: string },
            request: { query: string; url: string },
        ) => void,
        onlyThisSiteKey: Keys = 'o',
        options?: { faviconUrl: string; skipMaps: boolean },
    ) => void;
    removeSearchAlias: (
        alias: string,
        searchLeaderKey: Keys = 's',
        onlyThisSiteKey: Keys = 'o',
    ) => void;
    searchSelectedWith: (
        se: string,
        onlyThisSite: boolean = false,
        interactive: boolean = false,
        alias: string = '',
    ) => void;
    Clipboard: {
        read: (onReady: (response: string) => void) => void;
        write: (text: string) => void;
    };
    Hints: {
        setNumeric: () => void;
        setCharacters: (characters: string) => void;
        click: (links: string | HTMLElement[], force: boolean = false) => void;
        create: (
            cssSelector: string | HTMLElement[],
            onHintKey: (element: HTMLElement) => void,
            attrs?: {
                active?: boolean;
                tabbed?: boolean;
                multipleHits?: boolean;
            },
        ) => boolean;
        dispatchMouseClick: (element: HTMLElement) => void;
        style: (css: string, mode?: 'text') => void;
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
            useNeovim: boolean = false,
        ) => void;
        openOmnibar: (
            args: {
                type:
                    | 'Bookmarks'
                    | 'AddBookmark'
                    | 'History'
                    | 'URLs'
                    | 'RecentlyClosed'
                    | 'TabURLs'
                    | 'Tabs'
                    | 'Windows'
                    | 'VIMarks'
                    | 'SearchEngine'
                    | 'Commands'
                    | 'OmniQuery'
                    | 'UserURLs';
                tabbed?: boolean;
            },
            extra?: any,
        ) => void;
        registerInlineQuery: (args: {
            url: string | (() => string);
            parseResult: (result: any) => string;
            headers?: object;
        }) => void;
        getBrowserName: () => 'Chrome' | 'Firefox' | 'Safari';
        showBanner: (msg: string, timeout: number = 1600) => void;
        showPopup: (msg: string) => void;
    };
    isElementPartiallyInViewport: (el: Element, ignoreSize: boolean = false) => boolean;
    getClickableElements: (selectorString: string, pattern: RegExp) => Element[];
    tabOpenLink: (str: string, simultaneousness: number = 5) => void;
    insertJS: (code: (() => void) | string, onload: () => void) => void;
    RUNTIME: (action: string, args?: object, callback?: (result: any) => void) => void;
};

declare const settings: {
    // default false
    showModeStatus: boolean;
    // default false
    showProxyInStatusBar: boolean;
    // default 500
    richHintsForKeystroke: number;
    // default true
    useLocalMarkdownAPI: boolean;
    // default true
    focusOnSaved: boolean;
    // default 10
    omnibarMaxResults: number;
    // default 100
    omnibarHistoryCacheSize: number;
    // default "middle"
    omnibarPosition: 'middle' | 'bottom';
    // default false
    omnibarSuggestion: boolean;
    // default 200
    omnibarSuggestionTimeout: number;
    // default false
    focusFirstCandidate: boolean;
    // default 100
    tabsThreshold: number;
    // default ""
    clickableSelector: string;
    // default /(https?|thunder|magnet)://S+/ig)
    clickablePat: RegExp;
    // default "div.CodeMirror-scroll,div.ace_content"
    editableSelector: string;
    // default true
    smoothScroll: boolean;
    // default ""
    modeAfterYank: '' | 'Caret' | 'Normal';
    // default 70
    scrollStepSize: number;
    // default 0
    scrollFriction: number;
    // default /((>>|next)+)/i
    nextLinkRegex: RegExp;
    // default /((<<|prev(ious)?)+)/i
    prevLinkRegex: RegExp;
    // default "center"
    hintAlign: 'left' | 'center' | 'right';
    // default false
    hintExplicit: boolean;
    // default false
    hintShiftNonActive: boolean;
    // default "g"
    defaultSearchEngine: string;
    // default undefined
    blocklistPattern: RegExp;
    // default "right"
    focusAfterClosed: 'left' | 'right' | 'last';
    // default 99
    repeatThreshold: number;
    // default true
    tabsMRUOrder: boolean;
    // default true
    historyMUOrder: boolean;
    // default "default"
    newTabPosition: 'left' | 'right' | 'first' | 'last' | 'default';
    // default []
    interceptedErrors: string[];
    // default false
    enableEmojiInsertion: boolean;
    // default 2
    startToShowEmoji: number;
    // default undefined
    language: string;
    // default true
    stealFocusOnLoad: boolean;
    // default true
    enableAutoFocus: boolean;
    // default undefined
    theme: string;
    // default false
    caseSensitive: boolean;
    // default true
    smartCase: boolean;
    // default true
    cursorAtEndOfInput: boolean;
    // default true
    digitForRepeat: boolean;
    // default true
    editableBodyCare: boolean;
    // default ["https://tpc.googlesyndication.com"]
    ignoredFrameHosts: string[];
    // default "vim"
    aceKeybindings: 'vim' | 'emacs';
    // default null
    caretViewport: [number, number, number, number];
    // default []
    mouseSelectToQuery: any[];
    // default false
    autoSpeakOnInlineQuery: boolean;
};
