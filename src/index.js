import React from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./Styles/globals.css";
import { BrowserRouter as Router } from "react-router-dom";
import Ethers from "./Context/EthersContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ToastContainer />
    {/* /IIm1xrgYITqBO8GZiAYKAhOlYiD9IDehX9q5CDdUbdAdHyoIufCc058LW5RAcitNAdFinBqC6T6KVK4XZ-1F3Q
 */}
    <ThirdwebProvider clientId="d38b4842e9d041746be46984e4baab53">
      <Router>
        <Ethers>
          <App />
        </Ethers>
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);

reportWebVitals();
