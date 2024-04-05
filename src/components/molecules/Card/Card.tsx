import CARD, { CardProps } from '@mui/material/Card';
import { CardHeaderProps } from '@mui/material/CardHeader';
import CARDCONTENT, { CardContentProps } from '@mui/material/CardContent';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { grey, primary } from '@vases-ui/theme/colors';
import Checkbox from '@vases-ui/atoms/Checkbox';

interface ICardContext {
  checked: boolean;
  showCheckbox: boolean;
  isCheckboxDisabled: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
}

interface StyledCardProps extends CardProps {
  checkable?: boolean;
  disableCheckbox?: boolean;
  checkHandler?: (flag: boolean) => void;
}

const CardContext = createContext<ICardContext | null>(null);

const Card = ({
  children,
  onChange,
  checkable,
  disableCheckbox = false,
  checkHandler,
  ...props
}: StyledCardProps) => {
  const showCheckbox = Boolean(checkable);
  const isCheckboxDisabled = Boolean(disableCheckbox);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (checkable) setChecked(false);
  }, [checkable]);

  useEffect(() => {
    checkHandler && checkHandler(checked);
  }, [checked]);

  return (
    <CardContext.Provider
      value={{ checked, showCheckbox, setChecked, isCheckboxDisabled }}
    >
      <CARD
        {...props}
        sx={{
          minHeight: '158px',
          maxHeight: '158px',
          minWidth: '312px',
          boxShadow: 'none',
          border: `1px solid ${grey[10]}`,
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          '&:hover': {
            border: `1px solid ${primary[100]}`,
          },
        }}
        onClick={e => {
          if (isCheckboxDisabled) return;
          setChecked(prev => !prev);
          props.onClick && props.onClick(e);
        }}
      >
        {children}
      </CARD>
    </CardContext.Provider>
  );
};

const StyledCardHeader = styled(Stack)(({ theme }) => ({
  '& .MuiCardHeader-title': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontFamily: 'Noto Sans KR',
    flexGrow: 2,
  },
  '& .MuiCardHeader-action': {
    margin: 0,
  },
  '& .MuiCardHeader-avatar': {
    cursor: 'pointer',
    display: 'flex',
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
}));

const Header = (props: CardHeaderProps) => {
  const cardContext = useContext(CardContext);

  return (
    <StyledCardHeader
      direction={'row'}
      gap={'8px'}
      padding={'12px 12px 0px 12px'}
      alignItems={'center'}
    >
      {cardContext?.showCheckbox && (
        <StyledCheckbox
          disabled={cardContext.isCheckboxDisabled}
          checked={cardContext.checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            cardContext.setChecked(e.target.checked);
          }}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
          }}
        />
      )}
      <div className="MuiCardHeader-avatar">{props.avatar}</div>
      <div className="MuiCardHeader-title">{props.title}</div>
      <div style={{ flex: 1 }} />
      <div
        className="MuiCardHeader-action"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {props.action}
      </div>
    </StyledCardHeader>
  );
};

Card.Header = Header;

const StyledCardContent = styled(CARDCONTENT)(({ theme }) => ({
  padding: '16px 16px 0px 16px',
  flexGrow: 2,
}));

const Content = ({ children, ...props }: CardContentProps) => {
  return <StyledCardContent {...props}>{children}</StyledCardContent>;
};

Card.Content = Content;

interface FooterProps {
  children: ReactNode;
}

const StyledFooter = styled('div')(({ theme }) => ({
  padding: '16px 16px 16px 16px',
}));

const Footer = ({ children }: FooterProps) => {
  return <StyledFooter>{children}</StyledFooter>;
};

Card.Footer = Footer;

export default Card;
