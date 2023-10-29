require("file-loader?name=[name].[ext]!./index.html");
import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import "./App.scss";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
