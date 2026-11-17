import { portfolio } from '../data/portfolio'
import Reveal from './Reveal'
import './ProjectDetail.css'

type ProjectDetailProps = {
  onBack: () => void
}

function ProjectDetail({ onBack }: ProjectDetailProps) {
  return (
    <article aria-labelledby="project-title" className="project-detail section-wrap">
      <div className="section-label">
        <span>PROJETO 01</span>
        <span>Em desenvolvimento</span>
      </div>

      <div className="project-detail-heading">
        <div>
          <p className="eyebrow"><span className="status-dot" /> PROJETO PESSOAL</p>
          <h1 id="project-title">{portfolio.project.name}<span>.</span></h1>
          <p className="project-detail-tagline">{portfolio.project.tagline}</p>
        </div>
        <p className="project-detail-intro">{portfolio.project.description}</p>
      </div>

      <figure className="project-detail-screen">
        <img
          alt="Ecrã de conversas do E-Converse, com mensagens e espaços para estudantes."
          src="/images/e-converse-preview.svg"
        />
        <figcaption>Pré-visualização conceptual da aplicação</figcaption>
      </figure>

      <div className="project-detail-story">
        <div className="section-label">
          <span>01</span>
          <span>A ideia</span>
        </div>
        <div className="project-detail-copy">
          <h2>Conversas que começam<br />no campus.</h2>
          <div>
            <p>
              O E-Converse nasce para aproximar estudantes da mesma universidade
              através de um espaço digital feito para conversar, partilhar ideias
              e encontrar companhia para estudar.
            </p>
            <p>
              A interface apresentada é uma exploração visual do produto enquanto
              o projeto continua em desenvolvimento.
            </p>
          </div>
        </div>
      </div>

      <div className="project-detail-features">
        {portfolio.project.details.map((detail, index) => (
          <Reveal className="detail-reveal" delay={index * 100} key={detail.title}>
            <article className="detail-card">
              <span>0{index + 1}</span>
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="project-detail-mobile">
        <div className="project-mobile-copy">
          <div className="section-label">
            <span>02</span>
            <span>Uma experiência próxima</span>
          </div>
          <h2>Feito para<br />estar <span>por perto.</span></h2>
          <p>
            Uma comunidade universitária também acompanha os estudantes onde
            estiverem. A versão móvel explora uma forma simples de manter as
            conversas sempre à mão.
          </p>
        </div>
        <img
          alt="Pré-visualização móvel do E-Converse com uma conversa entre estudantes."
          className="project-mobile-image"
          src="/images/e-converse-mobile.svg"
        />
      </div>

      <section aria-labelledby="project-contact-title" className="project-detail-cta">
        <div>
          <span className="section-label">A CONSTRUIR, PASSO A PASSO</span>
          <h2 id="project-contact-title">Mais novidades<br />a caminho.</h2>
        </div>
        <div className="project-detail-cta-links">
          <p>Queres conversar sobre o projeto ou colaborar?</p>
          <a className="button button--primary" href={`mailto:${portfolio.email}`}>
            {portfolio.email}
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              <path d="M4.25 10h11.5M10.5 4.75 15.75 10l-5.25 5.25" />
            </svg>
          </a>
        </div>
      </section>

      <button className="project-detail-back" onClick={onBack} type="button">
        ← Voltar ao portfólio
      </button>
    </article>
  )
}

export default ProjectDetail
