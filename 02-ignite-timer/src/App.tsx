import { ThemeProvider } from "styled-components";

import { Button } from "./components/Button";

import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/theme/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary">Oi 1</Button>
      <Button variant="secondary">Oi 2</Button>
      <Button variant="success">Oi 3</Button>
      <Button variant="danger">Oi 4</Button>
      <Button>Oi 5</Button>

      <GlobalStyles />
    </ThemeProvider>
  );
}
