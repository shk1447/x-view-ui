import type { CSSProperties } from 'react';
import clsx from 'clsx';
import type { CalculatedColumn } from '../Types';
import {
  cellClassname,
  cellFrozenClassname,
  cellFrozenLastClassname,
} from '../Style';

export function getRowStyle(
  rowIdx: number,
  height?: number,
  focused?: boolean,
): CSSProperties {
  let styles = { '--rdg-grid-row-start': rowIdx } as unknown as CSSProperties;

  if (height !== undefined) {
    styles = {
      '--rdg-grid-row-start': rowIdx,
      '--rdg-row-height': `${height}px`,
    } as unknown as CSSProperties;
  }

  return styles;
}

export function getCellStyle<R, SR>(
  column: CalculatedColumn<R, SR>,
  colSpan?: number,
  focused?: boolean,
): React.CSSProperties {
  const styles = {
    padding: column.hide ? 0 : '',
    gridColumnStart: column.idx + 1,
    gridColumnEnd: colSpan !== undefined ? `span ${colSpan}` : undefined,
    insetInlineStart: column.frozen
      ? `var(--rdg-frozen-left-${column.idx})`
      : undefined,
  } as unknown as CSSProperties;

  if (focused) {
    styles['borderTop'] = '1px solid orange';
    styles['borderBottom'] = '1px solid orange';
  }

  return styles;
}

export function getCellClassname<R, SR>(
  column: CalculatedColumn<R, SR>,
  ...extraClasses: Parameters<typeof clsx>
): string {
  return clsx(
    cellClassname,
    {
      [cellFrozenClassname]: column.frozen,
      [cellFrozenLastClassname]: column.isLastFrozenColumn,
    },
    ...extraClasses,
  );
}
