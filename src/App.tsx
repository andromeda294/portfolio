import { useEffect, useState } from 'react'
import LiveClock from './components/LiveClock'
import ProjectDetail from './components/ProjectDetail'
import Reveal from './components/Reveal'
import { portfolio } from './data/portfolio'
import './App.css'

const navigation = [
  { label: 'Sobre mim', href: '#sobre' },
  { label: 'Percurso', href: '#percurso' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contacto', href: '#contacto' },
]

const initials = portfolio.name
  .split(/\s+/)
  .filter((part) => !['da', 'de', 'do', 'das', 'dos'].includes(part.toLowerCase()))
  .map((part) => part[0])
  .slice(0, 2)
  .join('')
  .toUpperCase()

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon--diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M4.25 10h11.5M10.5 4.75 15.75 10l-5.25 5.25" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [projectOpen, setProjectOpen] = useState(
    () => window.location.hash === '#e-converse',
  )

  useEffect(() => {
    const syncProjectRoute = () => {
      setProjectOpen(window.location.hash === '#e-converse')
    }

    window.addEventListener('hashchange', syncProjectRoute)
    window.addEventListener('popstate', syncProjectRoute)
    return () => {
      window.removeEventListener('hashchange', syncProjectRoute)
      window.removeEventListener('popstate', syncProjectRoute)
    }
  }, [])

  function openProject() {
    window.history.pushState(null, '', '#e-converse')
    setProjectOpen(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function closeProject() {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    setProjectOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Saltar para o conteúdo</a>
      <header className="site-header">
        <a
          aria-label={`${portfolio.name} — início`}
          className="wordmark"
          href="#inicio"
          onClick={(event) => {
            setMenuOpen(false)
            if (projectOpen) {
              event.preventDefault()
              closeProject()
            }
          }}
        >
          {initials}<span>.</span>
        </a>

        {projectOpen ? (
          <button className="nav-cta project-back-link" onClick={closeProject} type="button">
            ← Voltar ao portfólio
          </button>
        ) : (
          <>
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
            >
              <span />
              <span />
            </button>
            <nav
              aria-label="Navegação principal"
              className={`main-nav${menuOpen ? ' main-nav--open' : ''}`}
            >
              {navigation.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="nav-cta"
                href="#contacto"
                onClick={() => setMenuOpen(false)}
              >
                Vamos conversar <ArrowIcon diagonal />
              </a>
            </nav>
          </>
        )}
      </header>

      <main id="main-content">
        {projectOpen ? (
          <ProjectDetail onBack={closeProject} />
        ) : (
          <>
        <section aria-labelledby="hero-title" className="hero section-wrap" id="inicio">
          <div className="hero-stars" aria-hidden="true">
            <span className="star star--one" />
            <span className="star star--two" />
            <span className="star star--three" />
            <span className="star star--four" />
            <span className="star star--five" />
            <span className="star star--six" />
            <span className="star star--seven" />
            <span className="star star--eight" />
            <span className="constellation constellation--one" />
            <span className="constellation constellation--two" />
          </div>
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> {portfolio.role}</p>
            <h1 id="hero-title">
              Ideias que<br />
              ganham vida<br />
              <span>na web.</span>
            </h1>
            <p className="hero-description">{portfolio.intro}</p>
            <a className="button button--primary" href="#projetos">
              Explorar o meu trabalho <ArrowIcon />
            </a>
          </div>

          <div aria-hidden="true" className="hero-art">
            <div className="planet-halo planet-halo--outer" />
            <div className="planet-halo planet-halo--inner" />
            <div className="planet">
              <div className="planet-ring" />
              <div className="planet-shade" />
            </div>
            <span className="planet-satellite">✳</span>
            <span className="orbit-label orbit-label--top">CRIAR · CONSTRUIR · LIGAR</span>
            <span className="orbit-label orbit-label--bottom">DESENVOLVEDOR FULL-STACK</span>
          </div>

          <a className="scroll-cue" href="#sobre">
            <span className="scroll-line" /> Continua a explorar
          </a>
          <LiveClock />
        </section>

        <section aria-labelledby="about-title" className="about section-wrap" id="sobre">
          <div className="section-label">
            <span>01</span>
            <span>Sobre mim</span>
          </div>
          <div className="about-content">
            <h2 id="about-title">
              Do primeiro componente à base de dados, gosto de perceber <span>o todo.</span>
            </h2>
            <div className="about-aside">
              <p>{portfolio.about}</p>
              <p className="location"><span aria-hidden="true">⌖</span> {portfolio.location}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="journey-title" className="journey section-wrap" id="percurso">
          <div className="section-label">
            <span>02</span>
            <span>Percurso</span>
          </div>
          <div className="journey-heading">
            <h2 id="journey-title">Tecnologia com<br />os pés no terreno.</h2>
            <p>
              O meu caminho junta programação, formação pedagógica e experiência
              no contacto direto com pessoas e serviços.
            </p>
          </div>
          <div className="journey-grid">
            <div className="journey-column">
              <h3>Experiência</h3>
              <div className="experience-list">
                {portfolio.experience.map((item, index) => (
                  <Reveal className="experience-reveal" delay={index * 80} key={item.role}>
                    <article className="experience-item">
                      <span className="experience-marker" aria-hidden="true" />
                      <div>
                        <div className="experience-heading">
                          <h4>{item.role}</h4>
                          <span>{item.place}</span>
                        </div>
                        <p>{item.description}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="journey-column journey-column--education">
              <h3>Formação</h3>
              <div className="education-list">
                {portfolio.education.map((item, index) => (
                  <Reveal className="education-reveal" delay={index * 80} key={item.title}>
                    <article className="education-item">
                      <span className="education-number">0{index + 1}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.detail}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
              <div className="language-list">
                <span className="toolkit-label">IDIOMAS</span>
                {portfolio.languages.map((language) => <span key={language}>{language}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="projects-title" className="projects section-wrap" id="projetos">
          <div className="section-label">
            <span>03</span>
            <span>Projetos</span>
          </div>
          <div className="projects-heading">
            <h2 id="projects-title">Ideias a ganhar<br />forma.</h2>
            <p>Aplicações em que tecnologia e necessidades do dia a dia se encontram.</p>
          </div>
          <Reveal className="project-reveal">
          <article className="project-preview">
            <button
              aria-label={`Ver detalhes do projeto ${portfolio.project.name}`}
              className="project-image-button"
              onClick={openProject}
              type="button"
            >
              <img
                alt="Pré-visualização da interface de conversas do E-Converse"
                className="project-preview-image"
                src="/images/e-converse-preview.svg"
              />
              <span className="image-open-mark" aria-hidden="true">↗</span>
            </button>
            <div className="project-preview-copy">
              <div className="project-meta">
                <span className="project-status"><span /> {portfolio.project.status}</span>
                <span className="project-kind">Aplicação web · Comunidade</span>
              </div>
              <h3>{portfolio.project.name}</h3>
              <p>{portfolio.project.description}</p>
              <div className="project-tags">
                <span>Comunidade universitária</span>
                <span>Conversas</span>
                <span>Estudo em grupo</span>
              </div>
              <button className="text-link" onClick={openProject} type="button">
                Conhecer o projeto <ArrowIcon />
              </button>
            </div>
          </article>
          </Reveal>
          <Reveal className="project-secondary-reveal">
            <article className="project-secondary">
              <a
                aria-label={`Ver ${portfolio.githubProject.name} no GitHub`}
                className="project-secondary-image"
                href={portfolio.githubProject.url}
                rel="noreferrer"
                target="_blank"
              >
                <img
                  alt="Pré-visualização conceptual do SIGA-Allana, com resumo de refeições, calorias e hidratação."
                  src={portfolio.githubProject.image}
                />
                <span className="image-open-mark" aria-hidden="true">↗</span>
              </a>
              <div className="project-preview-copy">
                <div className="project-meta">
                  <span className="project-kind">{portfolio.githubProject.category}</span>
                  <span className="project-kind">TypeScript</span>
                </div>
                <h3>{portfolio.githubProject.name}</h3>
                <p>{portfolio.githubProject.description}</p>
                <div className="project-tags">
                  <span>React Native</span>
                  <span>Expo</span>
                  <span>Dados locais</span>
                </div>
                <a
                  className="text-link"
                  href={portfolio.githubProject.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  Ver código no GitHub <ArrowIcon diagonal />
                </a>
              </div>
            </article>
          </Reveal>
        </section>

        <section aria-labelledby="work-title" className="work section-wrap" id="stack">
          <div className="section-label">
            <span>04</span>
            <span>O que faço</span>
          </div>
          <div className="work-heading">
            <h2 id="work-title">Da interface<br />à infraestrutura.</h2>
            <p>Trabalho nas várias camadas de uma aplicação para que tudo funcione em conjunto.</p>
          </div>
          <div className="work-grid">
            {portfolio.services.map((service, index) => (
              <Reveal
                className="work-reveal"
                delay={index * 120}
                key={service.title}
              >
                <article className={`work-card work-card--${index + 1}`}>
                  <div className="card-art" aria-hidden="true">
                    <span className="card-orbit" />
                    <span className="card-symbol">{service.symbol}</span>
                    <span className="card-star">✳</span>
                  </div>
                  <div className="card-copy">
                    <span className="card-number">0{index + 1}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="toolkit">
            <span className="toolkit-label">STACK</span>
            <div aria-label="Tecnologias da stack" className="tool-marquee" role="region">
              <div className="tool-marquee-track">
                {[0, 1].map((copy) => (
                  <div
                    aria-hidden={copy === 1}
                    className="tool-marquee-group"
                    key={copy}
                  >
                    {portfolio.tools.map((tool) => (
                      <div className="tool-logo" key={tool.name}>
                        <img
                          alt={copy === 0 ? tool.name : ''}
                          src={tool.logo}
                        />
                        <span>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="contact section-wrap" id="contacto">
          <div className="contact-stars" aria-hidden="true">
            <span className="contact-star contact-star--one" />
            <span className="contact-star contact-star--two" />
            <span className="contact-star contact-star--three" />
            <span className="contact-star contact-star--four" />
          </div>
          <div className="section-label section-label--light">
            <span>05</span>
            <span>Contacto</span>
          </div>
          <div className="contact-content">
            <p className="eyebrow">O TEU PRÓXIMO PROJETO COMEÇA AQUI</p>
            <h2 id="contact-title">Vamos criar<br />algo <span>porreiro.</span></h2>
            <p className="contact-description">{portfolio.contactMessage}</p>
            {portfolio.email && (
              <a className="button button--light" href={`mailto:${portfolio.email}`}>
                Enviar email <ArrowIcon diagonal />
              </a>
            )}
          </div>
          <span aria-hidden="true" className="contact-decoration">✳</span>
        </section>
          </>
        )}
      </main>

      <footer className="site-footer section-wrap">
        <a
          className="footer-name"
          href="#inicio"
          onClick={projectOpen ? (event) => {
            event.preventDefault()
            closeProject()
          } : undefined}
        >
          {portfolio.name}<span>.</span>
        </a>
        <p>Desenvolvimento full-stack · {new Date().getFullYear()}</p>
        <a
          className="footer-github"
          href={portfolio.github}
          rel="noreferrer"
          target="_blank"
        >
          GitHub <ArrowIcon diagonal />
        </a>
        {projectOpen ? (
          <button className="back-to-top" onClick={closeProject} type="button">Voltar ao portfólio ↑</button>
        ) : (
          <a className="back-to-top" href="#inicio">Voltar ao início ↑</a>
        )}
      </footer>
    </>
  )
}

export default App
