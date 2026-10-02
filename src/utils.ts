import type { HeldKeymap, KeyboardKey } from 'src/models';

const EDITABLE_INPUT_TYPES = /^(?!button|checkbox|file|hidden|image|radio|reset|submit)/i;

function sendKeyEvent(type: 'keydown' | 'keyup', key: KeyboardKey, repeat = false) {
  const event = {
    ...key,
    bubbles: true,
    cancelable: true,
    composed: true,
    repeat,
    view: window,
  };

  document.body.dispatchEvent(new KeyboardEvent(type, { ...event, which: key.keyCode }));
}

export function sendKey(key: string, code: string, keyCode: number, delayMs: number = 10) {
  const keyboardKey = { key, code, keyCode };

  sendKeyEvent('keydown', keyboardKey);

  setTimeout(() => {
    sendKeyEvent('keyup', keyboardKey);
  }, delayMs);
}

function isEditable(event: KeyboardEvent) {
  return event.composedPath().some((target) => {
    if (!(target instanceof HTMLElement) || target.hasAttribute('disabled')) return false;

    return (
      target.localName === 'textarea' ||
      target.localName === 'select' ||
      target.isContentEditable ||
      target.matches('[role=textbox], div.ace_cursor') ||
      (target instanceof HTMLInputElement && EDITABLE_INPUT_TYPES.test(target.type))
    );
  });
}

export function registerHeldKeymap(keymap: HeldKeymap) {
  const sourceKey = [...keymap.keys];
  if (sourceKey.length !== 1) {
    throw new Error(`Held key mappings require one printable key, received: ${keymap.keys}`);
  }

  const domain = keymap.opts?.domain;
  if (domain && !domain.test(document.location.href) && !domain.test(window.origin)) return;

  // A raw listener needs the source key to pass through Surfingkeys. Removing it
  // here also clears longer mappings that use this key as their trie prefix.
  api.unmap(keymap.keys, domain);

  let heldCode: string | undefined;

  const release = () => {
    if (heldCode === undefined) return;

    heldCode = undefined;
    sendKeyEvent('keyup', keymap.hold);
  };

  window.addEventListener(
    'keydown',
    (event) => {
      if (!event.isTrusted || Reflect.get(event, 'sk_suppressed') === true) return;

      const isContinuingHold = heldCode !== undefined && event.code === heldCode;
      if (
        !isContinuingHold &&
        (event.key !== sourceKey[0] ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.isComposing ||
          isEditable(event))
      ) {
        return;
      }

      if (heldCode === undefined) heldCode = event.code;

      event.preventDefault();
      event.stopImmediatePropagation();
      sendKeyEvent('keydown', keymap.hold, event.repeat || isContinuingHold);
    },
    true,
  );

  window.addEventListener(
    'keyup',
    (event) => {
      if (!event.isTrusted || heldCode === undefined || event.code !== heldCode) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      release();
    },
    true,
  );

  window.addEventListener('blur', release, true);
}

export function html(strings: TemplateStringsArray, ...values: string[]) {
  return String.raw({ raw: strings }, ...values);
}

export function searchResult(
  params: {
    title: string;
    description?: string;
    url: string;
    timestamp?: string;
  } & (
    | {
        img?: string;
      }
    | {
        imgHtml: string;
      }
  ),
) {
  const img =
    'imgHtml' in params
      ? params.imgHtml
      : params.img
        ? html`<img class="thumb" alt="thumbnail" src="${params.img}" />`
        : '';

  const description = params.description ? html`<div>${params.description}</div>` : '';

  const url = params.timestamp
    ? html`<div class="url">
        <div>${params.url}</div>
        <span class="omnibar_timestamp"># ${params.timestamp}</div>
      </div>`
    : html`<div class="url">${params.url}</div>`;

  const markup = html` <div class="result">
    ${img}
    <div>
      <div class="title">${params.title}</div>
      <div>${description} ${url}</div>
    </div>
  </div>`;

  return markup;
}

export function css(strings: TemplateStringsArray, ...values: string[]) {
  return String.raw({ raw: strings }, ...values);
}
