import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, AudioLines, BadgeCheck, Building2, Check, CheckCheck, Code2, Cpu, ExternalLink, Github, Globe2, Layers3, Linkedin, Menu, Moon, Pause, Play, Scissors, ServerOff, ShieldCheck, Sparkles, Sun, Users, Volume2, WifiOff, Wrench, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { archive, articles, career, certifications, experience, infrastructureWork, journey, links, profile, tools } from './data';
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

function LittleTree() {
  return (
    <svg className="little-tree" viewBox="0 0 48 56" aria-hidden="true" focusable="false">
      <path className="tree-trunk" d="M22 34h4v16a2 2 0 0 1-4 0z" />
      <path className="tree-branch" d="M24 42c3-1 6-4 7-7" />
      <circle className="tree-leaf-back" cx="15" cy="27" r="11" />
      <circle className="tree-leaf-back" cx="33" cy="26" r="10" />
      <circle className="tree-leaf" cx="24" cy="18" r="14" />
      <circle className="tree-leaf-light" cx="19" cy="13" r="4.5" />
      <path className="tree-ground" d="M10 51c9-3 19-3 28 0" />
    </svg>
  );
}

const workIcons = { 'new-capacity': Building2, 'ai-gpu': Cpu, breakfix: Wrench, decommission: ServerOff };

function ImpactSection() {
  return (
    <section id="impact" className="impact-section shell" aria-labelledby="impact-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow"><span className="section-index">01 /</span> WHAT I DO AT MICROSOFT</span>
          <h2 id="impact-title">Real infrastructure. <span className="serif-word">Explained simply.</span></h2>
        </div>
        <p className="impact-flow">Deploy <ArrowRight size={14} aria-hidden="true" /> Maintain <ArrowRight size={14} aria-hidden="true" /> Retire</p>
      </div>
      <div className="impact-grid">
        {infrastructureWork.map((work) => {
          const Icon = workIcons[work.id];
          return (
            <article className={`impact-card ${work.id}`} key={work.id} aria-labelledby={`${work.id}-title`}>
              <div className="impact-card-top"><span className="impact-icon"><Icon size={22} /></span><span className="impact-stage">{work.stage}</span></div>
              <h3 id={`${work.id}-title`}>{work.title}</h3>
              <p className="impact-short">{work.short}</p>
              <p className="impact-highlight"><strong>{work.highlight.value}</strong><span>{work.highlight.label}</span></p>
              <p className="impact-role">{work.role}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CareerSection() {
  return (
    <section id="experience" className="career-section shell" aria-labelledby="career-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow"><span className="section-index">02 /</span> EXPERIENCE</span>
          <h2 id="career-title">From interfaces to <span className="serif-word">infrastructure.</span></h2>
        </div>
        <External className="text-link" href={links.linkedin}>My career on LinkedIn <ArrowUpRight size={16} /></External>
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
    const handleHash = () => {
      if (['#about', '#experience', '#impact', '#notes', '#work'].includes(window.location.hash)) setMenuOpen(false);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOnline);
    window.addEventListener('hashchange', handleHash);
    if (window.location.pathname === '/about') document.getElementById('about')?.scrollIntoView();
    if (window.location.pathname === '/eiken-app-case-study') setSelected(experience[0]);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOnline);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    try { localStorage.setItem('tola-theme', next ? 'dark' : 'light'); }
    catch { setStorageError('Your theme changed, but this browser cannot save it for your next visit.'); }
  };
  const showTools = filter === 'All work' || filter === 'Tools';
  const visibleExperience = experience.filter((project) => filter === 'All work' || project.category === filter);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header shell">
        <a href="#" className="brand" aria-label="Tola home"><span className="brand-mark">t.</span><span>tolaaa<span className="brand-period">.</span></span></a>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><a href="#impact" onClick={() => setMenuOpen(false)}>What I do</a><a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a><a href="#work" onClick={() => setMenuOpen(false)}>Projects <span>05</span></a><a href="#about" onClick={() => setMenuOpen(false)}>About</a></nav>
        <div className="header-actions"><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button><External className="header-contact" href={links.linkedin}>Let's talk <ArrowUpRight size={16} /></External><button className="icon-button menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="location"><span className="status-dot" /> 6 YEARS IN IT · MICROSOFT JAPAN <span className="location-line" /></div>
            <h1 id="hero-title">built for impact.<LittleTree /><br />from code to <span className="serif-word">cloud.</span><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
            <p className="hero-description"><span className="hello">Ciao<span className="hello-wave" aria-hidden="true">👋</span></span> <br/>This is {profile.name}. I spent 3.5 years as a system developer, building customer-facing web application. In May 2024, I made the decision to transition from software engineering to hardware operations. Little did I know how quickly AI would accelerate. Since then, I have taken the lead on datacenter capacity expansion, AI GPU deployments, server maintenance, and decommissioning at Microsoft Japan.</p>
            <div className="hero-actions"><a className="button button-dark" href="#impact">See what I do <ArrowDown size={16} /></a><External className="text-link" href={links.linkedin}><Linkedin size={17} /> Connect on LinkedIn <ArrowUpRight size={14} /></External></div>
            <div className="hero-footnote"><BadgeCheck size={14} /><span>ITIL® 4 Foundation certified</span><span className="footnote-divider" /><Globe2 size={14} /><span>{profile.location}</span></div>
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
        <section className="glance shell" aria-label="Career at a glance">
          <div className="glance-years"><span className="eyebrow">CAREER AT A GLANCE</span><strong>6+</strong><span>years in IT</span></div>
          <ol className="glance-timeline">
            {journey.map((step) => (
              <li className={step.current ? 'is-current' : step.next ? 'is-next' : undefined} key={step.dates}>
                <span className="glance-dot" aria-hidden="true" />
                <span className="glance-date">{step.dates}</span>
                <strong>{step.title}</strong>
                <span className="glance-detail">{step.detail}</span>
              </li>
            ))}
          </ol>
          <div className="glance-badge"><ShieldCheck size={24} /><div><strong>ITIL® 4 Foundation</strong><span>IT service management · certified</span></div></div>
        </section>
        <div className="discipline-strip"><div className="shell strip-inner"><span>HOW I WORK</span><div><span>Safety & security first</span><span className="strip-star">✳</span><span>Lead across teams</span><span className="strip-star">✳</span><span>Automate the repetitive</span></div></div></div>
        <ImpactSection />
        <CareerSection />
        <section id="work" className="work-section shell" aria-labelledby="work-title">
          <div className="section-heading"><div><span className="eyebrow"><span className="section-index">03 /</span> THINGS I'VE BUILT</span><h2 id="work-title">Software &amp; side <span className="serif-word">projects.</span></h2></div><p>From my software engineering years to the tools<br className="desktop-break" /> I still build for fun and real-world problems.</p></div>
          <div className="work-toolbar"><div className="filters" role="group" aria-label="Filter projects">{['All work', 'Tools', 'Product design', 'Web apps'].map((item) => <button className={filter === item ? 'active' : ''} key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All work' && <span>05</span>}</button>)}</div><span className="work-count" aria-live="polite">{String((showTools ? tools.length : 0) + visibleExperience.length).padStart(2, '0')} projects / made with care</span></div>
          {showTools && <><div className="collection-label"><span className="status-dot" /> THE TOOLBOX <span>Small tools. Real-world problems.</span></div><div className="tools-grid">{tools.map((project, index) => <article className={`tool-card ${project.id}`} key={project.id}>{index === 0 ? <VideoSnippet /> : index === 1 ? <ClippingSnippet /> : <VoiceSnippet />}<div className="tool-content"><div className="card-title-row"><h3>{project.name}</h3><span className="project-number">0{index + 1}</span></div><p className="tool-subtitle">{project.subtitle}</p><p className="card-description">{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="project-link" onClick={() => setSelected(project)}>Explore project <ArrowUpRight size={17} /></button></div></article>)}</div></>}
          {visibleExperience.length > 0 && <><div className="collection-label experience-label"><Layers3 size={14} /> DESIGN MEETS DELIVERY <span>From understanding to something useful.</span></div><div className="experience-grid">{visibleExperience.map((project) => <article className={`experience-card ${project.id}`} key={project.id}><button className="experience-image" onClick={() => setSelected(project)} aria-label={`View ${project.eyebrow} case study`}><div className="experience-image-label"><span>{project.id === 'eiken' ? 'LEARNING, ONE WORD AT A TIME' : 'YOUR NEXT LESSON STARTS HERE'}</span><ArrowUpRight size={20} /></div><img src={project.image} alt={project.imageAlt} loading="lazy" width="1000" height="650" /><span className="image-footnote">{project.id === 'eiken' ? 'RESEARCH → DESIGN → FLUTTER' : 'PRODUCT DESIGN → WEB DEVELOPMENT'}</span></button><div className="experience-content"><span className="eyebrow">{project.eyebrow}</span><h3><button onClick={() => setSelected(project)}>{project.name}<ArrowUpRight size={20} /></button></h3><p className="card-description">{project.description}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></>}
          {filter === 'All work' && <details className="archive"><summary><span>And a few more along the way <span className="archive-count">03</span></span><span className="archive-label">OPEN THE ARCHIVE <span className="archive-plus">+</span></span></summary><div className="archive-grid">{archive.map((project) => <div key={project.name}><span className="eyebrow">{project.type}</span><h3>{project.name}</h3><p>{project.description}</p></div>)}</div></details>}
        </section>
        <section id="about" className="about-section" aria-labelledby="about-title"><div className="shell about-grid">
          <div className="about-photo"><img src="/images/tola.png" alt="Tola, deployment lead at Microsoft Japan and former software engineer" loading="lazy" width="600" height="700" /><div className="photo-note"><span>Hi, I'm Tola.</span><span className="small-star">✳</span></div><span className="photo-caption">A HUMAN BEHIND THE SYSTEMS.</span></div>
          <div className="about-copy"><span className="eyebrow"><span className="section-index">04 /</span> MY STORY</span><h2 id="about-title">Software, product,<br /><span className="serif-word">and infrastructure.</span></h2><p className="about-lead">Six years of connecting technical work<br />to business and customer goals.</p><p>I began my career as a Software Engineer, spending over 3.5 years designing and delivering customer-facing applications with stakeholders, product owners, and development teams. I grew into product leadership: translating business requirements into technical solutions, coordinating cross-functional teams, and driving successful delivery.</p><p>In 2024, I joined Microsoft Japan as a Data Center Technician, where I deploy new capacity, maintain servers and network devices (breakfix), and decommission end-of-life racks, servers, and network devices. I have led a new datacenter capacity build, AMD MI300X and NVIDIA H200 GPU deployments, and Azure rack, network device, and HSM decommissioning, alongside network modernization and Zero Trust initiatives. As a deployment lead, I coordinate engineering, logistics, security, and operations teams while managing risks, schedules, dependencies, and customer commitments. I also mentor new technicians and deployment leads, and serve as an escalation point during critical deployments.</p><p>Today, I'm growing into larger program management responsibilities, bringing infrastructure lifecycle, deployment, and cross-functional leadership experience to deliver impact at scale.</p><div className="about-values"><span><ShieldCheck size={16} /> Safety & security</span><span><Users size={16} /> Cross-team leadership</span><span><Sparkles size={16} /> Customer focus</span></div><External className="text-link" href={links.linkedin}>More of my story on LinkedIn <ArrowUpRight size={16} /></External></div>
        </div></section>
        <section id="notes" className="notes-section shell" aria-labelledby="notes-title"><div className="section-heading"><div><span className="eyebrow"><span className="section-index">05 /</span> NOTES & SIDE QUESTS</span><h2 id="notes-title">Learning out <span className="serif-word">loud.</span></h2></div><External className="text-link" href={links.medium}>All writing on Medium <ArrowUpRight size={16} /></External></div><div className="notes-grid">{articles.map((article, index) => <External href={article.href} className="note-card" key={article.title}><div><span className="eyebrow">{article.category}</span><span className="note-number">0{index + 1}</span></div><h3>{article.title}</h3><p>{article.description}</p><span className="note-bottom">Read the story <ArrowUpRight size={18} /></span></External>)}</div></section>
        <section className="contact-section shell" aria-labelledby="contact-title"><div className="contact-panel"><div><span className="eyebrow">LET'S BUILD SOMETHING THAT LASTS.</span><h2 id="contact-title">Planning something <span className="serif-word">big?</span></h2><p>Let's talk infrastructure, delivery, or program management.</p></div><External className="button button-dark" href={links.linkedin}>Say hello <ArrowUpRight size={18} /></External><span className="contact-flower" aria-hidden="true">✳</span></div></section>
      </main>
      <footer className="site-footer shell"><div className="footer-top"><a href="#" className="brand" aria-label="Tola home"><span className="brand-mark">t.</span><span>tolaaa.</span></a><p>A little design. A lot of making.</p><div className="footer-links"><External href={links.github}>GitHub <ArrowUpRight size={13} /></External><External href={links.linkedin}>LinkedIn <ArrowUpRight size={13} /></External><External href={links.medium}>Medium <ArrowUpRight size={13} /></External><External href={links.youtube}>YouTube <ArrowUpRight size={13} /></External></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Tola. Built with intention.</span><a href="#main">Back to top <ArrowUpRight size={13} /></a></div></footer>
      {selected && <ProjectDialog key={selected.id} project={selected} onClose={() => setSelected(null)} />}
      {(!online || offlineReady || pwaError || storageError) && <div className="pwa-notice" role="status">{!online ? <><WifiOff size={17} /><span>You're offline. The portfolio is still here; external projects need a connection.</span></> : pwaError || storageError ? <><span>{pwaError || storageError}</span><button aria-label="Dismiss notification" onClick={() => { setPwaError(''); setStorageError(''); }}><X size={16} /></button></> : <><CheckCheck size={17} /><span>This little corner is ready for offline visits.</span><button aria-label="Dismiss offline ready notification" onClick={() => setOfflineReady(false)}><X size={16} /></button></>}</div>}
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
