import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import UserContextProvider from "./context/user/UserContextProvider";
import AlertContextProvider from "./context/alert/AlertContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <AlertContextProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </AlertContextProvider>
    </React.StrictMode>
);
