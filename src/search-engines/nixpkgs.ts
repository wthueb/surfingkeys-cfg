import { SearchEngine } from 'src/models';

const engine: SearchEngine = {
  alias: 'nix',
  name: 'nixpkgs',
  searchUrl:
    'https://search.nixos.org/packages?channel=unstable&from=0&size=50&sort=relevance&type=packages&query=%s',
  faviconUrl: 'https://nixos.org/favicon.ico',
};

export default engine;
