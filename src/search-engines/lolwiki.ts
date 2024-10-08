import { SearchEngine } from 'src/models';
import { searchResult } from 'src/utils';

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

          const markup = searchResult({
            title: suggestion,
            url,
            img: data.images[id]!,
          });

          return { html: markup, props: { url } };
        })
    );
  },
  faviconUrl: 'https://static.wikia.nocookie.net/leagueoflegends/images/4/4a/Site-favicon.ico',
};

export default engine;
