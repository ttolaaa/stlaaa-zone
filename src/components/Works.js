import React from "react"
import firebaseimage from '../assets/firebase-project.png';
import gliwebsite from '../assets/gliwebsite.png'

export default function Work() {
    return (
        <div className="work">
            <div className="vertical-work-colum-1">
                <div className="horizontal-work">
                    <img src={firebaseimage} alt="Image 1" />
                    <h5>No-code ML with C3 Ex Machina</h5>
                    <p>Enabling AutoML functionality for non technical users</p>
                    <div className="main-button-work">
                        <button className="button-1-work">Button</button>
                        <button className="button-2-work">Button</button>
                    </div>
                </div>
            </div>
            <div className="vertical-work-colum-2">
                <div className="horizontal-work">
                    <img src={gliwebsite} alt="Image 2" />
                    <h5>No-code ML with C3 Ex Machina</h5>
                    <p>Enabling AutoML functionality for non technical users</p>
                    <div className="main-button-work" >
                        <button className="button-1-work" >Button</button>
                        <button className="button-2-work" >Button</button>
                    </div>
                </div>
            </div>
        </div>

    )
}