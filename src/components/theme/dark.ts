import { black, primary, success, warning, white, alert, grey } from './colors';

const dark = {
  palette: {
    vases_success: {
      main: success[100],
      light: success[100],
      dark: success[100],
      contrastText: white,
    },
    vases_primary: {
      main: primary[100],
      light: primary[100],
      dark: primary[100],
      contrastText: white,
    },
    vases_warning: {
      main: warning[100],
      light: warning[100],
      dark: warning[100],
      contrastText: white,
    },
    vases_alert: {
      main: alert[100],
      light: alert[100],
      dark: alert[100],
      contrastText: white,
    },
    vases_neutral: {
      main: black,
      light: grey[40],
      dark: grey[40],
      contrastText: white,
    },
  },
};

export default dark;
