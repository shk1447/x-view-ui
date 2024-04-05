import React from 'react';
import { css } from '@emotion/css';
import { useFocusRef } from '../../Core/Hooks';
import type { HeaderRendererProps } from '../../Core/Types';
import { useDefaultComponents } from '../../Core/DataGridDefaultComponentsProvider';
import { ReactComponent as SortIcon } from '../../Assets/Sort.svg';

const headerSortCell = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:focus {
    outline: none;
  }
`;

const headerSortCellClassname = `rdg-header-sort-cell ${headerSortCell}`;

const headerSortName = css`
  overflow: hidden;
  overflow: clip;
  text-overflow: ellipsis;
`;

const headerSortNameClassname = `rdg-header-sort-name ${headerSortName}`;

type SharedHeaderCellProps<R, SR> = Pick<
  HeaderRendererProps<R, SR>,
  'sortDirection' | 'onSort' | 'priority' | 'isCellSelected'
>;

interface SortableHeaderCellProps<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: React.ReactNode;
}

function SortableHeaderCell<R, SR>({
  onSort,
  sortDirection,
  priority,
  children,
  isCellSelected,
}: SortableHeaderCellProps<R, SR>) {
  const sortStatus = useDefaultComponents<R, SR>()!.sortStatus!;
  const { ref, tabIndex } = useFocusRef<HTMLSpanElement>(isCellSelected);

  function handleKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === ' ' || event.key === 'Enter') {
      // stop propagation to prevent scrolling
      event.preventDefault();
      onSort(event.ctrlKey || event.metaKey);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLSpanElement>) {
    onSort(event.ctrlKey || event.metaKey);
  }

  return (
    <span
      ref={ref}
      tabIndex={tabIndex}
      className={headerSortCellClassname}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={headerSortNameClassname}>{children}</span>

      {sortDirection ? (
        <SortIcon
          style={{
            transform: sortDirection == 'ASC' ? 'rotate(180deg)' : '',
          }}
        />
      ) : (
        <></>
      )}
    </span>
  );
}

export const DefaultHeaderRenderer = <R, SR>({
  column,
  sortDirection,
  priority,
  onSort,
  isCellSelected,
}: HeaderRendererProps<R, SR>) => {
  if (!column.sortable) return <>{column.name}</>;

  return (
    <SortableHeaderCell
      onSort={onSort}
      sortDirection={sortDirection}
      priority={priority}
      isCellSelected={isCellSelected}
    >
      {column.name}
    </SortableHeaderCell>
  );
};
