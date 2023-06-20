import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
export default function ProjectSample() {
    return (
        <div className="project-mobile">
            <div className="text-project-mobile">
                <h5>November 2021 - December 2022.</h5>
                <hr className='line'></hr>
                <h3>Eiken Vocabulary Enhancement Mobile Application </h3>
                <p className='paragraph-project-mobile'>I contribute to developing and maintaining software solutions that support the cram school's operations and enhance the learning experience for students. It's an incredible opportunity to utilize my skills in this dynamic educational environment and empower students on their academic journey. I'm constantly driven to learn and grow in Information Technology, particularly exploring unique touch-points between people, motivations, and experiences.</p>
                <p className='paragraph-project-mobile'>I'm Currently seeking new opportunities to gain experience and enhance my skills further.</p>
                <p className='paragraph-project-mobile' >Go to My blog    <FontAwesomeIcon icon={faCircleArrowRight} /></p>
                
            </div>

            <div>

            </div>

        </div>
    );
}
