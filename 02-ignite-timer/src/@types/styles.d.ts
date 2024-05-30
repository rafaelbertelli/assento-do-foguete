import "styled-components";
import { defaultTheme } from "../styles/theme/default";

type ThemeType = typeof defaultTheme;

// sobrescrevendo a interface DefaultTheme do styled-components
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
