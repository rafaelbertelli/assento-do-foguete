import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pizzashop-theme">
      <HelmetProvider>
        <Helmet titleTemplate="%s | pizza.shop" />
        <RouterProvider router={router} />
        <Toaster richColors />
      </HelmetProvider>
    </ThemeProvider>
  );
}
