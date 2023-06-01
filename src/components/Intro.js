import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import introCard from '../assets/intro-card.png'
import Projects from './Project';

export default function Intro() {
  return (

    <div>
      <div className='intro'>
        <div className="image-intro">
          <img className="img-intro" src={introCard} alt="My Image" />
        </div>
        <div className="text-intro">
          <p className='paragraph-intro'>Hey there! I'm<b> Tola (トラーです🐰)</b>.</p>
          <p className='paragraph-intro'>I'm a <b>Software Developer</b> based in Tokyo🗼🧪</p>
          <p className='paragraph-intro'>I contribute to developing and maintaining software solutions that support the cram school's operations and enhance the learning experience for students. It's an incredible opportunity to utilize my skills in this dynamic educational environment and empower students on their academic journey. I'm constantly driven to learn and grow in Information Technology, particularly exploring unique touch-points between people, motivations, and experiences.</p>
          <p className='paragraph-intro'>I'm Currently seeking new opportunities to gain experience and enhance my skills further.</p>
          <p className='paragraph-intro' >Go to My blog    <FontAwesomeIcon icon={faCircleArrowRight} /></p>
          <ul className="social-icon">
            <a href="https://medium.com/@somtola" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={faMediumM} className="social-icon-white" /></a>
            <a href="https://www.linkedin.com/in/som-tola/" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={faLinkedin} className="social-icon-white" /></a>
            <a href="https://github.com/ttolaaa" target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={faGithub} className="social-icon-white" /></a>
            <a href='https://www.instagram.com/cornsaladddd21/' target='_blank' rel='noopener noreferrer' >
              <FontAwesomeIcon icon={faInstagram} className="social-icon-white" />
            </a>

          </ul>
        </div>

      </div>

      <Projects />
      
    </div>
  );
}
