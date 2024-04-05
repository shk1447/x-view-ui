import _SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import { brand, grey } from '@vases-ui/theme/colors';
import { IconProps } from '../interfaces';

const MainAreaItemIcon = styled(_SvgIcon)<IconProps>(({ theme }) => ({
  cursor: 'pointer',
  "&[data-activated='false']:hover": {
    stroke: grey[60],
    fill: grey[60],
  },
  "&[data-activated='true']": {
    stroke: brand.orange,
    fill: brand.orange,
  },
  "&[data-activated='false']": {
    stroke: grey[40],
    fill: grey[40],
  },
}));

export default MainAreaItemIcon;
