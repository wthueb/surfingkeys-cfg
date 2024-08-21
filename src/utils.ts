export function sendKey(key: string, code: string, keydownCode: number, keypressCode: number) {
  const event: KeyboardEventInit = {
    key,
    code,
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
  };

  const delay = 10; // ms

  const keydownEvent = { ...event, keyCode: keydownCode, which: keydownCode };

  const keydown = new KeyboardEvent('keydown', keydownEvent);
  document.body.dispatchEvent(keydown);

  setTimeout(() => {
    const keypress = new KeyboardEvent('keypress', {
      ...event,
      keyCode: keypressCode,
      charCode: keypressCode,
      which: keypressCode,
    });
    document.body.dispatchEvent(keypress);

    setTimeout(() => {
      const keyup = new KeyboardEvent('keyup', keydownEvent);
      document.body.dispatchEvent(keyup);
    }, delay);
  }, delay);
}

export function html(strings: TemplateStringsArray, ...values: string[]) {
  return String.raw({ raw: strings }, ...values);
}

export function searchResult(params: {
  title: string;
  description?: string;
  url: string;
  img?: string;
  timestamp?: string;
}) {
  const img = params.img ? html`<img class="thumb" alt="thumbnail" src="${params.img}" />` : '';
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
