import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import clsx from 'clsx';
import { css } from '@emotion/css';
import Row from './DefaultRowRenderer';
import type { RowRendererProps } from '../../';

const rowDraggingClassname = css`
  opacity: 0.5;
`;

const rowOverClassname = css`
  background-color: #ececec;
`;

interface DraggableRowRenderProps<R, SR> extends RowRendererProps<R, SR> {
  onRowReorder: (sourceIndex: number, targetIndex: number) => void;
}

export const DraggableRowRenderer = <R, SR>({
  rowIdx,
  isRowSelected,
  className,
  onRowReorder,
  ...props
}: DraggableRowRenderProps<R, SR>) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ROW_DRAG',
    item: { index: rowIdx },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'ROW_DRAG',
    drop({ index }: { index: number }) {
      onRowReorder(index, rowIdx);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  className = clsx(className, {
    [rowDraggingClassname]: isDragging,
    [rowOverClassname]: isOver,
  });

  return (
    <Row
      ref={ref => {
        if (ref) {
          drag(ref.firstElementChild);
        }

        drop(ref);
      }}
      rowIdx={rowIdx}
      isRowSelected={isRowSelected}
      className={className}
      {...props}
    />
  );
};
