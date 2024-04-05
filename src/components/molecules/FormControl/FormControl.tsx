import React from 'react';
import { FormControlProps } from '@mui/material/FormControl';
import FORM_CONTROL from '@mui/material/FormControl';
import TextField from './Component/TextField';
import Label from './Component/Label';
import RadioGroup from './Component/RadioGroup';
import CheckboxGroup from './Component/CheckboxGroup';
import HelperText from './Component/HelperText';
import Dropdown from './Component/Dropdown';
import Calendar from './Component/Calendar';
import Autocomplete from './Component/Autocomplete';
import ColorPicker from './Component/ColorPicker';

const FormControl = ({ children, ...props }: FormControlProps) => (
  <FORM_CONTROL {...props}>{children}</FORM_CONTROL>
);

FormControl.Label = Label;
FormControl.Dropdown = Dropdown;
FormControl.TextField = TextField;
FormControl.RadioGroup = RadioGroup;
FormControl.CheckboxGroup = CheckboxGroup;
FormControl.Calendar = Calendar;
FormControl.HelperText = HelperText;
FormControl.AutoComplete = Autocomplete;
FormControl.ColorPicker = ColorPicker;

export default FormControl;
