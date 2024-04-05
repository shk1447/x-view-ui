import React from 'react';
import { css } from '@emotion/css';
import { grey } from '@vases-ui/theme/colors';
import { useFocusRef } from '../..';

const childRowActionCrossClassname = css`
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: ${grey[60]};
  }

  &::before {
    inset-inline-start: 14px;
    inline-size: 1px;
    block-size: 100%;
  }

  &::after {
    inset-block-start: 50%;
    inset-inline-start: 14px;
    block-size: 1px;
    inline-size: 8px;
  }
`;

const childRowButtonClassname = css`
  cursor: pointer;
  position: absolute;
  inset-inline-start: 21px;
  transform: translateX(-50%);
  filter: grayscale(1);
  &:dir(rtl) {
    transform: translateX(50%);
  }
`;

export const ChildRowFormatter = () => {
  return <div className={childRowActionCrossClassname} />;
};

interface ChildRowDeleteButtonProps {
  isCellSelected: boolean;
  isDeleteSubRowEnabled: boolean;
  onDeleteSubRow: () => void;
}

export const ChildRowDeleteFormatter = ({
  isCellSelected,
  onDeleteSubRow,
  isDeleteSubRowEnabled,
}: ChildRowDeleteButtonProps) => {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      onDeleteSubRow();
    }
  }

  return (
    <>
      <div className={childRowActionCrossClassname} />
      {isDeleteSubRowEnabled && (
        <div className={childRowButtonClassname} onClick={onDeleteSubRow}>
          <span ref={ref} tabIndex={tabIndex} onKeyDown={handleKeyDown}>
            ❌
          </span>
        </div>
      )}
    </>
  );
};
