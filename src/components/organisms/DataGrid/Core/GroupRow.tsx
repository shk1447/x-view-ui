import React, { memo } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/css';
import {
  cell,
  cellFrozenLast,
  rowClassname,
  rowSelectedClassname,
} from './Style';
import GroupCell from './GroupCell';
import type { CalculatedColumn, Column, GroupRow, Omit } from './Types';
import { RowSelectionProvider } from './Hooks';
import { getRowStyle } from './Utils';
import { SELECT_COLUMN_KEY } from '../Extensions/Columns';

export interface GroupRowRendererProps<R, SR>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style' | 'children'> {
  id: string;
  groupKey: unknown;
  groupByKey: string | undefined;
  viewportColumns: readonly CalculatedColumn<R, SR>[];
  childRows: readonly R[];
  selectedChildRows?: readonly R[];
  rowIdx: number;
  row: GroupRow<R>;
  columns: readonly Column<R, SR>[];
  gridRowStart: number;
  height: number;
  level: number;
  selectedCellIdx: number | undefined;
  isExpanded: boolean;
  isRowSelected: boolean;
  selectGroup: (rowIdx: number) => void;
  toggleGroup: (expandedGroupId: unknown) => void;
}

const groupRow = css`
  &:not([aria-selected='true']) {
    background-color: var(--rdg-header-background-color);
  }

  & > .${cell}:not(:last-child):not(.${cellFrozenLast}) {
    border-inline-end: none;
  }

  & > * {
    border-bottom: 1px solid #e9edf2;
    border-top: 1px solid #e9edf2;
  }
`;

const groupRowClassname = `rdg-group-row ${groupRow}`;

function GroupedRow<R, SR>({
  id,
  groupKey,
  viewportColumns,
  childRows,
  selectedChildRows,
  rowIdx,
  row,
  gridRowStart,
  height,
  level,
  isExpanded,
  selectedCellIdx,
  isRowSelected,
  selectGroup,
  toggleGroup,
  ...props
}: GroupRowRendererProps<R, SR>) {
  // Select is always the first column
  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function handleSelectGroup() {
    selectGroup(rowIdx);
  }

  const indeterminate =
    selectedChildRows &&
    selectedChildRows.length > 0 &&
    selectedChildRows.length < childRows.length;

  return (
    <RowSelectionProvider value={isRowSelected}>
      <div
        role="row"
        aria-level={level}
        aria-expanded={isExpanded}
        className={clsx(
          rowClassname,
          groupRowClassname,
          `rdg-row-${rowIdx % 2 === 0 ? 'even' : 'odd'}`,
          {
            [rowSelectedClassname]: selectedCellIdx === -1,
          },
        )}
        onClick={handleSelectGroup}
        style={getRowStyle(gridRowStart, height)}
        {...props}
      >
        {viewportColumns.map(column => {
          return (
            <GroupCell
              key={column.key}
              id={id}
              groupKey={groupKey}
              childRows={childRows}
              indeterminate={indeterminate}
              isExpanded={isExpanded}
              isCellSelected={selectedCellIdx === column.idx}
              column={column}
              row={row}
              groupColumnIndex={idx}
              toggleGroup={toggleGroup}
            />
          );
        })}
      </div>
    </RowSelectionProvider>
  );
}

const GroupRowComponent = memo(GroupedRow) as <R, SR>(
  props: GroupRowRendererProps<R, SR>,
) => JSX.Element;

export default GroupRowComponent;

export function DefaultGroupRowRenderer<R, SR>(
  key: React.Key,
  props: GroupRowRendererProps<R, SR>,
) {
  return <GroupRowComponent key={key} {...props} />;
}
