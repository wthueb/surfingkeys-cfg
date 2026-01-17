import styles from 'src/css/styles.css';
import theme from './theme.css';

import { css } from 'src/utils';

const { Hints, Visual } = api;

Hints.style(css`
  color: #eceff4;
  background: #3b4252;
  border-color: #434c5e;
  border-radius: 0.3rem;
  font-family: 'Source Code Pro', 'Monaco', 'SF Mono', 'Lucida Console', monospaced;
  font-size: 1rem;
`);

Visual.style(
  'cursor',
  css`
    background: #88c0d0;
  `,
);

Visual.style(
  'marks',
  css`
    background: #434c5e;
  `,
);

settings.theme = styles + theme;
