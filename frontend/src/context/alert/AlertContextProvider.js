import React, { useState } from "react";
import alertContext from "./alertContext";

const AlertContextProvider = (props) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({ message: message, type: type });
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    return (
        <alertContext.Provider value={{ alert, showAlert }}>
            {props.children}
        </alertContext.Provider>
    );
};

export default AlertContextProvider;
