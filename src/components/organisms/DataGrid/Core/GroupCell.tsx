import React, { memo } from 'react';
import { getCellStyle, getCellClassname } from './Utils';
import type { CalculatedColumn, GroupRow } from './Types';
import type { GroupRowRendererProps } from './GroupRow';
import { useRovingCellRef } from './Hooks';

type SharedGroupRowRendererProps<R, SR> = Pick<
  GroupRowRendererProps<R, SR>,
  | 'id'
  | 'groupKey'
  | 'childRows'
  | 'selectedChildRows'
  | 'isExpanded'
  | 'toggleGroup'
>;

interface GroupCellProps<R, SR> extends SharedGroupRowRendererProps<R, SR> {
  column: CalculatedColumn<R, SR>;
  row: GroupRow<R>;
  isCellSelected: boolean;
  groupColumnIndex: number;
  indeterminate?: boolean;
}

function GroupCell<R, SR>({
  id,
  groupKey,
  childRows,
  isExpanded,
  isCellSelected,
  column,
  row,
  groupColumnIndex,
  indeterminate,
  toggleGroup: toggleGroupWrapper,
}: GroupCellProps<R, SR>) {
  const { ref, tabIndex, onFocus } = useRovingCellRef(isCellSelected);

  function toggleGroup() {
    toggleGroupWrapper(id);
  }

  // Only make the cell clickable if the group level matches
  const isLevelMatching = column.rowGroup && groupColumnIndex === column.idx;

  return (
    <div
      role="gridcell"
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      ref={ref}
      tabIndex={tabIndex}
      key={column.key}
      className={getCellClassname(column)}
      style={{
        ...getCellStyle(column),
        cursor: isLevelMatching ? 'pointer' : 'default',
      }}
      onClick={isLevelMatching ? toggleGroup : undefined}
      onFocus={onFocus}
    >
      {(!column.rowGroup || groupColumnIndex === column.idx) &&
        column.groupFormatter?.({
          groupKey,
          childRows,
          column,
          row,
          isExpanded,
          isCellSelected,
          indeterminate,
          toggleGroup,
        })}
    </div>
  );
}

export default memo(GroupCell) as <R, SR>(
  props: GroupCellProps<R, SR>,
) => JSX.Element;
