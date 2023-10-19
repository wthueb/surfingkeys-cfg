export function sendKey(key: string) {
    const obj = {
        key,
        keyCode: key.toUpperCase().charCodeAt(0),
        bubbles: true,
    };
    const keydown = new KeyboardEvent('keydown', obj);
    const keyup = new KeyboardEvent('keyup', obj);
    document.body.dispatchEvent(keydown);
    setTimeout(() => document.body.dispatchEvent(keyup), 10);
}
