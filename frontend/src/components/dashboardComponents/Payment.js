import React, { useContext } from 'react'
import alertContext from "../../context/alert/alertContext";

const Payment = () => {

    const { showAlert } = useContext(alertContext);
    const handleSubmit = (event) => {
        event.preventDefault();
        showAlert("Form Submitted !", "info");
        event.target.reset();
    }

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: '#8fc4b7' }}>
            <div className="container py-5 h-100 ">
            <center>
                <div className="card px-4 py-1 container shadow-lg p-3 mb-5 bg-body-tertiary rounded" style={{maxWidth: "600px"}}>
                    <center><p className="h2 py-3">Payment Details</p></center>
                    <center>
                    <p className="text mb-1">(Only at 100/- monthly)</p>
                    </center>

                    <form className="row gx-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <hr/>
                            
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Name*</p>
                                <input className="form-control mb-3" type="text" placeholder="Name" required minLength={5} maxLength={100}/>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Card Number</p>
                                <input className="form-control mb-3" type="text" placeholder="1234567843569716" required minLength={12} maxLength={12}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">Expiry date*</p>
                                <input className="form-control mb-3" type="date" placeholder="MM/YYYY" required/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="d-flex flex-column">
                                <p className="text mb-1">CVV/CVC</p>
                                <input className="form-control mb-3 pt-2 " type="password" placeholder="***" required minLength={3} maxLength={3}/>
                            </div>
                        </div>
                        <div className="col-12 my-5">
                            <button className='btn btn-primary mb3' type="submit">Get Premium</button>
                        </div>
                    </form>
                </div>
                </center>
            </div>

        </section>
    )
}

export default Payment
