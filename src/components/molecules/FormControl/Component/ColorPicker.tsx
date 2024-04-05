import { SketchPicker } from 'react-color';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  InputAdornment,
  Popover,
  Popper,
  useFormControl,
} from '@mui/material';
import { PopperTrigger } from '@vases-ui/organisms';
import FormControl from '../FormControl';
import { ReactComponent as ArrowUpNobar } from '../Assets/ArrowUpNobar.svg';
import { ReactComponent as ArrowDownNobar } from '../Assets/ArrowDownNobar.svg';

type RGBA = { r: number; g: number; b: number; a: number };

type HEX = string;

const ColorPicker = ({
  hex,
  onChange,
}: {
  hex: string;
  onChange: (hex: string) => void;
}) => {
  const [pickedColor, setPickedColor] = useState<HEX>(hex);

  const colorChangeHandler = useCallback((color: any, event: any) => {
    setPickedColor(color.hex);

    return () => {
      setPickedColor('');
    };
  }, []);

  useEffect(() => {
    setPickedColor(hex);
  }, [hex]);

  const ref = useRef<any>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    onChange && onChange(pickedColor);
  }, [pickedColor, onChange]);

  const formControl = useFormControl();

  return (
    <>
      <FormControl.TextField
        ref={ref}
        error={formControl?.error}
        disabled={formControl?.disabled}
        required={formControl?.required}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(anchorEl ? null : event.currentTarget);
        }}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: pickedColor,
                }}
              />
            </InputAdornment>
          ),
          endAdornment: anchorEl ? <ArrowUpNobar /> : <ArrowDownNobar />,
        }}
        defaultValue={pickedColor}
        value={pickedColor}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
      >
        <Box>
          <SketchPicker
            disableAlpha
            onChange={colorChangeHandler}
            color={pickedColor}
          />
        </Box>
      </Popover>
    </>
  );
};

export default ColorPicker;
