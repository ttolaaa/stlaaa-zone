import React, { useEffect, useState } from 'react';
import Intro from './components/Intro';
import Aboutme from './components/Aboutme';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';


function App() {
  useEffect(() => {
    document.title = 'tola';
  }, []);

  const [activeNavItem, setActiveNavItem] = useState('');
  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
  }
  return (
    <Router>
      <div>
        <nav className="nav">
          <div>
            {/* <Link to="/" className={`stie-title ${activeNavItem !== '' ? 'no-underline' : ''}`}
              onClick={() => handleNavItemClick('')}>
              Tolaa
            </Link> */}
          </div>
          <div>
            <ul className="nav-list">
              <li>
                <Link to="/"
                  onClick={() => handleNavItemClick('portfolio')}
                  className={activeNavItem === 'portfolio' ? 'active' : ''}
                >
                  work
                </Link>
              </li>
              <li>
                <Link to="/about"
                  onClick={() => handleNavItemClick('about')}
                  className={activeNavItem === 'about' ? 'active' : ''}
                >
                  about
                </Link>
              </li>

              {/* <li>
                <Link to="/skill"
                  onClick={() => handleNavItemClick('skill')}
                  className={activeNavItem === 'skill' ? 'active' : ''}
                >
                  Skills
                </Link>
              </li> */}

              {/* <li>
                <Link to="/contact"
                  onClick={() => handleNavItemClick('contact')}
                  className={activeNavItem === 'contact' ? 'active' : ''}
                >
                  Contact
                </Link>
              </li> */}

              {/* <li>
                <a href='https://www.linkedin.com/in/som-tola/' target='_blank' rel='noopener noreferrer' >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li> */}
              {/* <li>
                <a href='https://medium.com/@somtola' target="_blank" rel="noopener noreferrer" >
                  <FontAwesomeIcon icon={faMedium} />
                </a>
              </li> */}
              {/* <li>
                <a href='https://www.instagram.com/cornsaladddd21/' target='_blank' rel='noopener noreferrer' >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li> */}

              <li><button className="resume-button">resume</button></li>
            </ul>
          </div>
        </nav>


        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/about" element={<Aboutme />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
