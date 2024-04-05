import styled from '@emotion/styled';
import {
  Box,
  css,
  MenuItem,
  Paper,
  InputAdornment,
  Divider,
} from '@mui/material';
import { useFormControl } from '@mui/material/FormControl';
import useAutocomplete, {
  createFilterOptions,
} from '@mui/material/useAutocomplete';
import { Typography } from '@vases-ui/atoms';
import { grey, primary, state } from '@vases-ui/theme/colors';
import React, { useState, useMemo, useEffect } from 'react';
import TextField from './TextField';
import { ReactComponent as Add } from '../Assets/Add.svg';
import { ReactComponent as ArrowUpNobar } from '../Assets/ArrowUpNobar.svg';
import { ReactComponent as ArrowDownNobar } from '../Assets/ArrowDownNobar.svg';

const Listbox = styled('ul')(({ theme }) => ({
  width: '100%',
  position: 'absolute',
  margin: 0,
  marginTop: '2px',
  boxSizing: 'border-box',
  borderRadius: 4,
  listStyle: 'none',
  backgroundColor: (theme as any).palette.mode === 'light' ? '#fff' : '#000',
  overflow: 'auto',
  maxHeight: 144,
  display: 'grid',
  flexDirection: 'column',
  padding: '4px 0px',
  gap: '4px',
  zIndex: 2,

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  border: '1px solid rgba(0,0,0,.25)',
  '& li.Mui-focused': {
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    color: 'white',
  },
  '& li': {
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '8px 16px 8px 6px',
    '& .MuiTypography-root': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '&:before': {
      display: 'block',
      width: 24,
      height: 24,
      backgroundImage: '',
      content: '""',
      paddingRight: '4px',
      transform: 'translate(0, 1px)',
    },
  },

  "& li[aria-selected='true']": {
    backgroundColor: '#EBF2FB',
    '&:before': {
      backgroundImage: `${`url(
        "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.40951 11.5901L5.99951 13.0001L9.99951 17.0001L17.9995 9.00008L16.5895 7.58008L9.99951 14.1701L7.40951 11.5901Z' fill='%235457D8'/%3E%3C/svg%3E%0A"
      )`}`,
    },
  },
}));

const AddBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '4px',
  padding: '8px, 12px, 8px, 40px',
  alignItems: 'center',
}));

export interface OptionProps {
  title: React.ReactNode;
  value: any;
  // 새로 추가된 옵션인지 property
  addNew?: boolean;
  disabled?: boolean;
  renderOption?: React.ReactNode;
}

export interface AutoCompleteProps {
  options: OptionProps[];
  selectedItem: OptionProps | undefined;
  addOption?: boolean;
  onChange?: (value: any) => void;
  onAddItem?: (value: any) => void;
  style?: React.CSSProperties | undefined;
}

const filter = createFilterOptions<any>();

const emptyOption: OptionProps = {
  title: '',
  value: '',
  disabled: true,
};

const Autocomplete = (props: AutoCompleteProps) => {
  const {
    addOption = true,
    options,
    selectedItem,
    onAddItem,
    onChange,
    style,
  } = props;

  const [value, setValue] = useState<OptionProps | undefined>(emptyOption);
  const [autoOptions, setOptions] = useState<any[]>(options);

  const formControl = useFormControl();

  useEffect(() => {
    setOptions([emptyOption, ...options]);
  }, [options]);

  useEffect(() => {
    if (selectedItem) setValue(selectedItem);
  }, [selectedItem]);

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    popupOpen,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    value: autoOptions.filter(e => e === value).length
      ? value
      : {
          title: '',
          value: '',
          disabled: true,
        },
    options: autoOptions,
    getOptionLabel: (option: any) => {
      if (typeof option === 'string') {
        return option;
      }

      if (option.inputValue) {
        return option.inputValue;
      }

      // Regular option
      return option.title;
    },
    onChange: (event, newValue: any) => {
      if (!newValue.addNew) {
        onChange && onChange(newValue);
        setValue(newValue);
      } else if (newValue && newValue.addNew && newValue.inputValue) {
        onChange && onChange(newValue);
        setValue({ ...newValue, addNew: false });
        onAddItem && onAddItem({ ...newValue, addNew: false });
      }
    },
    filterOptions: (options, params): any => {
      let filtered = filter(options, params);

      const { inputValue } = params;

      // Suggest the creation of a new value
      const isExisting = options.some(option => inputValue === option.title);

      if (inputValue !== '' && !isExisting && addOption) {
        filtered = [
          {
            inputValue,
            title: inputValue,
            addNew: true,
          },
          ...filtered,
        ];
      }

      return filtered;
    },
    isOptionEqualToValue: (option, value): boolean => {
      return option.value === value.value;
    },
  });

  return (
    <div style={style}>
      <div {...getRootProps()}>
        <TextField
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-input': {
              textOverflow: 'ellipsis',
            },
            '& .MuiInputBase-adornedEnd': !formControl?.disabled
              ? {
                  cursor: 'pointer',
                }
              : {},
          }}
          inputProps={{
            ref: (getInputProps() as any).ref,
          }}
          InputProps={{
            endAdornment:
              popupOpen && !formControl?.disabled ? (
                <ArrowUpNobar />
              ) : (
                <ArrowDownNobar />
              ),
          }}
          value={getInputProps().value}
          placeholder={'Type or Select'}
          onFocus={getInputProps().onFocus}
          onBlur={getInputProps().onBlur}
          onChange={getInputProps().onChange}
          onMouseDown={getInputProps().onMouseDown}
          error={formControl?.error}
          disabled={formControl?.disabled}
          required={formControl?.required}
        />
      </div>
      {popupOpen && !formControl?.disabled ? (
        <Paper>
          <Listbox {...getListboxProps()}>
            {(groupedOptions as typeof options).map((option, index) =>
              option.disabled ? null : (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  {...getOptionProps({ option, index })}
                >
                  {option.addNew ? (
                    <>
                      <AddBox>
                        <Add />
                        <Typography variant="med14">
                          Add new &quot;{option.title}&quot;
                        </Typography>
                      </AddBox>
                      <Divider />
                    </>
                  ) : (
                    <>{option.renderOption ?? option.title}</>
                  )}
                </MenuItem>
              ),
            )}
          </Listbox>
        </Paper>
      ) : null}
    </div>
  );
};

export default Autocomplete;
