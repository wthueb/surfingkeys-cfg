import { SearchEngine } from 'src/models';

type CompResult = {
    query: string;
    suggestions: string[];
    ids: Record<CompResult['suggestions'][number], number>;
    images: Record<CompResult['ids'][string], string | null>;
};

const engine: SearchEngine = {
    alias: 'lol',
    name: 'league of legends wiki',
    searchUrl: 'https://leagueoflegends.fandom.com/wiki/Special:Search?scope=internal&query=%s',
    compUrl:
        'https://leagueoflegends.fandom.com/wikia.php?controller=UnifiedSearchSuggestions&method=getSuggestions&format=json&scope=internal&query=%s',
    compFn: (res) => {
        const data = JSON.parse(res.text) as CompResult;
        return (
            data.suggestions
                // put suggestions with /LoL first since that's what we care about
                .sort((a, b) => (a.endsWith('/LoL') ? -1 : b.endsWith('/LoL') ? 1 : 0))
                .map((suggestion) => {
                    const id = data.ids[suggestion];
                    const serialized = suggestion.replace(/ /g, '_');
                    const url = `https://leagueoflegends.fandom.com/wiki/${serialized}`;

                    const html = `
                        <div style="display: flex; flex-direction: row">
                            <img
                                style="max-width: 160px; height: 90px; margin-right: 0.8em"
                                alt="thumbnail"
                                src="${data.images[id]}">
                            <div>
                                <div class="title">${suggestion}</div>
                                <div>
                                    <div class="url">${url}</div>
                                </div>
                            </div>
                        </div>`;

                    return { html, props: { url } };
                })
        );
    },
    faviconUrl: 'https://static.wikia.nocookie.net/leagueoflegends/images/4/4a/Site-favicon.ico',
};

export default engine;
