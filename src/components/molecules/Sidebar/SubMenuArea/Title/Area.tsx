import { styled } from '@mui/material/styles';
import { brand } from '@vases-ui/theme/colors';

const SubMenuTitleArea = styled('div')(({ theme }) => ({
  fontFamily: 'Noto Sans KR',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '24px',
  fontStyle: 'normal',
  paddingLeft: '12px',
  width: '100%',
  height: '24px',
  padding: '0px 12px',
  boxSizing: 'border-box',
  color: brand.navy,
}));

export default SubMenuTitleArea;
