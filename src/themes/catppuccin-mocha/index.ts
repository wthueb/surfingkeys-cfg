import { css } from 'src/utils';

import theme from './theme.css';
import colors from '@catppuccin/palette/css/catppuccin.css';
import styles from 'src/css/styles.css';

const { Hints, Visual } = api;

Hints.style(css`
  color: #1e1e2e;
  background: #89b4fa;
  border-color: #b4befe;
  border-radius: 5px;
  font-family: 'Source Code Pro', 'Monaco', 'SF Mono', 'Lucida Console', monospaced;
  font-size: 12px;
  font-weight: normal;
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
