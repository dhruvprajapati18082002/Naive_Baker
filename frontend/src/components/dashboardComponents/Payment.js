import React from 'react'
// import "./Payment.css";

const Payment = () => {
    return (
        <section className="h-100 h-custom" style={{ backgroundColor: '#8fc4b7' }}>
            <div className="container py-5 h-100 ">
            <center>
                <div className="card px-4 py-1 container shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{ height: "30rem", width: "50%"}}>
                    <center><p className="h2 py-3">Payment Details</p></center>
                    <center>
                    <p className="text mb-1">(Only at 100/- monthly)</p>
                    </center>

                    <form className="row gx-3">
                        <div className="col-12">
                            <hr/>
                            
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Name</p>
                                <input className="form-control mb-3" type="text" placeholder="Name" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Card Number</p>
                                <input className="form-control mb-3" type="text" placeholder="1234 5678 4356 9716" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Expiry</p>
                                <input className="form-control mb-3" type="text" placeholder="MM/YYYY" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">CVV/CVC</p>
                                <input className="form-control mb-3 pt-2 " type="password" placeholder="***" />
                            </div>
                        </div>
                        <div className="col-12">
                        <center>
                            <br/>
                            <div className="btn btn-primary mb-3">
                                <span className="ps-1">Get Premium</span>
                                <span className="fas fa-arrow-right"></span>
                            </div>
                        </center>
                        </div>
                    </form>
                </div>
                </center>
            </div>

        </section>
    )
}

export default Payment