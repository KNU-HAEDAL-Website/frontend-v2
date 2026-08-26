import { allProjectsHref, projects } from '../../data/projects.data'

const ITEMS_PER_SHELF = 4

const projectShelves = Array.from(
  { length: Math.ceil(projects.length / ITEMS_PER_SHELF) },
  (_, index) =>
    projects.slice(index * ITEMS_PER_SHELF, (index + 1) * ITEMS_PER_SHELF),
)

export function Projects() {
  return (
    <section className="projects" aria-labelledby="projects-title">
      <div className="projects__inner">
        <header className="projects__header">
          <div>
            <p className="projects__eyebrow">PROJECT CATALOG</p>
            <h2 id="projects-title" className="projects__title">
              해달의
              <br />
              <span>프로젝트</span>
            </h2>
          </div>

          <a className="projects__allLink" href={allProjectsHref}>
            <span>전체 프로젝트 보기</span>
            <svg viewBox="0 0 48 20" aria-hidden="true">
              <path d="M1 10H44M37 3L44 10L37 17" />
            </svg>
          </a>
        </header>

        <div className="projects__catalog">
          {projectShelves.map((shelf, shelfIndex) => (
            <div className="projects__shelf" key={`shelf-${shelfIndex}`}>
              <ol className="projects__row">
                {shelf.map((project, itemIndex) => {
                  const projectIndex =
                    shelfIndex * ITEMS_PER_SHELF + itemIndex + 1

                  return (
                    <li className="projects__item" key={project.id}>
                      <a
                        className="projects__card"
                        href={project.href}
                        aria-label={`${project.title}: ${project.description}`}
                        style={{ backgroundColor: project.coverColor }}
                      >
                        <span className="projects__fallback" aria-hidden="true">
                          {String(projectIndex).padStart(2, '0')}
                        </span>
                        <img
                          src={project.image}
                          alt=""
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = 'none'
                          }}
                        />

                        <span className="projects__overlay" aria-hidden="true">
                          <span className="projects__overlayNumber">
                            {String(projectIndex).padStart(2, '0')}
                          </span>
                          <span className="projects__overlayContent">
                            <strong>{project.title}</strong>
                            <span>{project.description}</span>
                          </span>
                          <svg viewBox="0 0 40 16">
                            <path d="M1 8H37M31 2L37 8L31 14" />
                          </svg>
                        </span>
                      </a>

                      <span className="projects__caption" aria-hidden="true">
                        <span>{String(projectIndex).padStart(2, '0')}</span>
                        <span>{project.title}</span>
                      </span>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects {
          box-sizing: border-box;
          min-height: 100vh;
          min-height: 100svh;
          margin: 0;
          padding: clamp(3.5rem, 6vh, 5rem) 0 clamp(5rem, 8vh, 7rem);
          overflow: hidden;
          background: #f5f5f5;
          color: #111111;
          font-family: var(--font-site);
        }

        .projects *,
        .projects *::before,
        .projects *::after {
          box-sizing: border-box;
        }

        .projects__inner {
          width: min(
            calc(100% - var(--page-gutter) * 2),
            var(--content-max)
          );
          margin: 0 auto;
        }

        .projects__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: clamp(3rem, 5vw, 6rem);
          min-height: clamp(16rem, 30svh, 21rem);
          padding-bottom: clamp(3rem, 5vh, 4.5rem);
          border-bottom: 1px solid #cfcfcf;
        }

        .projects__eyebrow {
          margin: 0 0 clamp(1rem, 1.25vw, 1.5rem);
          color: #777777;
          font-family: var(--font-site);
          font-size: clamp(0.6875rem, 0.62vw, 0.8125rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.13em;
        }

        .projects__title {
          margin: 0;
          font-size: clamp(4.5rem, 5vw, 6rem);
          font-weight: 750;
          line-height: 0.9;
          letter-spacing: -0.07em;
        }

        .projects__title span {
          color: #555555;
        }

        .projects__allLink {
          display: flex;
          align-items: center;
          gap: clamp(1.25rem, 1.8vw, 2rem);
          padding: 1rem 0;
          color: #111111;
          font-size: clamp(1.5rem, 1.8vw, 2.25rem);
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.055em;
          text-decoration: none;
        }

        .projects__allLink svg {
          width: clamp(3rem, 3vw, 3.75rem);
          height: 1.375rem;
          overflow: visible;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 180ms ease;
        }

        .projects__allLink:hover svg,
        .projects__allLink:focus-visible svg {
          transform: translateX(8px);
        }

        .projects__allLink:focus-visible,
        .projects__card:focus-visible {
          outline: 3px solid #111111;
          outline-offset: 5px;
        }

        .projects__catalog {
          padding-top: clamp(3.5rem, 5vh, 5rem);
        }

        .projects__shelf {
          position: relative;
          padding: 0 clamp(2rem, 2.5vw, 2.75rem) 3rem;
        }

        .projects__shelf + .projects__shelf {
          margin-top: clamp(3rem, 4vw, 4.5rem);
        }

        .projects__shelf::before {
          position: absolute;
          right: 0;
          bottom: 2rem;
          left: 0;
          height: 0.875rem;
          border-top: 1px solid #bdbdbd;
          background: linear-gradient(to bottom, #ffffff 0 45%, #d2d2d2 100%);
          box-shadow: 0 16px 24px rgba(0, 0, 0, 0.14);
          content: "";
        }

        .projects__row {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(1.5rem, 2.5vw, 3.25rem);
          align-items: end;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .projects__item {
          min-width: 0;
        }

        .projects__card {
          position: relative;
          display: block;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.16);
          color: #ffffff;
          text-decoration: none;
          box-shadow: 0 11px 17px rgba(0, 0, 0, 0.17);
          transform-origin: bottom center;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease;
        }

        .projects__card:hover,
        .projects__card:focus-visible {
          z-index: 2;
          box-shadow: 0 22px 34px rgba(0, 0, 0, 0.26);
          transform: translateY(-0.75rem);
        }

        .projects__card > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.04);
          transition:
            transform 400ms ease,
            filter 220ms ease;
        }

        .projects__card:hover > img,
        .projects__card:focus-visible > img {
          filter: grayscale(1) contrast(1.12);
        }

        .projects__fallback {
          position: absolute;
          top: clamp(1.125rem, 1.4vw, 1.5rem);
          left: clamp(1.125rem, 1.4vw, 1.5rem);
          color: rgba(0, 0, 0, 0.68);
          font-family: var(--font-site);
          font-size: clamp(3rem, 3.6vw, 4.5rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.07em;
        }

        .projects__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(1.25rem, 1.7vw, 2rem);
          background: rgba(0, 0, 0, 0.9);
          opacity: 0;
          transform: translateY(14px);
          transition:
            opacity 180ms ease,
            transform 220ms ease;
        }

        .projects__card:hover .projects__overlay,
        .projects__card:focus-visible .projects__overlay {
          opacity: 1;
          transform: translateY(0);
        }

        .projects__overlayNumber {
          color: #bdbdbd;
          font-family: var(--font-site);
          font-size: clamp(0.6875rem, 0.65vw, 0.8125rem);
          font-weight: 700;
          letter-spacing: 0.12em;
        }

        .projects__overlayContent {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          margin-top: auto;
          padding: clamp(1.5rem, 2vw, 2.25rem) 0;
        }

        .projects__overlayContent strong {
          font-size: clamp(1.375rem, 1.6vw, 2rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.055em;
          word-break: keep-all;
        }

        .projects__overlayContent > span {
          color: rgba(255, 255, 255, 0.72);
          font-size: clamp(0.875rem, 0.78vw, 1rem);
          font-weight: 400;
          line-height: 1.55;
          letter-spacing: -0.03em;
          word-break: keep-all;
        }

        .projects__overlay > svg {
          align-self: flex-end;
          width: 40px;
          height: 16px;
          overflow: visible;
          fill: none;
          stroke: #ffffff;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .projects__caption {
          display: flex;
          gap: 0.875rem;
          margin-top: 1rem;
          color: #6f6f6f;
          font-size: clamp(0.75rem, 0.68vw, 0.875rem);
          font-weight: 650;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .projects__caption span:first-child {
          color: #111111;
          font-family: var(--font-site);
          letter-spacing: 0.06em;
        }

        @media (max-width: 68.75rem) {
          .projects {
            padding-top: 3rem;
            padding-bottom: 4rem;
          }

          .projects__header {
            min-height: 14rem;
            padding-bottom: 3rem;
          }

          .projects__title {
            font-size: clamp(4rem, 7vw, 5rem);
          }

          .projects__allLink {
            gap: 1rem;
            font-size: 1.375rem;
          }

          .projects__allLink svg {
            width: 2.5rem;
          }

          .projects__shelf {
            padding-right: 1.25rem;
            padding-left: 1.25rem;
          }

          .projects__row {
            gap: 1.25rem;
          }

          .projects__overlay {
            padding: 1rem;
          }
        }

        @media (max-width: 56.25rem) {
          .projects {
            padding-top: 3rem;
            padding-bottom: 4rem;
            overflow: visible;
          }

          .projects__header {
            display: block;
            min-height: 0;
            padding-bottom: 2.5rem;
          }

          .projects__title {
            font-size: clamp(3.5rem, 14vw, 4.5rem);
          }

          .projects__allLink {
            justify-content: space-between;
            width: 100%;
            margin-top: 2.75rem;
            font-size: 1.25rem;
          }

          .projects__catalog {
            padding-top: 2.75rem;
          }

          .projects__shelf {
            margin-right: calc(var(--page-gutter) * -1);
            margin-left: calc(var(--page-gutter) * -1);
            padding: 0 var(--page-gutter) 2.75rem;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .projects__shelf::-webkit-scrollbar {
            display: none;
          }

          .projects__shelf + .projects__shelf {
            margin-top: 2.5rem;
          }

          .projects__shelf::before {
            right: var(--page-gutter);
            left: var(--page-gutter);
          }

          .projects__row {
            grid-template-columns: none;
            grid-auto-columns: minmax(14rem, 68vw);
            grid-auto-flow: column;
            width: max-content;
            padding-right: var(--page-gutter);
          }

          .projects__card {
            box-shadow: 0 10px 16px rgba(0, 0, 0, 0.16);
          }
        }

        @media (hover: none) {
          .projects__overlay {
            justify-content: flex-end;
            padding-top: 44%;
            background: linear-gradient(
              to bottom,
              transparent 24%,
              rgba(0, 0, 0, 0.92) 100%
            );
            opacity: 1;
            transform: none;
          }

          .projects__overlayNumber {
            position: absolute;
            top: 16px;
            left: 16px;
          }

          .projects__overlayContent {
            padding-bottom: 14px;
          }

          .projects__caption {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .projects__card,
          .projects__card > img,
          .projects__overlay,
          .projects__allLink svg {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
