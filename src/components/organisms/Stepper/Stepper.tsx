import Stack from '@mui/material/Stack';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Box, css } from '@mui/system';
import { grey, white } from '@vases-ui/theme/colors';
import Button from '@vases-ui/atoms/Button';
import { ReactComponent as BackIcon } from './Assets/back.svg';
import { ReactComponent as NextIcon } from './Assets/next.svg';
import { ReactComponent as CompleteIcon } from './Assets/complete.svg';

interface IStepperContext {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  stepCount: number;
  setStepCount: Dispatch<SetStateAction<number>>;
  back: boolean;
  setBack: Dispatch<SetStateAction<boolean>>;
}

export const StepperContext = createContext<IStepperContext | null>(null);

interface StepperProps {
  stepChanged?: (step: number) => void;
  stepCnt?: number;
  children: ReactNode;
}

const Stepper = ({ stepChanged, stepCnt, children }: StepperProps) => {
  const [step, setStep] = useState<number>(0);
  const [back, setBack] = useState<boolean>(false);

  const [stepCount, setStepCount] = useState<number>(
    stepCnt ?? React.Children.toArray(children).length,
  );

  useEffect(() => {
    stepChanged && stepChanged(step);
  }, [step]);

  return (
    <StepperContext.Provider
      value={{
        step,
        setStep,
        stepCount,
        setStepCount,
        back,
        setBack,
      }}
    >
      <Stack direction={'column'} gap="12px">
        {children}
      </Stack>
    </StepperContext.Provider>
  );
};

interface StepProps {
  children: ReactNode;
}

const Step = ({ children }: StepProps) => {
  return (
    <Stack width="100%" spacing={'12px'} direction="column">
      {children}
    </Stack>
  );
};

interface StepTitleProps {
  step: number;
  title: ReactNode;
  optionalInfo?: ReactNode;
}

const StepTitle = ({ step, title, optionalInfo }: StepTitleProps) => {
  const stepperContext = useContext(StepperContext);

  return (
    <Stack width="100%" direction="row" gap={'8px'} alignItems="center">
      <div
        style={{
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          backgroundColor: stepperContext?.step === step ? grey[80] : grey[20],
          display: 'flex',
          verticalAlign: 'middle',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {stepperContext && stepperContext?.step > step ? (
          <CompleteIcon />
        ) : (
          <Typography
            variant="bol14"
            align="center"
            sx={{
              color: white,
            }}
          >
            {step + 1}
          </Typography>
        )}
      </div>
      {title}
      <div
        css={css`
          flex: 1;
        `}
      />
      {stepperContext && stepperContext?.step > step ? optionalInfo : null}
    </Stack>
  );
};

interface StepButtonProps {
  enableNext: boolean;
}

const StepButtons = ({ enableNext }: StepButtonProps) => {
  const stepperContext = useContext(StepperContext);

  return (
    <Stack gap="16px" direction="row-reverse" marginTop={'16px'}>
      {stepperContext &&
        stepperContext?.step < stepperContext?.stepCount - 1 && (
          <Button
            variant="primary"
            onClick={() => {
              stepperContext?.setStep((prev: number) => prev + 1);
              stepperContext.setBack(false);
            }}
            startIcon={<NextIcon />}
            disabled={!enableNext}
          >
            Next
          </Button>
        )}

      {stepperContext && stepperContext?.step > 0 && (
        <Button
          variant="ghost"
          color="vases_neutral"
          startIcon={<BackIcon />}
          onClick={() => {
            stepperContext?.setStep((prev: number) =>
              prev - 1 < 0 ? 0 : prev - 1,
            );
            stepperContext.setBack(true);
          }}
        >
          Back
        </Button>
      )}
    </Stack>
  );
};

interface StepContentProps {
  contentWidth?: string;
  enableNext: boolean;
  buttonDisable?: boolean;
}

const StepContent = ({
  children,
  contentWidth = '100%',
  enableNext,
  buttonDisable,
}: PropsWithChildren<StepContentProps>) => {
  return (
    <Stack
      width="100%"
      sx={{
        backgroundColor: grey[5],
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <Stack width={contentWidth} direction={'column'}>
        {children}
        {buttonDisable ? null : <StepButtons enableNext={enableNext} />}
      </Stack>
    </Stack>
  );
};

export const useStepperContext = () => {
  const stepperContext = useContext(StepperContext);

  return stepperContext;
};

Step.Title = StepTitle;
Step.Content = StepContent;
Step.Buttons = StepButtons;
Stepper.Step = Step;

export default Stepper;
