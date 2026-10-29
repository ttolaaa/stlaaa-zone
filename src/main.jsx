import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowDownToLine, ArrowUpRight, AudioLines, Check, CheckCheck, Code2, Download, ExternalLink, Github, Globe2, Layers3, Menu, Moon, Pause, Play, Scissors, Sparkles, Sun, Volume2, WifiOff, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { archive, articles, career, careerImpact, certifications, experience, links, profile, tools } from './data';
import './styles.css';

function External({ href, children, ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return (
    <dialog ref={ref} className="project-dialog" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="dialog-title">
      <div className="dialog-top"><span className="eyebrow">{project.eyebrow}</span><button className="icon-button" onClick={onClose} aria-label="Close project"><X size={20} /></button></div>
      <div className={`dialog-image ${project.id}`}><img src={project.image} alt={project.imageAlt} /></div>
      <div className="dialog-body">
        <h2 id="dialog-title">{project.id === 'eiken' ? 'Eiken Vocabulary App' : project.id === 'gli' ? 'GLI Online Classroom' : project.name}</h2>
        <p>{project.detail}</p>
        <ul className="feature-list">{project.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
        <p className="project-note">{project.notes}</p>
        <External className="button button-dark" href={project.repo || project.source}>{project.repo ? <Github size={17} /> : <Code2 size={17} />}{project.repo ? 'Explore on GitHub' : 'Original case study'}<ArrowUpRight size={17} /></External>
      </div>
    </dialog>
  );
}

function VideoSnippet() {
  const [quality, setQuality] = useState('1080p');
  return (
    <div className="snippet video-snippet">
      <div className="mock-window"><span className="window-dots"><i /><i /><i /></span><span>vdodl / save something good</span><ArrowDownToLine size={13} /></div>
      <div className="video-mock-content">
        <div className="video-url"><span className="tiny-play"><Play size={11} fill="currentColor" /></span><span>One link. All the possibilities.</span><Check size={13} /></div>
        <div className="video-cover"><div className="sun-disc" /><div className="mountain mountain-back" /><div className="mountain mountain-front" /><span className="video-duration">04:32</span><span className="cover-caption">A little off the beaten path.</span></div>
        <div className="quality-label"><span>Make it yours</span><span>SELECT QUALITY</span></div>
        <div className="quality-options" aria-label="Video quality preview">{['720p', '1080p', '4K'].map((item) => <button key={item} aria-pressed={quality === item} onClick={() => setQuality(item)}>{item}{quality === item && <Check size={11} />}</button>)}</div>
      </div>
      <span className="demo-caption">INTERACTIVE UI PREVIEW · NO DOWNLOAD</span>
    </div>
  );
}

function ClippingSnippet() {
  const [duration, setDuration] = useState(30);
  return (
    <div className="snippet clipping-snippet">
      <div className="clip-top"><span><Scissors size={15} /> clipping</span><span className="ai-chip"><Sparkles size={10} /> made for moments</span></div>
      <div className="clip-scenes">
        {[1, 2, 3].map((number) => <div className={`clip-scene scene-${number}`} key={number}><span className="clip-score"><Sparkles size={9} />{[96, 92, 88][number - 1]}</span><div className="scene-orb" /><div className="scene-landscape" /><span className="scene-caption">{['THIS IS', 'the part', 'THAT MATTERS.'][number - 1]}</span><span className="scene-time">{String(Math.floor(duration / 60)).padStart(2, '0')}:{String(duration % 60).padStart(2, '0')}</span></div>)}
      </div>
      <div className="clip-bottom"><span>Find your next moment</span><div aria-label="Clip duration preview">{[15, 30, 60].map((item) => <button key={item} aria-pressed={duration === item} onClick={() => setDuration(item)}>{item}s</button>)}</div></div>
      <span className="demo-caption">INTERACTIVE UI PREVIEW · SAMPLE CLIPS</span>
    </div>
  );
}

function VoiceSnippet() {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState('');
  const utteranceRef = useRef(null);
  useEffect(() => () => { if (utteranceRef.current) window.speechSynthesis?.cancel(); }, []);
  const play = () => {
    setError('');
    if (!('speechSynthesis' in window)) {
      setError('Speech preview is not supported in this browser.');
      return;
    }
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance('Every great story begins with a little curiosity. What will you create today?');
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = (event) => {
      setPlaying(false);
      if (!['canceled', 'interrupted'].includes(event.error)) setError('Voice playback is unavailable. Try your device browser or explore the full project.');
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };
  return (
    <div className="snippet voice-snippet">
      <div className="voice-top"><span><AudioLines size={17} /> storyteller</span><span className="voice-dot" /></div>
      <p className="voice-script">Every great story begins<br />with a little <em>curiosity.</em></p>
      <div className={`waveform ${playing ? 'is-playing' : ''}`} aria-hidden="true">{Array.from({ length: 38 }, (_, index) => <i key={index} style={{ '--bar-height': `${12 + ((index * 17 + 9) % 35)}px`, '--delay': `${index * 32}ms` }} />)}</div>
      <div className="voice-controls"><span><Volume2 size={13} /> Browser voice demo</span><button onClick={play} className="voice-play" aria-label={playing ? 'Stop voice preview' : 'Play voice preview'}>{playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</button></div>
      <span className="demo-caption" role={error ? 'alert' : undefined}>{error || 'A TINY PREVIEW · SOUND ON'}</span>
    </div>
  );
}

function CareerSection() {
  return (
    <section id="experience" className="career-section shell" aria-labelledby="career-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow"><span className="section-index">03 /</span> EXPERIENCE & IMPACT</span>
          <h2 id="career-title">From interfaces to <span className="serif-word">infrastructure.</span></h2>
        </div>
        <External className="text-link" href={links.linkedin}>My career on LinkedIn <ArrowUpRight size={16} /></External>
      </div>
      <div className="impact-grid" aria-label="Selected career outcomes">
        {careerImpact.map((impact) => (
          <div className="impact-card" key={impact.detail}>
            <strong>{impact.value}</strong>
            <span>{impact.label}</span>
            <p>{impact.detail}</p>
          </div>
        ))}
      </div>
      <div className="career-grid">
        <div className="career-timeline">
          {career.map((role) => (
            <article className="role-card" key={role.company} aria-label={`${role.title} at ${role.company}`}>
              <div className="role-meta">
                <span>{role.dates}</span>
                {role.current && <span className="current-role"><span className="status-dot" /> CURRENT CHAPTER</span>}
              </div>
              <h3>{role.title}</h3>
              <div className="role-company"><span>{role.company}</span><span>{role.location}</span></div>
              <p className="role-summary">{role.summary}</p>
              <ul>{role.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
              <div className="tags">{role.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
        <aside className="certifications" aria-labelledby="certifications-title">
          <span className="eyebrow">KEEP GETTING BETTER</span>
          <h3 id="certifications-title">Learning, validated.</h3>
          <p>Certifications & professional development</p>
          <ul>
            {certifications.map((certificate) => (
              <li key={certificate.name}>
                <span className="certificate-icon"><CheckCheck size={16} /></span>
                <div>
                  <h4>{certificate.name}</h4>
                  <p>{certificate.issuer} <span>·</span> {certificate.date}</p>
                  {certificate.note && <span className="certificate-note">{certificate.note}</span>}
                </div>
              </li>
            ))}
          </ul>
          <External className="text-link" href={links.linkedin}>See credentials on LinkedIn <ArrowUpRight size={14} /></External>
        </aside>
      </div>
    </section>
  );
}

function App() {
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try { return (localStorage.getItem('tola-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark'; }
    catch { return window.matchMedia('(prefers-color-scheme: dark)').matches; }
  });
  const [storageError, setStorageError] = useState('');
  const [online, setOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installHelp, setInstallHelp] = useState(false);
  const [installed, setInstalled] = useState(window.matchMedia('(display-mode: standalone)').matches);
  const [pwaError, setPwaError] = useState('');
  const serviceWorkerRef = useRef(null);
  const { offlineReady: [offlineReady, setOfflineReady] } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_url, registration) { serviceWorkerRef.current = registration; },
    onRegisterError(error) { console.error('Service worker registration failed:', error); setPwaError('Offline setup failed. You can still browse online; reload to try again.'); },
  });

  useEffect(() => {
    const checkForUpdate = () => {
      if (!navigator.onLine || document.visibilityState !== 'visible') return;
      serviceWorkerRef.current?.update().catch((error) => {
        console.error('Portfolio update check failed:', error);
        setPwaError('Could not check for updates. Reconnect or reload to try again.');
      });
    };
    const interval = window.setInterval(checkForUpdate, 60_000);
    window.addEventListener('online', checkForUpdate);
    window.addEventListener('focus', checkForUpdate);
    document.addEventListener('visibilitychange', checkForUpdate);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('online', checkForUpdate);
      window.removeEventListener('focus', checkForUpdate);
      document.removeEventListener('visibilitychange', checkForUpdate);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = dark ? '#18221d' : '#f5f5ef';
  }, [dark]);
  useEffect(() => {
    const handleOnline = () => setOnline(navigator.onLine);
    const handlePrompt = (event) => { event.preventDefault(); setInstallPrompt(event); };
    const handleInstalled = () => { setInstalled(true); setInstallPrompt(null); setInstallHelp(false); };
    const handleHash = () => {
      if (['#about', '#experience', '#notes', '#work'].includes(window.location.hash)) setMenuOpen(false);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOnline);
    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('appinstalled', handleInstalled);
    window.addEventListener('hashchange', handleHash);
    if (window.location.pathname === '/about') document.getElementById('about')?.scrollIntoView();
    if (window.location.pathname === '/eiken-app-case-study') setSelected(experience[0]);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOnline);
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem('tola-theme', next ? 'dark' : 'light'); }
    catch { setStorageError('Your theme changed, but this browser cannot save it for your next visit.'); }
  };
  const install = async () => {
    if (!installPrompt) { setInstallHelp(!installHelp); return; }
    try {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      setInstallPrompt(null);
    } catch (error) {
      console.error('App installation failed:', error);
      setPwaError('Installation could not start. Use your browser menu to install or add to Home Screen.');
    }
  };
  const showTools = filter === 'All work' || filter === 'Tools';
  const visibleExperience = experience.filter((project) => filter === 'All work' || project.category === filter);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header shell">
        <a href="#" className="brand" aria-label="Tola home"><span className="brand-mark">t.</span><span>tolaaa<span className="brand-period">.</span></span></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><a href="#work" onClick={() => setMenuOpen(false)}>Work <span>05</span></a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#notes" onClick={() => setMenuOpen(false)}>Notes</a></nav>
        <div className="header-actions"><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button><External className="header-contact" href={links.linkedin}>Let's talk <ArrowUpRight size={16} /></External><button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="location"><span className="status-dot" /> A BUILDER'S CORNER OF THE INTERNET <span className="location-line" /></div>
            <h1 id="hero-title">Made with care.<br />Built for <span className="serif-word">impact.</span><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
            <p className="hero-description">Hey, I'm {profile.name}. {profile.role} at {profile.company}.<br className="desktop-break" /> Building reliable infrastructure and thoughtful digital tools.</p>
            <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDown size={16} /></a><External className="text-link" href={links.github}><Github size={17} /> A peek at my GitHub <ArrowUpRight size={14} /></External></div>
            <div className="hero-footnote"><Globe2 size={14} /><span>{profile.location}</span><span className="footnote-divider" /><span>{profile.company} · since {profile.since}</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of the design and development process" role="img">
            <div className="hero-art-canvas">
            <div className="art-grid" /><div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <span className="art-label label-one"><span className="label-dot" /> A LITTLE DESIGN</span>
            <div className="art-browser"><div className="art-browser-top"><span className="window-dots"><i /><i /><i /></span><span>something-good.app</span><ExternalLink size={10} /></div><div className="art-browser-body"><span className="art-kicker">SMALL IDEAS, REAL POSSIBILITIES</span><div className="art-headline">Make room<br />for <em>better.</em></div><div className="art-lines"><i /><i /></div><div className="art-cta"><span>Let's make it happen</span><ArrowUpRight size={12} /></div><div className="art-flower" aria-hidden="true">✳</div></div></div>
            <div className="art-code"><div><span className="code-dot" /><span>the good stuff.js</span><Code2 size={13} /></div><p><span>const</span> idea = <b>curiosity</b>;<br /><span>function</span> <b>makeItReal</b>() {'{'}<br />&nbsp; return design + code;<br />{'}'}</p></div>
            <span className="art-label label-two"><Code2 size={12} /> A LOT OF MAKING</span><span className="art-sparkle sparkle-one">+</span><span className="art-sparkle sparkle-two">+</span>
            <div className="art-caption"><span className="small-star">✳</span> from a "what if" to a "here it is."</div>
            </div>
          </div>
        </section>
        <div className="discipline-strip"><div className="shell strip-inner"><span>GOOD EXPERIENCES DON'T HAPPEN BY ACCIDENT.</span><div><span>Design with empathy</span><span className="strip-star">✳</span><span>Build with purpose</span><span className="strip-star">✳</span><span>Keep getting better</span></div></div></div>
        <section id="work" className="work-section shell" aria-labelledby="work-title">
          <div className="section-heading"><div><span className="eyebrow"><span className="section-index">01 /</span> SELECTED WORK</span><h2 id="work-title">A few things I've <span className="serif-word">made.</span></h2></div><p>A mix of practical tools, learning experiences,<br className="desktop-break" /> and ideas that made it out of my notebook.</p></div>
          <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter projects">{['All work', 'Tools', 'Product design', 'Web apps'].map((item) => <button className={filter === item ? 'active' : ''} key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All work' && <span>05</span>}</button>)}</div><span className="work-count" aria-live="polite">{String((showTools ? tools.length : 0) + visibleExperience.length).padStart(2, '0')} projects / made with care</span></div>
          {showTools && <><div className="collection-label"><span className="status-dot" /> THE TOOLBOX <span>Small tools. Real-world problems.</span></div><div className="tools-grid">{tools.map((project, index) => <article className={`tool-card ${project.id}`} key={project.id}>{index === 0 ? <VideoSnippet /> : index === 1 ? <ClippingSnippet /> : <VoiceSnippet />}<div className="tool-content"><div className="card-title-row"><h3>{project.name}</h3><span className="project-number">0{index + 1}</span></div><p className="tool-subtitle">{project.subtitle}</p><p className="card-description">{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-link" onClick={() => setSelected(project)}>Explore project <ArrowUpRight size={17} /></button></div></article>)}</div></>}
          {visibleExperience.length > 0 && <><div className="collection-label experience-label"><Layers3 size={14} /> DESIGN MEETS DELIVERY <span>From understanding to something useful.</span></div><div className="experience-grid">{visibleExperience.map((project) => <article className={`experience-card ${project.id}`} key={project.id}><button className="experience-image" onClick={() => setSelected(project)} aria-label={`View ${project.eyebrow} case study`}><div className="experience-image-label"><span>{project.id === 'eiken' ? 'LEARNING, ONE WORD AT A TIME' : 'YOUR NEXT LESSON STARTS HERE'}</span><ArrowUpRight size={20} /></div><img src={project.image} alt={project.imageAlt} loading="lazy" width="1000" height="650" /><span className="image-footnote">{project.id === 'eiken' ? 'RESEARCH → DESIGN → FLUTTER' : 'PRODUCT DESIGN → WEB DEVELOPMENT'}</span></button><div className="experience-content"><span className="eyebrow">{project.eyebrow}</span><h3><button onClick={() => setSelected(project)}>{project.name}<ArrowUpRight size={20} /></button></h3><p className="card-description">{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></>}
          {filter === 'All work' && <details className="archive"><summary><span>And a few more along the way <span className="archive-count">03</span></span><span className="archive-label">OPEN THE ARCHIVE <span className="archive-plus">+</span></span></summary><div className="archive-grid">{archive.map((project) => <div key={project.name}><span className="eyebrow">{project.type}</span><h3>{project.name}</h3><p>{project.description}</p></div>)}</div></details>}
        </section>
        <section id="about" className="about-section" aria-labelledby="about-title"><div className="shell about-grid">
          <div className="about-photo"><img src="/images/tola.png" alt="Tola Som, Microsoft Data Center Technician and digital product builder" loading="lazy" width="600" height="700" /><div className="photo-note"><span>Hi, I'm Tola.</span><span className="small-star">✳</span></div><span className="photo-caption">A HUMAN BEHIND THE SYSTEMS.</span></div>
          <div className="about-copy"><span className="eyebrow"><span className="section-index">02 /</span> A LITTLE ABOUT ME</span><h2 id="about-title">Curiosity is the<br /><span className="serif-word">common thread.</span></h2><p className="about-lead">I like understanding how things work.<br />And how they can work better for people.</p><p>I'm a Data Center Technician at Microsoft in Tokyo, where I work on AI and GPU infrastructure deployments, troubleshooting, and operational automation. I bring the same care to a datacenter rollout as I do to a digital product: understand the problem, simplify the process, and make it reliable.</p><p>Before Microsoft, I spent December 2020 to May 2024 as a System Engineer, designing and delivering education platforms. My Computer Science journey began at Kirirom Institute of Technology in Cambodia on a full scholarship. I still build creative tools, write, and share what I learn.</p><div className="about-values"><span><Sparkles size={16} /> People first</span><span><Code2 size={16} /> Automate thoughtfully</span><span><Layers3 size={16} /> Keep improving</span></div><External className="text-link" href={links.linkedin}>More of my story on LinkedIn <ArrowUpRight size={16} /></External></div>
        </div></section>
        <CareerSection />
        <section id="notes" className="notes-section shell" aria-labelledby="notes-title"><div className="section-heading"><div><span className="eyebrow"><span className="section-index">04 /</span> NOTES & SIDE QUESTS</span><h2 id="notes-title">Learning out <span className="serif-word">loud.</span></h2></div><External className="text-link" href={links.medium}>All writing on Medium <ArrowUpRight size={16} /></External></div><div className="notes-grid">{articles.map((article, index) => <External href={article.href} className="note-card" key={article.title}><div><span className="eyebrow">{article.category}</span><span className="note-number">0{index + 1}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className="note-bottom">Read the story <ArrowUpRight size={18} /></span></External>)}</div></section>
        <section className="contact-section shell" aria-labelledby="contact-title"><div className="contact-panel"><div><span className="eyebrow">GOOD THINGS START WITH A CONVERSATION.</span><h2 id="contact-title">Got a little <span className="serif-word">what if?</span></h2><p>Let's turn it into something useful.</p></div><External className="button button-dark" href={links.linkedin}>Say hello <ArrowUpRight size={18} /></External><span className="contact-flower" aria-hidden="true">✳</span></div></section>
      </main>
      <footer className="site-footer shell"><div className="footer-top"><a href="#" className="brand" aria-label="Tola home"><span className="brand-mark">t.</span><span>tolaaa.</span></a><p>A little design. A lot of making.</p><div className="footer-links"><External href={links.github}>GitHub <ArrowUpRight size={13} /></External><External href={links.linkedin}>LinkedIn <ArrowUpRight size={13} /></External><External href={links.medium}>Medium <ArrowUpRight size={13} /></External><External href={links.youtube}>YouTube <ArrowUpRight size={13} /></External></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Tola. Built with intention.</span><div className="install-wrap">{!installed && <button className="install-button" onClick={install}><Download size={13} /> Install this little corner <ArrowUpRight size={12} /></button>}{installed && <span><CheckCheck size={13} /> Installed & ready to explore</span>}{installHelp && <div className="install-help" role="status"><strong>Keep this corner close.</strong><p>On iPhone or iPad: open in Safari, tap Share, then Add to Home Screen. In Chrome or Edge, use the browser menu's Install app option. Installation needs HTTPS and a supported browser.</p><button className="text-link" onClick={() => setInstallHelp(false)}>Got it <Check size={14} /></button></div>}</div><a href="#main">Back to top <ArrowUpRight size={13} /></a></div></footer>
      {selected && <ProjectDialog key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      {(!online || offlineReady || pwaError || storageError) && <div className="pwa-notice" role="status">{!online ? <><WifiOff size={17} /><span>You're offline. The portfolio is still here; external projects need a connection.</span></> : pwaError || storageError ? <><span>{pwaError || storageError}</span><button aria-label="Dismiss notification" onClick={() => { setPwaError(''); setStorageError(''); }}><X size={16} /></button></> : <><CheckCheck size={17} /><span>This little corner is ready for offline visits.</span><button aria-label="Dismiss offline ready notification" onClick={() => setOfflineReady(false)}><X size={16} /></button></>}</div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
