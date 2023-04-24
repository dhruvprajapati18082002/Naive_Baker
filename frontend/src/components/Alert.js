import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";

const Alert = () => {
    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };

    const { alert } = useContext(alertContext);

    return (
        <div style={{ height: "50px" }}>
            {alert && (
                <div
                    className={`alert alert-${alert.type} alert-dismissible fade show`}
                    role="alert"
                >
                    <strong>
                        {capitalize(alert.type === "danger" ? "error" : alert.type)}
                    </strong>
                    : {alert.message}
                </div>
            )}
        </div>
    );
};

export default Alert;
