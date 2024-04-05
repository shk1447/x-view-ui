import React from 'react';
import { StandardTextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import _ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import SELECT from '@mui/material/Select';
import { useState, createContext, useEffect, useRef } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import { InputBase } from '@mui/material';
import { black, grey, white, alert, primary } from '@vases-ui/theme/colors';
import { ReactComponent as ArrowDownIcon } from '../Assets/ArrowDown.svg';

declare module '@mui/material/TextField' {
  interface TextFieldPropsSizeOverrides {
    small: false;
    medium: false;
    default: true;
    compact: true;
  }
}

declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    small: false;
    medium: false;
    default: true;
    compact: true;
  }
}

interface IMenuContext {
  selected: string;
  setSelected: (update: string | ((prevState: string) => string)) => void;
}

const MenuContext = createContext<IMenuContext | null>(null);

const StyleInput = styled(InputBase)(({ theme, error, disabled, size }) => ({
  borderRadius: 4,
  border: `1px solid ${grey[40]}`,
  '& .MuiInputBase-input': {
    backgroundColor: white,

    padding: '8px 12px',
    transition: theme.transitions.create(['border']),
    fontFamily: 'Noto Sans KR',
    fontSize: '14px',
    color: black,
    lineHeight: '20px',

    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiListItemText-root': {
      margin: 0,
      padding: '0px 12px',
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      height: '32px',
    },
  },
  '& .MuiSelect-icon': {
    right: '12px',
    color: grey[80],
  },
  /* NOTE: InputBase가 Override해도 Small만 
     명시적으로 class가 들어가게 되어있어서 이 방법밖에 없는 듯... */
  '& .MuiInputBase-input.MuiSelect-select': {
    padding: '0px !important',
    height: '32px',
    width: size === 'default' ? '400px' : '336px',
  },
  '& .MuiInputBase-input.MuiSelect-select.Mui-disabled:hover': {
    cursor: 'not-allowed',
  },
  '&.Mui-focused': {
    outline: `2px solid ${primary[20]}`,
    outlineOffset: 1,
    border: `1px solid ${primary[100]}`,
  },
  '&:not(.Mui-disabled):hover': {
    outline: `1px solid ${primary[100]}`,
  },
  '&.Mui-error': {
    border: `1px solid ${alert[100]}`,
  },
  '&.Mui-disabled': {
    pointerEvents: 'auto',
    opacity: 0.4,
  },
}));

const StyledSelect = styled(SELECT)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },

  '& .MuiSelect-outlined': {
    height: '32px',
    width: '100%',
  },

  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    padding: 0,
  },
}));

type dropBoxProps = {
  renderValue?: (value: unknown) => React.ReactNode;
} & StandardTextFieldProps;

const Dropdown = ({
  select,
  value,
  onClick,
  children,
  renderValue,
  ...props
}: dropBoxProps) => {
  const ref = useRef(null);
  const [selected, setSelected] = useState<string>(value as string);
  const formControl = useFormControl();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setWidth((ref.current as any).clientWidth);
    }
  }, [ref]);

  useEffect(() => {
    setSelected(value as any);
  }, [value]);

  return (
    <MenuContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      <StyledSelect
        ref={ref}
        size={props.size}
        displayEmpty
        value={selected}
        onChange={(e: any) => {
          setSelected(e.target.value);
          props.onChange && props.onChange(e);
        }}
        renderValue={renderValue}
        IconComponent={ArrowDownIcon}
        input={<StyleInput />}
        error={formControl?.error}
        disabled={formControl?.disabled}
        required={formControl?.required}
        sx={{
          '& .MuiSelect-select .notranslate': {
            display: 'flex',
            alignItems: 'center',
            height: '32px',
            padding: '0px 12px',

            '&::after': {
              content: `"No Selection"`,
              opacity: 0.6,
            },
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              width: `${width + 2}px`,
              background: '#FFFFFF !important',
              border: `1px solid ${grey[40]}`,
              boxShadow: '0px 8px 12px rgba(42, 46, 57, 0.1)',
              borderRadius: '4px',
              transform: 'translate(0px, 4px)!important',
              overflow: 'hidden',
              '& .MuiListItemText-root': {
                width: `calc(100% - 24px)`,
              },
            },
            elevation: 0,
          },
          MenuListProps: {
            sx: {
              display: 'flex',
              flexDirection: 'column',
              padding: '4px 0px',
              maxHeight: 144,
              gap: '4px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            },
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        }}
      >
        {children}
      </StyledSelect>
    </MenuContext.Provider>
  );
};

const StyledMenuItem = styled(MenuItem)(({ theme, selected }) => {
  return {
    width: '100%',
    height: '36px',
    padding: '6px 12px',

    '&:before': {
      display: 'block',
      width: 24,
      height: 24,
      backgroundImage: `${
        selected
          ? `url(
              "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.40951 11.5901L5.99951 13.0001L9.99951 17.0001L17.9995 9.00008L16.5895 7.58008L9.99951 14.1701L7.40951 11.5901Z' fill='%235457D8'/%3E%3C/svg%3E%0A"
            )`
          : ''
      }`,
      content: '""',
      paddingRight: '4px',
      transform: 'translate(0, 1px)',
    },
  };
}) as any;

const StyledMenuItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: '34px !important',
}));

const StyledMenuItemText = styled(_ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '11px',
    lineHeight: '20px',
  },
  '& .MuiTypography-root .MuiBox-root': {
    marginRight: '16px',
  },
}));

const DropDownMenuItemText = ({ children, ...props }: ListItemTextProps) => (
  <StyledMenuItemText {...props}>{children}</StyledMenuItemText>
);

StyledMenuItem.Text = DropDownMenuItemText;
StyledMenuItem.Icon = StyledMenuItemIcon;
Dropdown.Item = StyledMenuItem;

export default Dropdown;
