import React from "react";

const Spinner = () => {
    return (
        <div className="d-flex justify-content-center" style={{backgroundColor: "#8fc4b7"}}>
            <div className="spinner-border my-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
