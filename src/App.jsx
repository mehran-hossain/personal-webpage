import heroImg from './assets/hero.png'
import bankboxImg from './assets/bankbox.png'
import theboardImg from './assets/theboard.png'
import meowzartImg from './assets/meowzart.png'
import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [activeProjectId, setActiveProjectId] = useState(null)

  const projects = useMemo(
    () => [
      {
        id: 'project-1',
        title: 'BankBox: Online Banking Practice',
        subtitle: 'MSc research investigating BankBox as a tool for older adults to safely learn and practice online banking.',
        image: bankboxImg,
        alt: 'BankBox project preview',
        href: '/projects/project-1.html',
        tags: ['Angular', 'Express', 'Node.js'],
      },
      {
        id: 'project-2',
        title: 'The Board: Virtual Event Board',
        subtitle: 'A virtual event board that serves as a central, interactive platform for campus events. Built during devHacks 2026.',
        image: theboardImg,
        alt: 'The Board project preview',
        href: '/projects/project-2.html',
        tags: ['React', 'Express', 'Supabase', 'Tailwind'],
      },
      {
        id: 'project-3',
        title: 'Meowzart: Virtual 2D Pet',
        subtitle: 'Meowzart refuses.',
        image: meowzartImg,
        alt: 'Meowzart project preview',
        href: '/projects/project-3.html',
        tags: ['React'],
      },
    ],
    []
  )

  const activeProject = projects.find((project) => project.id === activeProjectId)

  const activeProjectIndex = activeProject
    ? projects.findIndex((p) => p.id === activeProjectId)
    : -1

  const isFirstProject = activeProjectIndex === 0
  const isLastProject = activeProjectIndex === projects.length - 1

  const goToAdjacentProject = (delta) => {
    if (activeProjectIndex < 0) return
    if (delta < 0 && isFirstProject) return
    if (delta > 0 && isLastProject) return
    const len = projects.length
    const nextIdx = (activeProjectIndex + delta + len) % len
    const next = projects[nextIdx]
    window.history.replaceState(
      { siteProjectView: true, projectId: next.id },
      ''
    )
    setActiveProjectId(next.id)
  }

  useEffect(() => {
    const onPopState = (e) => {
      const st = e.state
      if (st && st.siteProjectView && typeof st.projectId === 'string') {
        const valid = projects.some((p) => p.id === st.projectId)
        if (valid) {
          setActiveProjectId(st.projectId)
          return
        }
      }
      setActiveProjectId(null)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [projects])

  useEffect(() => {
    if (!activeProject) return
    const prevHtml = document.documentElement.style.overflow
    const prevBody = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtml
      document.body.style.overflow = prevBody
    }
  }, [activeProject])

  return (
    <div className={`app-shell ${activeProject ? 'project-open' : ''}`}>
      <div className={`top-section ${activeProject ? 'top-section-minimized' : ''}`}>
        <div className="site-top-chrome">
          <header className="top">
            <div className="identity">
              <h2 className="name">Mehran Hossain</h2>
              <span className="role">HCI Researcher | CS Educator</span>
            </div>
            <button
              type="button"
              className={`all-projects-button ${activeProject ? 'is-visible' : ''}`}
              onClick={() => window.history.back()}
              aria-hidden={!activeProject}
              tabIndex={activeProject ? 0 : -1}
            >
              Back to projects
            </button>
            <nav className="contact">
              <a href="mailto:hello@example.com" className="link">mehranhossain19@gmail.com</a>
            </nav>
          </header>
          {activeProject ? (
            <nav className="project-cycle-nav" aria-label="Adjacent projects">
              <button
                type="button"
                className="project-cycle-link"
                disabled={isFirstProject}
                onClick={() => goToAdjacentProject(-1)}
              >
                &lt; Prev
              </button>
              <button
                type="button"
                className="project-cycle-link"
                disabled={isLastProject}
                onClick={() => goToAdjacentProject(1)}
              >
                Next &gt;
              </button>
            </nav>
          ) : null}
        </div>

        <main className={`landing ${activeProject ? 'landing-minimized' : ''}`}>
          <div className="avatar-wrap">
            <img src={heroImg} className="avatar" width="220" height="220" alt="Portrait" />
          </div>
          <div className="intro">
            <h1>Hi, I'm Mehran </h1>
            <p>
             I'm a graduate student at the University of Manitoba doing research in Human-Computer Interaction! I also worked as a CS instructor at Brac University before starting my masters. I find myself most inspired by creativity and design geared towards practical ways of helping people. I will be sharing my progress on that endeavor on this page (currently under construction 🔨).
            </p>
          </div>
        </main>
      </div>

      <section className={`projects ${activeProject ? 'projects-expanded' : ''}`}>
        {!activeProject ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="card card-with-image project-card-trigger"
                onClick={() => {
                  window.history.pushState(
                    { siteProjectView: true, projectId: project.id },
                    ''
                  )
                  setActiveProjectId(project.id)
                }}
              >
                <img src={project.image} className="card-image" alt={project.alt} />
                <div className="card-body">
                  <h3>{project.title}</h3>
                  {Array.isArray(project.tags) && project.tags.length ? (
                    <div className="project-tags" aria-label="Technologies used">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p>{project.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <article className="project-page-view" aria-label={`${activeProject.title} project`}>
            <iframe
              key={activeProjectId}
              className="project-frame"
              src={activeProject.href}
              title={activeProject.title}
            />
          </article>
        )}
      </section>
    </div>
  )
}

export default App
