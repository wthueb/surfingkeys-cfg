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
