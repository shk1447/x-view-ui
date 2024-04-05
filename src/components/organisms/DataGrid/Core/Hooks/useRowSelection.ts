import { createContext, useContext } from 'react';
import type { CalculatedColumn, SelectRowEvent } from '../Types';

const RowSelectionContext = createContext<boolean | undefined>(undefined);

export const RowSelectionProvider = RowSelectionContext.Provider;

const RowSelectionChangeContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((selectRowEvent: SelectRowEvent<any>) => void) | undefined
>(undefined);

const RowClickContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ((row: any, column: CalculatedColumn<any, any>, e?: any) => void) | undefined
>(undefined);

export const RowClickProvider = RowClickContext.Provider;

export function useRowClick<R>(): [
  (row: R, column: CalculatedColumn<R, any>, e?: any) => void,
] {
  const rowClickContext = useContext(RowClickContext);

  if (rowClickContext === undefined) {
    throw new Error('useRowSelection must be used within DataGrid cells');
  }

  return [rowClickContext];
}

export const RowSelectionChangeProvider = RowSelectionChangeContext.Provider;

export function useRowSelection<R>(): [
  boolean,
  (selectRowEvent: SelectRowEvent<R>) => void,
] {
  const rowSelectionContext = useContext(RowSelectionContext);
  const rowSelectionChangeContext = useContext(RowSelectionChangeContext);

  if (
    rowSelectionContext === undefined ||
    rowSelectionChangeContext === undefined
  ) {
    throw new Error('useRowSelection must be used within DataGrid cells');
  }

  return [rowSelectionContext, rowSelectionChangeContext];
}
