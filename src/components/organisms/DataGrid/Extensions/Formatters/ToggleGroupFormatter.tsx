import React from 'react';
import { css } from '@emotion/css';
import Typography from '@vases-ui/atoms/Typography';
import type { GroupFormatterProps } from '../../Core/Types';
import { useFocusRef } from '../../Core/Hooks/useFocusRef';
import { ReactComponent as ArrowIcon } from '../../Assets/Arrow.svg';

const groupCellContent = css`
  outline: none;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 8px;
`;

const groupCellContentClassname = `rdg-group-cell-content ${groupCellContent}`;

const caret = css`
  margin-inline-start: 4px;
  stroke: currentColor;
  stroke-width: 1.5px;
  fill: transparent;
  vertical-align: middle;

  & > path {
    transition: d 0.1s;
  }
`;

const caretClassname = `rdg-caret ${caret}`;

function ToggleGroup<R, SR>({
  groupKey,
  isExpanded,
  isCellSelected,
  childRows,
  toggleGroup,
}: GroupFormatterProps<R, SR>) {
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown({ key }: React.KeyboardEvent<HTMLSpanElement>) {
    if (key === 'Enter') {
      toggleGroup();
    }
  }

  return (
    <span
      ref={ref}
      className={groupCellContentClassname}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
    >
      <Typography variant="bol14" color="#7D7F86">
        <>
          {groupKey} ({childRows.length})
        </>
      </Typography>

      <ArrowIcon
        style={{
          width: '24px',
          height: '24px',
          transform: `rotate(${isExpanded ? '0deg' : '-180deg'})`,
          transition: '0.3s ease all',
        }}
      />
      {/* {groupKey as string} */}
      {/* <svg
        viewBox="0 0 14 8"
        width="14"
        height="8"
        className={caretClassname}
        aria-hidden
      >
        <path d={d} />
      </svg> */}
    </span>
  );
}

export const ToggleGroupFormatter = <R, SR>(
  props: GroupFormatterProps<R, SR>,
) => {
  return <ToggleGroup {...props} />;
};
