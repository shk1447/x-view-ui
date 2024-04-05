import React from 'react';
import { css } from '@emotion/css';
import { ReactComponent as Plus } from './Assets/Plus.svg';
import { ReactComponent as Minus } from './Assets/Minus.svg';
import { useFocusRef } from '../../';

const cellExpandClassname = css`
  /* needed on chrome */
  float: left;
  display: table;
  block-size: 100%;

  > span {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
  }
`;

interface CellExpanderFormatterProps {
  isCellSelected: boolean;
  expanded: boolean;
  onCellExpand: () => void;
}

export const CellExpanderFormatter = ({
  isCellSelected,
  expanded,
  onCellExpand,
}: CellExpanderFormatterProps) => {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onCellExpand();
    }
  }

  return (
    <div className={cellExpandClassname}>
      <span onClick={onCellExpand} onKeyDown={handleKeyDown}>
        <span ref={ref} tabIndex={tabIndex}>
          {expanded ? <Minus /> : <Plus />}
        </span>
      </span>
    </div>
  );
};
