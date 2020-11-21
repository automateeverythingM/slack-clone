import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Root from "./components/Router/root";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from "react-router-dom";
import StoreProvider from "./store/configStore";

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
