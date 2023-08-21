import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import theme from "./theme";
import { Layout } from "./components";
import { CreditsPage, HomePage, PlayPage } from "./pages";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="/play" element={<PlayPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
