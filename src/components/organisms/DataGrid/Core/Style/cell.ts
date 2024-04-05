import { css } from '@emotion/css';

export const cell = css`
  contain: style;
  position: relative; /* needed for absolute positioning to work */
  padding-block: 0;
  padding-inline: 8px;
  grid-row-start: var(--rdg-grid-row-start);
  background-color: inherit;

  white-space: nowrap;
  overflow: hidden;
  overflow: clip;
  text-overflow: ellipsis;
  outline: none;

  /*
  &[aria-selected='true'] {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
  */
  &[role='columnheader'] {
    border-block-end: 1px solid var(--rdg-border-color);
  }
`;

export const cellClassname = `rdg-cell ${cell}`;

export const cellFrozen = css`
  position: sticky;
  /* Should have a higher value than 0 to show up above unfrozen cells */
  &[role='columnheader'] {
    z-index: 111 !important;
  }
  z-index: 1;
`;

export const cellFrozenClassname = `rdg-cell-frozen ${cellFrozen}`;

export const cellFrozenLast = css`
  border-right: 1px solid var(--rdg-border-color);
  box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
`;

export const cellFrozenLastClassname = `rdg-cell-frozen-last ${cellFrozenLast}`;
