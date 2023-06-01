import React from "react"
import firebaseimage from '../assets/firebase-project.png';
import gliwebsite from '../assets/gliwebsite.png';
import adminwebsite from '../assets/adminweb.gif';

export default function Work() {
    return (
        <div className="work">
            <div className="vertical-work-colum-1">
                <div className="horizontal-work">
                    <img src={firebaseimage} alt="Image 1" />
                    <h5>firebase cloud: streamline data management efforts</h5>
                    <p>simplify data management for small enterprise app, empowering seamless organization and accessibility of crucial information</p>
                    <div className="main-button-work">
                        <button className="button-1-work">Firebase</button>
                        <button className="button-3-project">Company Collaboration</button>
                    </div>
                </div>
            </div>
            <div className="vertical-work-colum-2">
                <div className="horizontal-work">
                    <img src={adminwebsite} alt="Image 2" />
                    <h5>admin system for managing lesson reservation</h5>
                    <p>lesson reservations with user-friendly Admin System, enabling seamless management for students and teachers.</p>
                    <div className="main-button-work" >
                        <button className="button-web-project" >Web Application</button>
                        <button className="button-3-project" >Company Collaboration</button>
                    </div>
                </div>
            </div>
        </div>

    )
}