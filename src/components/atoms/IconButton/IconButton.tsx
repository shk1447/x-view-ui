import _IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { grey, state, white } from '@vases-ui/theme/colors';

const IconButton = styled(_IconButton)(({ theme }) => ({
  padding: 0,
  borderRadius: '4px',
  width: 'fit-content',
  height: 'fit-content',
  backgroundColor: white,
  '&:hover': {
    backgroundColor: state['hovered'],
  },
  '&.Mui-disabled': {
    opacity: 0.4,
  },
}));

export default IconButton;
