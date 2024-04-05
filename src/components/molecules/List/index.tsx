import React, {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  PropsWithChildren,
  useState,
} from 'react';
import CheckBox from '@vases-ui/atoms/Checkbox';
import { grey } from '@vases-ui/theme/colors';
import { Box, Collapse, css } from '@mui/material';
import { VscChevronRight } from 'react-icons/vsc';
import { ReactComponent as Arrow } from '~/assets/icons/Arrow.svg';
import { IPopperTriggerContext } from '~/components/organisms/PopperTrigger/PopperTrigger';

export interface ListProps {
  style?: CSSProperties;
  checkable?: boolean;
  depth?: number;
  open?: boolean;
  context?: IPopperTriggerContext;
}

export interface ListItemProps extends ListProps {
  group?: boolean;
  divider?: boolean;
  onClick?: (e: any, context?: IPopperTriggerContext) => void;
  onExpand?: () => void;
  onCheck?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  hover?: boolean;
}

export interface TreeItemProps extends ListItemProps {
  title?: React.ReactNode | string;
}

export const List = (props: PropsWithChildren<ListProps>) => {
  const {
    children,
    checkable,
    style,
    depth = 0,
    open = false,
    context,
  } = props;

  return (
    <div
      style={style}
      css={css`
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 0px;
      `}
    >
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(
            child,
            Object.assign(
              {
                checkable: checkable,
                depth: depth,
                open: open,
                context: context,
              },
              child.props,
            ) as any,
          );
        }

        return child;
      })}
    </div>
  );
};

export const TreeItem = (props: PropsWithChildren<TreeItemProps>) => {
  const {
    title,
    children,
    group = true,
    checkable,
    depth = 0,
    open = false,
  } = props;

  const [visible, setVisible] = useState<boolean>(open);

  return (
    <>
      <ListItem
        {...props}
        group={group}
        open={visible}
        onExpand={() => setVisible(prev => !prev)}
      >
        {title}
      </ListItem>
      <Collapse
        in={visible}
        unmountOnExit
        timeout={100}
        css={css`
          min-height: auto !important;
          & .MuiCollapse-wrapperInner {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
        `}
      >
        {Children.map(children, child => {
          if (isValidElement(child)) {
            return cloneElement(
              child,
              Object.assign(
                { checkable: checkable, depth: depth + 1, open: open },
                child.props,
              ) as any,
            );
          }

          return child;
        })}
      </Collapse>
    </>
  );
};

export const ListItem = (props: PropsWithChildren<ListItemProps>) => {
  const {
    depth = 1,
    group,
    checkable,
    disabled,
    checked = false,
    divider,
    open,
    onExpand,
    onClick,
    onCheck,
    children,
    context,
    hover,
  } = props;

  return (
    <div
      className="List-Item"
      css={css`
        cursor: pointer;
        padding: 4px 0px;
        display: flex;
        padding-left: ${depth * 24 + 12}px;
        padding-right: 20px;
        align-items: center;
        gap: 8px;
        ${hover ? `&:hover { background: ${'#7D7F861A'} };` : ''}
        border-bottom: ${divider ? `1px solid ${grey[10]}` : 'none'};
        opacity: ${disabled ? '.5' : 1};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
      `}
      onClick={e => {
        if (!disabled) {
          // e.preventDefault();
          // e.stopPropagation();
          onClick && onClick(e, context);
        }
      }}
    >
      {group ? (
        <Box component={'div'} onClick={() => onExpand && onExpand()}>
          <VscChevronRight
            size={16}
            css={css`
              transform: rotate(${open ? '90deg' : '0deg'});
              transition: 0.3s ease all;
              cursor: pointer;
            `}
          />
        </Box>
      ) : (
        <></>
      )}

      {checkable ? (
        <CheckBox
          css={css`
            padding: 0;
          `}
          onChange={e => {
            e.preventDefault();
            e.stopPropagation();
            onCheck && onCheck(e.target.checked);
          }}
        />
      ) : (
        <></>
      )}

      {children}
    </div>
  );
};
