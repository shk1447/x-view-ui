import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { HeaderRendererProps } from '../../';
import { DefaultHeaderRenderer } from '.';

interface DraggableHeaderRendererProps<R, SR>
  extends HeaderRendererProps<R, SR> {
  onColumnsReorder: (sourceKey: string, targetKey: string) => void;
}

export const DraggableHeaderRenderer = <R, SR>({
  onColumnsReorder,
  column,
  ...props
}: DraggableHeaderRendererProps<R, SR>) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN_DRAG',
    item: { key: column.key },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'COLUMN_DRAG',
    drop({ key }: { key: string }) {
      onColumnsReorder(key, column.key);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={ref => {
        drag(ref);
        drop(ref);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isOver ? '#ececec' : undefined,
        cursor: 'move',
      }}
    >
      {DefaultHeaderRenderer({ column, ...props })}
    </div>
  );
};
