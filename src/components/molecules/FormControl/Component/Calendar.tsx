import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { TextFieldProps } from '@mui/material/TextField';
import { createContext, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { alpha, css, styled } from '@mui/material/styles';
import { addDays, addMonths } from 'date-fns';
import {
  CalendarContainer,
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from 'react-datepicker';
import { black, grey, primary, white } from '@vases-ui/theme/colors';
import FormControl from '../FormControl';
import { ReactComponent as CalendarIcon } from '../Assets/Calendar.svg';
import { ReactComponent as BeforeIcon } from '../Assets/Before.svg';
import { ReactComponent as AfterIcon } from '../Assets/After.svg';
import Typography from '~/components/atoms/Typography';

const CustomInput = forwardRef(({ value, onClick }: TextFieldProps, ref) => {
  return (
    <FormControl
      onClick={onClick}
      style={{ width: '100%', textAlign: 'center' }}
    >
      <FormControl.TextField
        css={css`
          & .MuiInputBase-input {
            text-align: center;
          }
        `}
        inputRef={ref}
        value={value}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CalendarIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
});

const ReactDatePickerContainer = styled('div')(({ theme }) => ({
  '& .react-datepicker__header--custom': {
    backgroundColor: white,
    borderRadius: 0,
    boxSizing: 'border-box',
  },
  '& .react-datepicker__input-time-container': {
    padding: '0 10px 10px 10px',
    margin: 0,
    textAlign: 'center',
    '& .react-datepicker-time__input-container': {
      '& .react-datepicker-time__input': {
        margin: 0,
      },
    },
  },

  '& .react-datepicker__month-container': {
    // padding: "16px",
    width: '100%',
  },
  '& .react-datepicker__month': {
    margin: 0,
    padding: '0px 16px 16px',
  },
  '& .react-datepicker__header': {
    borderBottom: 'none',
    padding: '16px',
  },
  '& .react-datepicker_day': {
    backgroundColor: 'none',
  },
  '& .react-datepicker__day:not(:empty):hover': {
    backgroundColor: 'rgba(125, 127, 134, 0.1)',
    borderRadius: '50%',
  },

  '& .react-datepicker__day--selected:focus-visible': {
    outline: 'none',
  },

  '& .react-datepicker__day-names:before': {},
  '& .react-datepicker__day-names': {
    // width: "100%",
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 10px 0px 10px',
  },
  '& .react-datepicker__day-name': {
    fontFamily: 'Noto Sans KR',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '16px',
    color: grey[80],
  },
  '& .react-datepicker__day--disabled': {
    '& .MuiTypography-root': {
      fontFamily: 'Noto Sans KR',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '16px',
      color: grey[10],
    },
  },
  '& .react-datepicker__week': {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 10px 0px 10px',
  },
  '& .react-datepicker__day--keyboard-selected': {
    backgroundColor: white,
    border: 'none',
  },
  '& .react-datepicker__day--selected:not(.react-datepicker__day--outside-month)':
    {
      backgroundColor: primary[100],
      borderRadius: '50%',
      '& .MuiTypography-root': {
        color: `${white}!important`,
      },
    },
  '& .react-datepicker__day--selected:is(.react-datepicker__day--outside-month)':
    {
      backgroundColor: white,
      pointerEvents: 'none',
    },
  '& .react-datepicker__day--outside-month:is(:empty)': {
    background: 'transparent',
  },
  '& .react-datepicker__day--in-range': {
    borderRadius: 4,
    backgroundColor: primary[100],
    '& .MuiTypography-root': {
      color: `${white}!important`,
    },
  },
  '& .react-datepicker__day--in-selecting-range': {
    borderRadius: 4,
    backgroundColor: alpha(primary[100], 0.4),
    '& .MuiTypography-root': {
      color: `${white}!important`,
    },
  },

  // /* For a part when range and selection range touch outside month (month end) */
  // "& .react-datepicker__day--in-range + .react-datepicker__day--outside-month:after":
  //   {
  //     background:
  //       "linear-gradient( 90deg, rgb(130,188,255), rgb(130,188,255) 5%, transparent )",
  //   },

  // "& .react-datepicker__day--in-selecting-range + .react-datepicker__day--outside-month:after":
  //   {
  //     background: "linear-gradient( 90deg, rgb(238,246,255), transparent )",
  //   },

  // /* For a part when outside month touches range and selecting range (month start)  */
  // "& .react-datepicker__day--outside-month + .react-datepicker__day--in-selecting-range:after, &.react-datepicker__day--outside-month + .react-datepicker__day--in-range:not(.react-datepicker__day--range-start):after":
  //   {
  //     padding: "0px 6px 0px 36px",
  //     marginLeft: "-58px",
  //   },

  // "& .react-datepicker__day--outside-month + .react-datepicker__day--in-range.react-datepicker__day--range-end:after":
  //   {
  //     paddingRight: "4px",
  //   },
  // "& .react-datepicker__day--outside-month + .react-datepicker__day--in-range:not(.react-datepicker__day--outside-month):not(.react-datepicker__day--range-start):after":
  //   {
  //     background:
  //       "linear-gradient( 90deg, transparent 0%, rgb(130,188,255) 75% )",
  //   },

  // "& .react-datepicker__day--outside-month + .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--outside-month):after":
  //   {
  //     background:
  //       "linear-gradient( 90deg,transparent 0%, rgb(238,246,255) 75% ) !important",
  //   },
}));

const ReactDatePickerWrapper =
  () =>
  ({ className, children }: any) => {
    return (
      <ReactDatePickerContainer>
        <CalendarContainer className={className}>{children}</CalendarContainer>
      </ReactDatePickerContainer>
    );
  };

const IconWrapper = styled('div')(({ theme }) => ({
  '&:not(.Mui-disabled):hover': {
    backgroundColor: 'rgba(125, 127, 134, 0.1)',
    borderRadius: 4,
    cursor: 'pointer',
  },
  '&.Mui-disabled:hover': {
    cursor: 'not-allowed',
  },
}));

const SingleCalenderHeader = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div
    style={{
      borderBottom: `1px solid ${grey[20]}`,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px 16px 14px 16px',
    }}
  >
    <IconWrapper className={prevMonthButtonDisabled ? 'Mui-disabled' : ''}>
      <BeforeIcon
        onClick={prevMonthButtonDisabled ? () => {} : decreaseMonth}
      />
    </IconWrapper>

    <Typography variant="med14" alignItems={'center'}>
      {monthDate.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      })}
    </Typography>
    <IconWrapper className={nextMonthButtonDisabled ? 'Mui-disabled' : ''}>
      <AfterIcon onClick={nextMonthButtonDisabled ? () => {} : increaseMonth} />
    </IconWrapper>
  </div>
);

const MultiCalenderHeader = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div
    style={{
      borderBottom: `1px solid ${grey[20]}`,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px 16px 14px 16px',
    }}
  >
    <IconWrapper
      className={prevMonthButtonDisabled ? 'Mui-disabled' : ''}
      style={{
        visibility: !(customHeaderCount === 1) ? 'visible' : 'hidden',
      }}
    >
      <BeforeIcon
        onClick={prevMonthButtonDisabled ? () => {} : decreaseMonth}
      />
    </IconWrapper>

    <Typography variant="med14" alignItems={'center'}>
      {monthDate.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      })}
    </Typography>

    <IconWrapper
      className={nextMonthButtonDisabled ? 'Mui-disabled' : ''}
      style={{ visibility: !(customHeaderCount === 0) ? 'visible' : 'hidden' }}
    >
      <AfterIcon onClick={nextMonthButtonDisabled ? () => {} : increaseMonth} />
    </IconWrapper>
  </div>
);

const renderDayContents = (day: number, date: Date) => {
  return <Typography variant="med12">{day}</Typography>;
};

const CustomTimeInput = ({
  date,
  onChangeCustom,
}: {
  date: Date | null | undefined;
  onChangeCustom: any;
}) => {
  const _value =
    typeof date === 'object' &&
    (date as Date).getHours().toString().padStart(2, '0') +
      ':' +
      (date as Date).getMinutes().toString().padStart(2, '0') +
      ':' +
      (date as Date).getSeconds().toString().padStart(2, '0');

  return (
    <FormControl style={{ width: '100%' }}>
      <FormControl.TextField
        type={'time'}
        inputProps={{ step: 1 }}
        value={_value}
        onChange={event => {
          if (event.target.value === '') {
            if ((date as Date).getHours() < 12) (date as Date).setHours(0);
            else (date as Date).setHours(12);
          } else {
            const time = event.target.value.split(':');
            (date as Date).setHours(parseInt(time[0]));
            (date as Date).setMinutes(parseInt(time[1]));
            (date as Date).setSeconds(parseInt(time[2]));
          }

          onChangeCustom(date);
        }}
      />
    </FormControl>
  );
};

interface CalendarProps extends ReactDatePickerProps {}

const Calendar = (props: CalendarProps) => {
  return (
    <DatePicker
      {...props}
      customInput={<CustomInput />}
      showPopperArrow={false}
      renderDayContents={renderDayContents}
      formatWeekDay={nameOfDay => nameOfDay.substr(0, 3)}
      renderCustomHeader={
        props.monthsShown === 1
          ? SingleCalenderHeader
          : props.monthsShown === 2
          ? MultiCalenderHeader
          : ({
              monthDate,
              customHeaderCount,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => null
      }
      calendarContainer={ReactDatePickerWrapper()}
      disabledKeyboardNavigation
      shouldCloseOnSelect={false}
      maxDate={props.maxDate ? props.maxDate : addMonths(new Date(), 0)}
      customTimeInput={
        props.showTimeInput ? (
          <CustomTimeInput
            date={props.selected}
            onChangeCustom={props.onChange}
          />
        ) : null
      }
    />
  );
};

export default Calendar;
