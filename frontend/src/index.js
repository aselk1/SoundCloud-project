import React from "react";

import "./index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import { ModalProvider } from "./context/Modal";

//setup store
const store = configureStore();

//window store for dev testing
if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}


//Root functional component
function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
