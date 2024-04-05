import React, { memo } from 'react';
import { css } from '@emotion/css';
import { getCellStyle, getCellClassname, isCellEditable } from './Utils';
import type { CellRendererProps } from './Types';
import { useRovingCellRef } from './Hooks';

const cellCopied = css`
  background-color: #ccccff;
`;

const cellCopiedClassname = `rdg-cell-copied ${cellCopied}`;

const cellDraggedOver = css`
  background-color: #ccccff;

  &.${cellCopied} {
    background-color: #9999ff;
  }
`;

const cellDraggedOverClassname = `rdg-cell-dragged-over ${cellDraggedOver}`;

function Cell<R, SR>({
  column,
  colSpan,
  isCellSelected,
  isRowFocused,
  isCopied,
  isDraggedOver,
  row,
  dragHandle,
  onRowClick,
  onRowDoubleClick,
  onRowChange,
  selectCell,
  ...props
}: CellRendererProps<R, SR>) {
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected);

  const { cellClass } = column;

  const className = getCellClassname(
    column,
    {
      [cellCopiedClassname]: isCopied,
      [cellDraggedOverClassname]: isDraggedOver,
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
  );

  function selectCellWrapper(openEditor?: boolean | null) {
    selectCell(row, column, openEditor);
  }

  function handleClick(e: any) {
    selectCellWrapper(column.editorOptions?.editOnClick);
    onRowClick?.(row, column, e);
  }

  function handleContextMenu() {
    selectCellWrapper();
  }

  function handleDoubleClick(e: any) {
    selectCellWrapper(true);
    onRowDoubleClick?.(row, column, e);
  }

  function handleRowChange(newRow: R) {
    onRowChange(column, newRow);
  }

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1} // aria-colindex is 1-based
      aria-selected={isCellSelected}
      aria-colspan={colSpan}
      aria-readonly={!isCellEditable(column, row) || undefined}
      ref={ref}
      tabIndex={tabIndex}
      className={className}
      style={getCellStyle(column, colSpan, isRowFocused)}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onFocus={onFocus}
      {...props}
    >
      {!column.rowGroup && (
        <>
          {column.formatter({
            column,
            row,
            isCellSelected,
            onRowChange: handleRowChange,
          })}
          {dragHandle}
        </>
      )}
    </div>
  );
}

export default memo(Cell) as <R, SR>(
  props: CellRendererProps<R, SR>,
) => JSX.Element;
