import { styled } from '@mui/material';
import _LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { primary } from '@vases-ui/theme/colors';
const LinearProgress = styled(_LinearProgress)(({ theme, color }) => ({
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: color == 'primary' ? primary[100] : color,
  },
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
}));

const Progress = () => <></>;

Progress.Linear = LinearProgress;
export default Progress;
