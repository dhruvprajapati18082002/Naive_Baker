import React, { useContext } from "react";
import alertContext from "../../context/alert/alertContext";

const forgotpass = () => {

    const { showAlert } = useContext(alertContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        showAlert("Still Working on it...", "info");
    }

    return (
        <section
            className="h-100 h-custom"
            style={{ backgroundColor: "#8fc4b7" }}
        >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                                    Forgot Password?
                                </h3>

                                <form className="px-md-2" onSubmit={handleSubmit}>
                                    {/* this is for email input */}
                                    <div className="form-outline mb-4">
                                        <label
                                            className="form-label"
                                            htmlFor="name"
                                        >
                                            Enter your registered e-mail*
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="enter email"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-lg mb-1"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default forgotpass;
