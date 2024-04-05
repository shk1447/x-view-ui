import {
  createTheme,
  Theme as _Theme,
  ThemeProvider,
  ThemeOptions as _ThemeOptions,
} from '@mui/material/styles';
import dark from './dark';
import light from './light';
import typography from './typography';

declare module '@mui/material/styles' {
  interface Theme {
    // saige: any;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    // saige: any;
  }

  interface PaletteColor {
    outlinedText?: string;
  }

  interface Palette {
    vases_success: Palette['primary'];
    vases_primary: Palette['primary'];
    vases_warning: Palette['primary'];
    vases_alert: Palette['primary'];
    vases_neutral: Palette['primary'];
  }

  interface PaletteOptions {
    vases_success: Palette['primary'];
    vases_primary: Palette['primary'];
    vases_warning: Palette['primary'];
    vases_alert: Palette['primary'];
    vases_neutral: Palette['primary'];
  }

  interface TypographyVariants {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    reg12: React.CSSProperties;
    med12: React.CSSProperties;
    bol12: React.CSSProperties;
    paragraph12: React.CSSProperties;
    reg14: React.CSSProperties;
    med14: React.CSSProperties;
    bol14: React.CSSProperties;
    paragraph14: React.CSSProperties;
    reg16: React.CSSProperties;
    med16: React.CSSProperties;
    bol16: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    reg12: React.CSSProperties;
    med12: React.CSSProperties;
    bol12: React.CSSProperties;
    paragraph12: React.CSSProperties;
    reg14: React.CSSProperties;
    med14: React.CSSProperties;
    bol14: React.CSSProperties;
    paragraph14: React.CSSProperties;
    reg16: React.CSSProperties;
    med16: React.CSSProperties;
    bol16: React.CSSProperties;
  }
}

const lightTheme = createTheme({ ...typography, ...light });

const darkTheme = createTheme({ ...typography, ...dark });

export { lightTheme, darkTheme, ThemeProvider };
