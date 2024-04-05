import _Breadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import { styled } from '@mui/material/styles';
import { grey } from '@vases-ui/theme/colors';

const Breadcrumbs = styled(_Breadcrumbs)<BreadcrumbsProps>(({ theme }) => ({
  fontFamily: 'Noto Sans KR',
  fontStyle: 'normal !important',
  fontSize: '12px !important',
  lineHeight: '16px !important',
  color: grey[80],
}));

export default Breadcrumbs;
