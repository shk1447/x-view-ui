import React from 'react';
import _Slider, { SliderProps as _SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material';
import { grey, primary } from '@vases-ui/theme/colors';

export interface SliderProps extends _SliderProps {}

const Slider = styled(_Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    width: '12px',
    height: '12px',

    '&:focus,&:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },

    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-track': {
    borderRadius: 2,
    height: '4px',
  },
  '&.MuiSlider-root': {
    color: primary[100],
    '& .MuiSlider-rail': {
      background: primary[100],
      borderRadius: 2,
      height: '4px',
      opacity: 0.5,
    },
    '& .MuiSlider-track': {
      background: primary[100],
      border: '0px',
    },
  },
  '&.MuiSlider-root.Mui-disabled': {
    color: grey[100],
    '& .MuiSlider-track': {
      backgroundColor: grey[60],
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      backgroundColor: `${grey[60]} !important`,
    },
  },

  '& .MuiSlider-valueLabel': {
    '&:before': {
      display: 'none',
    },
    minWidth: '32px',
    height: '32px',
    color: 'white',
    lineHeight: '16px',
    fontSize: '12px',
    fontWeight: 500,
    background: primary[100],
    padding: '8px',
    borderRadius: '50%',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#bfbfbf',
    height: 16,
    width: 2,
    '& .MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: '#bfbfbf',
    },
  },
  '& .MuiSlider-markLabel': {
    fontSize: '12px',
    color: grey[80],
  },
}));

export default Slider;
