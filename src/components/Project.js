import React from "react"
import firebaseimage from '../assets/firebase-project.png';
import gliwebsite from '../assets/gliwebsite.png'
import mobileapp from '../assets/mobileapp.gif'

export default function Projects() {
    return (
        <div className="project">
            <div className="vertical-project-colum-1">
                <div className="horizontal-project">
                    <img src={mobileapp} alt="Image 1" />
                    <h5>Eiken Vocabulary Enhancement App</h5>
                    <p>Empower Japanese kids to master vocabulary for the Eiken proficiency test through interactive exercises, quizzes, and personalized learning.</p>
                    <div className="main-button-project">
                        <button className="button-1-project">Mobile App</button>
                        <button className="button-2-project">UI/UX</button>
                        <button className="button-3-project">Company Collaboration</button>
                    </div>
                </div>
            </div>
            <div className="vertical-project-colum-2">
                <div className="horizontal-project">
                    <img src={gliwebsite} alt="Image 2" />
                    <h5>Experience Classroom Services Nationwide</h5>
                    <p>web application that enables students to effortlessly purchase online courses and conveniently reserve lessons with experienced teachers.</p>
                    <div className="main-button-project" >
                        <button className="button-web-project">Web Application</button>
                        <button className="button-3-project">Company Collaboration</button>
                    </div>
                </div>
            </div>
        </div>

    )
}