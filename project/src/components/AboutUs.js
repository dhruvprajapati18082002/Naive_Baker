import React, { useState } from 'react'
import { Link } from "react-router-dom"

export default function AboutUs() {

    return (
        <div>
            <div className="accordion">

                <div className="card">
                    <div className="card-header">
                            <h2>About Naive Baker</h2>
                            
                    </div>
                    <div className="card-body">
                        Naive Baker is a simple cooking blog made for all those who love to cook various unique dishes but often have no idea what or how to cook.
                        With our unique features, such as ingredients-based searching, recommendations, and various filters, you need not worry about that any more!
                        All you need to do is sign up on the website and surf various amazing recipes waiting to be cooked. 
                        You can even share your recipes with the world by upgrading to the premium user!
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2>Meet the Makers!</h2>
                    </div>
                    <div className="card-body">
                        We are a team of 9 developers who came together to brainstorm on this fun project as way to create something pertaining to issues faced by people on a daily basis.
                        We hoped to create something simple and interactive which can reach as many people as possible.
                        Below is a brief introduction of each of us and our contribution to the project!
                    </div>

                    <div className="container row">
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Vihar Shah</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Group Representative</li>
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Aditya Raj</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Nikhil Jethanandani</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Dhruv Prajapati</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Priyank Pitliya</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Vinal Boricha</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Deep Rakhasiya</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Gaurav Shah</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>
                        
                        <div className="card col-md-3 mx-3 my-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Shobhit Verma</h5>
                                <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nemo!</p>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Age: 20</li>
                            </ul>
                        </div>

                    </div>

                </div>
  
            </div>
        </div>
    )
}
