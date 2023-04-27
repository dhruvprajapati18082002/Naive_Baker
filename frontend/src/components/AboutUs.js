import React from 'react'
import developers from "../developers.json";
import "./fonts/BunchBlossomsPersonalUse-0nA4.ttf";


export default function AboutUs() {
    return (
        <div>
            <div style={{ backgroundColor: '#8fc4b7' }}>

                <div className="container py-5">
                    <div className="row h-100 align-items-center py-5">
                        <div className="col-lg-6">
                            <h1 className="display-4" style={{ fontFamily: 'BunchBlossomsPersonalUse-0nA4' }} >About us:</h1>
                            <p className="lead text-muted mb-0">We work here to make your cooking experience memorable. <br />  Many people look for “what to cook ?” or “How to cook something?” on the internet, or they want to share his/hers findings with the world. This website will help all those people who want an answer to all those questions easily. Here users can easily search for recipes with different search methods mentioned. One can upload their recipes and showcase their talent to the world.
                            </p>
                        </div>

                        <div className="col-lg-6 d-none d-lg-block">
                            <img src="https://www.pngall.com/wp-content/uploads/12/Cooking-PNG-Free-Image.png" alt="" className="img-fluid" />
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">

                        <div className="col-lg-6 order-2 order-lg-1"><i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light" style={{ fontFamily: 'BunchBlossomsPersonalUse-0nA4' }}>Perks of being a member</h2>
                            <p className="font-italic text-muted mb-4">On being a member of 'Naive Baker', you can have your personalized dashboard where they can upload your own recipes and even save different recipes. Enjoy cooking!!</p><a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
                        </div>

                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/021/617/170/small/member-card-3d-render-icon-illustration-png.png" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-5 px-5 mx-auto">
                            <img src="https://www.pngarts.com/files/8/Mobile-App-PNG-Image-Transparent-Background.png" alt="" className="img-fluid mb-4 mb-lg-0" />
                        </div>
                        <div className="col-lg-6"><i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light" style={{ fontFamily: 'BunchBlossomsPersonalUse-0nA4' }}>Future Plans</h2>
                            <p className="font-italic text-muted mb-4">We are planning to make a mobile application to make Naive Baker reach everyone and everywhere.</p><a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">Learn More</a>
                        </div>
                    </div>

                </div>
            </div>

            <div style={{ backgroundColor: '#8fc4b7' }}>
                <div className="container py-5">
                    <div className="row mb-4">
                        <div className="col-lg-5">
                            <h2 className="display-4 font-weight-light" style={{ fontFamily: 'BunchBlossomsPersonalUse-0nA4' }}>Our team</h2>

                        </div>
                    </div>

                    <div className="row text-center">

                        {
                            developers.map((dev, key) => {
                                return (
                                    <div className="col-xl-3 col-sm-6 mb-5" key={key}>
                                        <div className="bg-white rounded shadow-sm py-5 px-4">
                                            <img src={dev.img} width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                            <h5 className="mb-0">{dev.name}</h5>
                                            {
                                                dev.roles.map((role, key) => {
                                                    return (
                                                        <div key={key}>{role}</div>
                                                    )
                                                })
                                            }
                                            <ul className="social mb-0 list-inline mt-3">
                                                <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-facebook-f"></i></a></li>
                                                <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-twitter"></i></a></li>
                                                <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-instagram"></i></a></li>
                                                <li className="list-inline-item"><a href="#" className="social-link"><i className="fa fa-linkedin"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h2>Feedback Form</h2>

                        <form className="d-flex flex-column justify-content-center align-items-center g-3 needs-validation" noValidate>
                    
                            <div className="col-md-5">
                                <div className='input-group my-2'>
                                    <label className="input-group-text"> Email </label>
                                    <input type="text" className="form-control" minLength={0}  maxLength={30} id="validationCustom02" placeholder="here " required />
                                </div>
                            </div>
                        
                            <div className="col-md-5">
                                <div className='input-group my-2'>
                                    <label className="input-group-text"> Provide Feedback here </label>
                                    <textarea className="form-control" minLength={0}  maxLength={150} id="validationCustom02" placeholder="here " required />
                                </div>
                            </div>
        
                            <div className="col-md-5">
                                <div className="input-group my-2">
                                    <label className="input-group-text" id="inputGroupPrepend">Ratings</label>
                                    <input type="number" className="form-control" min ={1} max ={5}  id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                                </div>
                            </div>
                            
                            <div className="col-12 my-3">
                                <button className="btn btn-primary" type="submit">Submit form</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}