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
    <div>
      <nav className="nav">
        <div>
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
            <li><a href="https://read.cv/tolaaa" target="_blank" rel="noopener noreferrer" ><button className="resume-button">resume</button></a></li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/about" element={<Aboutme />} />
      </Routes>
    </div>
  );
}

export default App;
