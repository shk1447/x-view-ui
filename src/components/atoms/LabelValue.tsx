import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { Typography } from '@vases-ui/atoms';
import { grey } from '@vases-ui/theme/colors';
import React, { isValidElement } from 'react';

const LabelValue = (props: {
  label: string | React.ReactNode;
  labelWidth?: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) => {
  const labelStyle = css`
    display: flex;
    flex: 1;
    max-width: ${props.labelWidth ? props.labelWidth : undefined};
  `;

  return (
    <div
      className={props.className}
      css={css`
        display: flex;
        gap: 4px;
        padding-bottom: 8px;
      `}
    >
      {typeof props.label === 'string' ? (
        <Typography
          width={props.labelWidth}
          variant="med12"
          color={grey[60]}
          css={labelStyle}
        >
          {props.label}
        </Typography>
      ) : (
        <div css={labelStyle}>{props.label}</div>
      )}

      {isValidElement(props.value) ? (
        <Box paddingLeft={'8px'} flex={1} overflow={'hidden'}>
          {props.value}
        </Box>
      ) : (
        <Typography
          overflow="hidden"
          textOverflow="ellipsis"
          variant="med12"
          css={css`
            align-items: center;
            padding-left: 8px;
          `}
        >
          {props.value}
        </Typography>
      )}

      <div
        css={css`
          display: flex;
          flex: 0.2;
          justify-content: end;
        `}
      >
        {props.icon}
      </div>
    </div>
  );
};

export default LabelValue;
