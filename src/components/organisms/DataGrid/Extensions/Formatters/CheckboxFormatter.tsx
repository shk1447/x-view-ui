import React from 'react';
import clsx from 'clsx';
import { css } from '@emotion/css';
import Checkbox from '@vases-ui/atoms/Checkbox';
import type { CheckboxFormatterProps } from '../../';

const checkboxLabel = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  margin-inline-end: 1px; /* align checkbox in row group cell */
`;

const checkboxLabelClassname = `rdg-checkbox-label ${checkboxLabel}`;

const checkbox = css``;

const checkboxLabelDisabled = css`
  cursor: default;

  & .${checkbox} {
    border-color: var(--rdg-checkbox-disabled-border-color);
    background-color: var(--rdg-checkbox-disabled-background-color);
  }
`;

const checkboxLabelDisabledClassname = `rdg-checkbox-label-disabled ${checkboxLabelDisabled}`;

export const CheckboxFormatter = (
  { onChange, ...props }: CheckboxFormatterProps,
  ref: React.RefObject<HTMLInputElement>,
) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return (
    <div
      className={clsx(checkboxLabelClassname, {
        [checkboxLabelDisabledClassname]: props.disabled,
      })}
    >
      <Checkbox {...props} onChange={handleChange} />
    </div>
  );
};
