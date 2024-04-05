import React from 'react';
import type { FormatterProps } from '../../';

export const DefaultFormatter = <R, SR>(props: FormatterProps<R, SR>) => {
  try {
    return <>{props.row[props.column.key as keyof R]}</>;
  } catch {
    return null;
  }
};
