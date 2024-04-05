import * as MUIStyles from '@mui/material/styles';
declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    vases_success: true;
    vases_primary: true;
    vases_warning: true;
    vases_alert: true;
    vases_neutral: true;
  }
}

declare module '@mui/material/styles' {
  MUIStyles();

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

declare module '@doodle3d/clipper-lib' {
  export const JS: any;
  export const Clipper: any;
  export const PolyFillType: any;
  export const PolyType: any;
  export const Paths: any;
  export const ClipType: any;
  export const PolyTree: any;
  export interface Point {
    X: number;
    Y: number;
  }
  export type Polygon = Point[];
  export type Polygons = Polygon[];
}
