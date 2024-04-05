import { SvgIconProps } from "@mui/material/SvgIcon";

export interface IconProps extends SvgIconProps {
  component: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}
