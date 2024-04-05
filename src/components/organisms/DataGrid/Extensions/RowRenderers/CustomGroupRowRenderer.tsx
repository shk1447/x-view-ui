import React from 'react';
import clsx from 'clsx';
import { css } from '@emotion/css';
import GroupCell from '@vases-ui/organisms/DataGrid/Core/GroupCell';
import { Typography } from '@vases-ui/atoms';
import { GroupRowRendererProps } from '../../Core/GroupRow';
import { RowSelectionProvider } from '../../Core/Hooks';
import { SELECT_COLUMN_KEY } from '../Columns';
import {
  cell,
  cellClassname,
  cellFrozenLast,
  rowClassname,
  rowSelectedClassname,
} from '../../Core/Style';
import { getRowStyle } from '../../Core/Utils';
import { ReactComponent as ArrowIcon } from '../../Assets/Arrow.svg';

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
    cursor: pointer;
  }
`;

const groupRowClassname = `rdg-group-row ${groupRow}`;

export const CustomGroupRow = <R, SR>(
  _props: React.PropsWithChildren<GroupRowRendererProps<R, SR>>,
) => {
  const {
    id,
    groupKey,
    viewportColumns,
    childRows,
    selectedChildRows,
    rowIdx,
    row,
    columns,
    gridRowStart,
    height,
    level,
    isExpanded,
    selectedCellIdx,
    isRowSelected,
    groupByKey,
    selectGroup,
    toggleGroup,
    ...props
  } = _props;

  const idx = viewportColumns[0].key === SELECT_COLUMN_KEY ? level + 1 : level;

  function handleSelectGroup() {
    selectGroup(rowIdx);
    toggleGroup(groupKey);
  }

  const selectColumn = viewportColumns.find(
    column => column.key == SELECT_COLUMN_KEY,
  );

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
        style={{
          ...getRowStyle(gridRowStart, height),
        }}
        {...props}
      >
        {selectColumn ? (
          <GroupCell
            column={selectColumn}
            row={row}
            isCellSelected={selectedCellIdx === selectColumn.idx}
            groupColumnIndex={selectColumn.idx}
            id={id}
            indeterminate={indeterminate}
            groupKey={undefined}
            childRows={childRows}
            isExpanded={isExpanded}
            toggleGroup={toggleGroup}
          />
        ) : (
          <></>
        )}

        <div
          role="gridcell"
          style={{
            gridColumnStart: selectColumn ? 2 : 1,
            gridColumnEnd: columns.length + 1,
          }}
          aria-colindex={1}
          className={clsx(cellClassname)}
          onClick={handleSelectGroup}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              gap: '8px',
            }}
          >
            <Typography variant="bol14" color="#7D7F86">
              {props.children ? (
                React.Children.map(props.children, child => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(
                      child,
                      Object.assign(_props, child.props) as any,
                    );
                  }

                  return child;
                })
              ) : (
                <>
                  {groupKey} ({childRows.length})
                </>
              )}
            </Typography>

            <ArrowIcon
              style={{
                width: '24px',
                height: '24px',
                transform: `rotate(${isExpanded ? '0deg' : '-180deg'})`,
                transition: '0.3s ease all',
              }}
            />
          </div>
        </div>
      </div>
    </RowSelectionProvider>
  );
};

export const CustomGroupRowRenderer = <R, SR>(
  key: React.Key,
  props: GroupRowRendererProps<R, SR>,
) => {
  return <CustomGroupRow key={key} {...props} />;
};
