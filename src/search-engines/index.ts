import github from './github';
import google from './google';
import imdb from './imdb';
import lolwiki from './lolwiki';
import nixpkgs from './nixpkgs';
import overseerr from './overseerr';
import plex from './plex';
import translate from './translate';
import wikipedia from './wikipedia';
import youtube from './youtube';

export default [
  github,
  google,
  imdb,
  lolwiki,
  nixpkgs,
  plex.radarr,
  plex.radarr4k,
  plex.sonarr,
  plex.sonarr4k,
  overseerr,
  translate,
  wikipedia,
  youtube,
];
