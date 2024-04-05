import React, {
  Children,
  cloneElement,
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
  MouseEvent,
  useEffect,
} from 'react';

export interface IPopperTriggerContext {
  anchorEl: null | HTMLElement;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
}

export const PopperTriggerContext = createContext<IPopperTriggerContext | null>(
  null,
);

interface PopperTriggerProps {
  children: ReactNode;
}

const PopperTrigger = ({ children }: PopperTriggerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    return () => {
      setAnchorEl(null);
    };
  }, []);

  useEffect(() => {
    if (!open) setAnchorEl(null);
  }, [open]);

  return (
    <PopperTriggerContext.Provider value={{ anchorEl, setAnchorEl }}>
      {children}
    </PopperTriggerContext.Provider>
  );
};

interface TriggerProps {
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

const Trigger = ({ children, onOpen, onClose }: TriggerProps) => {
  const popperTriggerContext = useContext(PopperTriggerContext);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const anchor = popperTriggerContext?.anchorEl
        ? null
        : event.currentTarget;

      popperTriggerContext?.setAnchorEl(anchor);
      if (anchor) onOpen && onOpen();
      else onClose && onClose();
    },
    [popperTriggerContext],
  );

  return (
    <>
      {Children.toArray(children).map((child: ReactNode) => {
        return cloneElement(child as ReactElement, {
          onClick: (event: MouseEvent<HTMLElement>) => {
            if ((child as ReactElement).props.disabled) {
              return;
            } else {
              handleClick(event);
            }
            // event.preventDefault();
            // event.stopPropagation();
          },
        });
      })}
    </>
  );
};

PopperTrigger.Trigger = Trigger;

export const usePopTriggerContext = () => {
  const popperTriggerContext = useContext(PopperTriggerContext);

  return popperTriggerContext;
};

export default PopperTrigger;
