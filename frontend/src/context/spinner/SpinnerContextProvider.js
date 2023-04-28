import spinnerContext from "./spinnerContext";

import React, { useState } from "react";

const SpinnerContextProvider = (props) => {

	const [loading, setLoading] = useState(false);

    return (
        <spinnerContext.Provider value={{ loading, setLoading }}>
            {props.children}
        </spinnerContext.Provider>
    );
};

export default SpinnerContextProvider;
