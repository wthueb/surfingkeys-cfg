import { Keymap } from 'src/models';

export default {
    keys: <Keymap[]>[
        {
            keys: 'F',
            action: function () {
                const elem = document.querySelector('.ytp-fullscreen-button') as HTMLElement;
                elem.click();
            },
            desc: 'toggle fullscreen',
        },
    ],
};
