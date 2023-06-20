import React from "react"
import firebaseimage from '../assets/firebase-project.png';
import gliwebsite from '../assets/gliwebsite.png';
import adminwebsite from '../assets/adminweb.gif';
import glowtracker from '../assets/glowtracker.gif'

export default function PersonalProject() {
    return (
        <div className="work">
            <div className="vertical-work-colum-1">
                <div className="horizontal-work">
                    <img  src={glowtracker} alt="Image 1" />
                    <h5>glowtracker: your daily buddy</h5>
                    <p>GlowTracker is a comprehensive web app designed to help you achieve and maintain radiant, healthy skin. By combining skincare tracking, nutritional monitoring, and weight management, GlowTracker offers a holistic approach to enhancing your skin's natural glow.</p>
                    <div className="main-button-work">
                        <button className="button-1-work">Hobby</button>
                        <button className="button-3-project">Personal Project</button>
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