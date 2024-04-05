import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Backdrop,
  Box,
  CircularProgress,
  circularProgressClasses,
  LinearProgress,
} from '@mui/material';
import Typography from '@vases-ui/atoms/Typography';
import { white, grey, black, primary } from '@vases-ui/theme/colors';
import React, { Children, cloneElement, isValidElement, useMemo } from 'react';
import Button from '~/components/atoms/Button';

export interface LoadingOverlayProps {
  active: boolean;
  message?: string;
  progress?: {
    total: number;
    current: number;
  };
  children?: React.ReactNode;
  className?: string;
}

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const LoadingOverlay = ({
  active,
  message,
  progress,
  children,
  className,
}: LoadingOverlayProps) => {
  if (progress) console.log((progress.current / progress.total) * 100);

  const body = useMemo(() => {
    console.log('ttt');

    return Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child, Object.assign({}, child.props) as any);
      }

      return child;
    });
  }, []);

  return (
    <StyledContainer
      className={className}
      css={css`
        overflow: hidden;
        user-select: ${active ? 'none' : ''};
        pointer-events: ${active ? 'none' : ''};
        & > :first-of-type {
          width: 100%;
          height: 100%;
        }
        flex: 1;
        z-index: ${active ? 9999999 : 1};
      `}
    >
      {body}
      {active && (
        <Backdrop
          open={active}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 1,
            background: 'rgba(0,0,0,0.4)',
            zIndex: theme => theme.zIndex.drawer + 999,
          }}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection="column"
          >
            <Box>
              <>
                <CircularProgress
                  variant={progress ? 'determinate' : 'indeterminate'}
                  sx={{
                    color: white,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    translate: '-50% -50%',
                    [`& .${circularProgressClasses.circle}`]: {
                      strokeLinecap: 'round',
                    },
                  }}
                  size={80}
                  thickness={4}
                  value={100}
                />
                {progress ? (
                  <CircularProgress
                    variant={'determinate'}
                    sx={{
                      color: primary[110],
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      translate: '-50% -50%',
                    }}
                    size={80}
                    thickness={4}
                    value={
                      progress ? (progress.current / progress.total) * 100 : 100
                    }
                  />
                ) : (
                  <></>
                )}

                {progress ? (
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="med12" color={grey[40]}>
                      {Math.floor((progress.current / progress.total) * 10000) /
                        100}
                      %
                    </Typography>
                  </Box>
                ) : (
                  <></>
                )}
              </>
            </Box>

            {message && (
              <Typography
                variant="med16"
                color={grey[20]}
                css={css`
                  margin-top: 120px;
                `}
              >
                {message}
              </Typography>
            )}
          </Box>
        </Backdrop>
      )}
    </StyledContainer>
  );
};
