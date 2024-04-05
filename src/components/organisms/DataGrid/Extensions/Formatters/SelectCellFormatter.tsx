import React from 'react';
import { useFocusRef } from '../../Core/Hooks/useFocusRef';
import { useDefaultComponents } from '../../Core/DataGridDefaultComponentsProvider';
import type { CheckboxFormatterProps } from '../../Core/Types';

type SharedInputProps = Pick<
  CheckboxFormatterProps,
  'disabled' | 'aria-label' | 'aria-labelledby'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  isCellSelected: boolean;
  value: boolean;
  indeterminate?: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

export const SelectCellFormatter = ({
  value,
  indeterminate,
  isCellSelected,
  disabled,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SelectCellFormatterProps) => {
  const { ref, tabIndex } = useFocusRef<HTMLInputElement>(isCellSelected);
  const checkboxFormatter = useDefaultComponents()!.checkboxFormatter!;

  return (
    <>
      {checkboxFormatter(
        {
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
          tabIndex,
          disabled,
          indeterminate,
          checked: value,
          onChange,
        },
        ref,
      )}
    </>
  );
};
