import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import InternetConnectionProvider from "./Provider/InternetConnectionProvider";

// 1. Chakra UI theme
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: "#f5faff",
      100: "#e0f0ff",
      500: "#1a365d",
      600: "#153e75",
      700: "#2a69ac",
    },
  },
});



//2. TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// 3. Render App
ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
  <Provider store={store}>
  <InternetConnectionProvider>
      <Router>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </Router>   
  </InternetConnectionProvider>
  </Provider>
    </QueryClientProvider>

);
