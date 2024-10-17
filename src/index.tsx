import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./hoc/Apollo";
import AppRoute from "./hoc/Routes";
import "./styles/globals.scss";
import m from "./styles/globals.module.scss";
import { AuthProvider } from "./hoc/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <div className={m.container_bu}>
        <div className={m.columns}>
          <AuthProvider>
            <AppRoute />
          </AuthProvider>
        </div>
      </div>
    </ApolloProvider>
  </React.StrictMode>,
);

reportWebVitals();
