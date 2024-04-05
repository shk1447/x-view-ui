import React, { memo } from 'react';
import clsx from 'clsx';
import { css } from '@emotion/css';
import HeaderCell from './HeaderCell';
import type { CalculatedColumn, Direction } from './Types';
import { getColSpan, getRowStyle } from './Utils';
import type { DataGridProps } from './DataGrid';
import { cell, cellFrozen, rowSelectedClassname } from './Style';

type SharedDataGridProps<R, SR, K extends React.Key> = Pick<
  DataGridProps<R, SR, K>,
  'sortColumns' | 'onSortColumnsChange'
>;

export interface HeaderRowProps<R, SR, K extends React.Key>
  extends SharedDataGridProps<R, SR, K> {
  columns: readonly CalculatedColumn<R, SR>[];
  allRowsSelected: boolean;
  indeterminate?: boolean;
  onAllRowsSelectionChange: (checked: boolean) => void;
  onColumnResize: (
    column: CalculatedColumn<R, SR>,
    width: number | 'max-content',
  ) => void;
  selectCell: (columnIdx: number) => void;
  lastFrozenColumnIndex: number;
  selectedCellIdx: number | undefined;
  shouldFocusGrid: boolean;
  direction: Direction;
}

const headerRow = css`
  display: contents;
  line-height: var(--rdg-header-row-height);
  background-color: var(--rdg-header-background-color);

  color: #191d46;
  font-size: 12px;
  font-weight: 700;
  height: 48px;

  & > .${cell}[role=columnheader] {
    z-index: 4;
    position: sticky;
    inset-block-start: 0;
  }

  & > .${cellFrozen} {
    z-index: 1;
  }
`;

const headerRowClassname = `rdg-header-row ${headerRow}`;

function HeaderRow<R, SR, K extends React.Key>({
  columns,
  allRowsSelected,
  indeterminate,
  onAllRowsSelectionChange,
  onColumnResize,
  sortColumns,
  onSortColumnsChange,
  lastFrozenColumnIndex,
  selectedCellIdx,
  selectCell,
  shouldFocusGrid,
  direction,
}: HeaderRowProps<R, SR, K>) {
  const cells = [];

  for (let index = 0; index < columns.length; index++) {
    const column = columns[index];

    const colSpan = getColSpan(column, lastFrozenColumnIndex, {
      type: 'HEADER',
    });

    if (colSpan !== undefined) {
      index += colSpan - 1;
    }

    cells.push(
      <HeaderCell<R, SR>
        key={column.key}
        column={column}
        colSpan={colSpan}
        isCellSelected={selectedCellIdx === column.idx}
        onColumnResize={onColumnResize}
        allRowsSelected={allRowsSelected}
        indeterminate={indeterminate}
        onAllRowsSelectionChange={onAllRowsSelectionChange}
        onSortColumnsChange={onSortColumnsChange}
        sortColumns={sortColumns}
        selectCell={selectCell}
        shouldFocusGrid={shouldFocusGrid && index === 0}
        direction={direction}
      />,
    );
  }

  return (
    <div
      role="row"
      aria-rowindex={1} // aria-rowindex is 1 based
      className={clsx(headerRowClassname, {
        [rowSelectedClassname]: selectedCellIdx === -1,
      })}
      style={getRowStyle(1)}
    >
      {cells}
    </div>
  );
}

export default memo(HeaderRow) as <R, SR, K extends React.Key>(
  props: HeaderRowProps<R, SR, K>,
) => JSX.Element;
