import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productContext";
import { FilterContextProvider } from "./context/filterContext";
import { CartContextProvider } from "./context/cartContext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
        domain="dev-47vnmbccsysa5xpy.us.auth0.com"
        clientId="O8QKi7p9GruDgtFiku0dG9dUnLRowQ3F"
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <AppProvider>
            <FilterContextProvider>
                <CartContextProvider>
                    <App />
                </CartContextProvider>
            </FilterContextProvider>
        </AppProvider>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
