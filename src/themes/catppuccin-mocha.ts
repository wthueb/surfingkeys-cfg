import colors from '@catppuccin/palette/css/catppuccin.css';
import theme from 'src/css/catppuccin-mocha.css';
import styles from 'src/css/styles.css';

import { css } from 'src/utils';

const { Hints, Visual } = api;

Hints.style(css`
  color: #cdd6f4;
  background: #313244;
  border-color: #6c7086;
  border-radius: 0.3rem;
  font-family: 'Source Code Pro', 'Monaco', 'SF Mono', 'Lucida Console', monospaced;
  font-size: 1rem;
`);

Visual.style(
  'cursor',
  css`
    background: #f5e0dc;
  `,
);

Visual.style(
  'marks',
  css`
    background: #94e2d5;
  `,
);

settings.theme = styles + colors + theme;
