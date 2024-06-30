import { createRoot } from "react-dom/client";
import App from "./app/App";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
