import { useState } from 'react'

import { type WorkspaceItemTone, tracks } from '../../data/tracks.data'

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function getWorkspaceItemClass(tone?: WorkspaceItemTone) {
  return ['track-workspace__item', tone ? `track-workspace__item--${tone}` : '']
    .filter(Boolean)
    .join(' ')
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  )
}

export function Tracks() {
  const [activeId, setActiveId] = useState(tracks[0].id)
  const selectedIndex = tracks.findIndex((track) => track.id === activeId)
  const currentIndex = selectedIndex < 0 ? 0 : selectedIndex
  const activeTrack = tracks[currentIndex]

  return (
    <section className="tracks" aria-labelledby="tracks-heading">
      <div className="tracks__inner">
        <header className="tracks__header">
          <h2 className="tracks__title" id="tracks-heading">
            해달 그리고
            <br />
            <span>트랙</span>
          </h2>

          <p className="tracks__intro">
            부트캠프가 기초를 떼는 곳이라면,
            <br />
            트랙은 하나를 깊게 파는 곳입니다.
          </p>
        </header>

        <div className="tracks__catalog">
          <nav className="tracks__directory" aria-label="트랙 선택">
            <ol className="tracks__tabs">
              {tracks.map((track, index) => {
                const isActive = index === currentIndex

                return (
                  <li key={track.id}>
                    <button
                      type="button"
                      className={
                        isActive ? 'tracks__tab is-active' : 'tracks__tab'
                      }
                      aria-pressed={isActive}
                      aria-controls="tracks-panel"
                      onClick={() => setActiveId(track.id)}
                    >
                      <span className="tracks__tab-number">
                        {formatIndex(index)}
                      </span>
                      <span className="tracks__tab-name">{track.name}</span>
                      <span
                        className={
                          track.status === 'open'
                            ? 'tracks__tab-status is-open'
                            : 'tracks__tab-status'
                        }
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <article
            key={activeTrack.id}
            id="tracks-panel"
            className="tracks__panel"
            tabIndex={0}
            aria-live="polite"
          >
            <header className="tracks__panel-header">
              <div>
                <div className="tracks__name-line">
                  <h3>{activeTrack.name}</h3>
                  <span
                    className={
                      activeTrack.status === 'closed'
                        ? 'tracks__badge is-closed'
                        : 'tracks__badge'
                    }
                  >
                    {activeTrack.statusLabel}
                  </span>
                </div>
                <p className="tracks__meta">{activeTrack.meta}</p>
                <p className="tracks__description">{activeTrack.description}</p>
              </div>

              <p className="tracks__count" aria-hidden="true">
                {formatIndex(currentIndex)}
                <span>/ {String(tracks.length).padStart(2, '0')}</span>
              </p>
            </header>

            <div className="tracks__columns">
              <div>
                <p className="tracks__label">WORKSPACE</p>
                <div
                  className="track-workspace"
                  aria-label={`${activeTrack.name} 작업 공간 예시`}
                >
                  {activeTrack.workspace.map((workspace, sectionIndex) => (
                    <section
                      className="track-workspace__section"
                      key={`${activeTrack.id}-workspace-${sectionIndex}`}
                    >
                      <h4>{workspace.title}</h4>
                      {workspace.items.map((item, itemIndex) => (
                        <p
                          className={getWorkspaceItemClass(item.tone)}
                          key={`${activeTrack.id}-workspace-${sectionIndex}-${itemIndex}`}
                        >
                          {item.text}
                        </p>
                      ))}
                    </section>
                  ))}
                </div>
                <p className="tracks__caption">
                  {activeTrack.workspaceCaption}
                </p>
              </div>

              <div>
                <p className="tracks__label">WHAT WE DO</p>
                <ol className="track-activities">
                  {activeTrack.activities.map((activity, index) => (
                    <li
                      className="track-activities__item"
                      key={`${activeTrack.id}-activity-${index}`}
                    >
                      <span aria-hidden="true">{formatIndex(index)}</span>
                      <p>
                        {activity.title}
                        {activity.note && <small>({activity.note})</small>}
                      </p>
                    </li>
                  ))}
                </ol>

                <a
                  className="tracks__notion-link"
                  href={activeTrack.notionHref}
                >
                  노션에서 전체 보기
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>

            <footer className="tracks__footer">
              {activeTrack.status === 'open' && activeTrack.applyHref ? (
                <a className="tracks__cta" href={activeTrack.applyHref}>
                  {activeTrack.ctaLabel}
                </a>
              ) : (
                <span className="tracks__cta is-disabled" aria-disabled="true">
                  {activeTrack.ctaLabel}
                </span>
              )}
              <span className="tracks__schedule">{activeTrack.schedule}</span>
            </footer>
          </article>
        </div>
      </div>

      <style>{`
        .tracks {
          --tracks-ink: #11171c;
          --tracks-slate: #62696d;
          --tracks-muted: #959b9e;
          --tracks-line: #d8dbd9;
          --tracks-soft: #eeeeeb;
          --tracks-dark: #111619;
          --tracks-paper: #ffffff;

          width: 100%;
          background: var(--tracks-paper);
          color: var(--tracks-ink);
          font-family: var(--font-site);
        }

        .tracks *,
        .tracks *::before,
        .tracks *::after {
          box-sizing: border-box;
        }

        .tracks__inner {
          width: min(
            calc(100% - var(--page-gutter) * 2),
            var(--content-max)
          );
          margin: 0 auto;
          padding-block: clamp(3rem, 6vw, 6rem);
        }

        .tracks__header {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
          gap: clamp(2rem, 5vw, 6rem);
          align-items: end;
          padding-bottom: clamp(2.5rem, 4vw, 4rem);
          border-bottom: 1px solid var(--tracks-line);
        }

        .tracks__title {
          margin: 0;
          font-size: clamp(3.75rem, 6vw, 6.5rem);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.065em;
        }

        .tracks__title span {
          color: var(--tracks-slate);
        }

        .tracks__intro {
          margin: 0;
          color: var(--tracks-slate);
          font-size: clamp(1rem, 1.1vw, 1.25rem);
          line-height: 1.7;
          letter-spacing: -0.025em;
        }

        .tracks__catalog {
          display: grid;
          grid-template-columns: clamp(15rem, 24vw, 20rem) minmax(0, 1fr);
          gap: clamp(2.5rem, 4vw, 5rem);
          padding-top: clamp(2.5rem, 4vw, 4rem);
        }

        .tracks__tabs {
          margin: 0;
          padding: 0;
          border-bottom: 1px solid var(--tracks-line);
          list-style: none;
        }

        .tracks__tab {
          display: grid;
          grid-template-columns: 2.5rem minmax(0, 1fr) 0.5rem;
          gap: 0.75rem;
          align-items: center;
          width: 100%;
          min-height: 5rem;
          padding: 0 1rem;
          border: 0;
          background: transparent;
          color: var(--tracks-slate);
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 160ms ease, color 160ms ease;
        }

        .tracks__tab:hover {
          background: var(--tracks-soft);
          color: var(--tracks-ink);
        }

        .tracks__tab:focus-visible {
          outline: 2px solid var(--tracks-ink);
          outline-offset: -2px;
        }

        .tracks__tab.is-active {
          background: var(--tracks-ink);
          color: #ffffff;
        }

        .tracks__tab-number {
          color: var(--tracks-muted);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
        }

        .tracks__tab.is-active .tracks__tab-number {
          color: #ffffff;
        }

        .tracks__tab-name {
          overflow: hidden;
          font-size: clamp(1rem, 1.1vw, 1.2rem);
          font-weight: 650;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .tracks__tab-status {
          width: 0.4rem;
          height: 0.4rem;
          background: var(--tracks-muted);
        }

        .tracks__tab-status.is-open {
          background: #77e7aa;
        }

        .tracks__panel {
          min-width: 0;
          animation: tracks-panel-in 240ms ease-out;
        }

        .tracks__panel:focus-visible {
          outline: 2px solid var(--tracks-ink);
          outline-offset: 4px;
        }

        @keyframes tracks-panel-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tracks__panel-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 2rem;
          min-height: 11rem;
          padding-bottom: 2rem;
        }

        .tracks__name-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.75rem;
        }

        .tracks__name-line h3 {
          margin: 0;
          font-size: clamp(2.75rem, 4.2vw, 4.75rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .tracks__badge {
          padding: 0.35rem 0.65rem;
          background: var(--tracks-ink);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .tracks__badge.is-closed {
          background: var(--tracks-soft);
          color: var(--tracks-muted);
        }

        .tracks__meta {
          margin: 0.85rem 0 0;
          color: var(--tracks-muted);
          font-size: 0.875rem;
        }

        .tracks__description {
          margin: 1.25rem 0 0;
          color: var(--tracks-slate);
          font-size: clamp(1.25rem, 1.7vw, 1.75rem);
          font-weight: 650;
          line-height: 1.35;
          letter-spacing: -0.035em;
          word-break: keep-all;
        }

        .tracks__count {
          margin: 0;
          font-size: clamp(1.5rem, 1.7vw, 2rem);
          line-height: 1;
        }

        .tracks__count span {
          color: var(--tracks-muted);
          font-size: 0.75rem;
        }

        .tracks__columns {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
          gap: clamp(2rem, 4vw, 4rem);
        }

        .tracks__label {
          margin: 0 0 1rem;
          color: var(--tracks-muted);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .track-workspace {
          min-height: 20rem;
          padding: clamp(1.5rem, 2.5vw, 2.25rem);
          overflow: hidden;
          background: var(--tracks-dark);
          color: #f5f5f2;
        }

        .track-workspace__section + .track-workspace__section {
          margin-top: 1.75rem;
        }

        .track-workspace__section h4 {
          margin: 0 0 0.75rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .track-workspace__item {
          margin: 0.45rem 0 0;
          color: #a9afb1;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .track-workspace__item::before {
          margin-right: 0.55rem;
          content: '—';
        }

        .track-workspace__item--link,
        .track-workspace__item--document {
          color: #f5f5f2;
          text-decoration: underline;
          text-decoration-color: #62696d;
          text-underline-offset: 0.2em;
        }

        .tracks__caption {
          margin: 0.85rem 0 0;
          color: var(--tracks-muted);
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .track-activities {
          margin: 0;
          padding: 0;
          border-top: 1px solid var(--tracks-line);
          list-style: none;
        }

        .track-activities__item {
          display: grid;
          grid-template-columns: 2.25rem minmax(0, 1fr);
          gap: 0.75rem;
          align-items: center;
          min-height: 4.25rem;
          border-bottom: 1px solid var(--tracks-line);
        }

        .track-activities__item > span {
          color: var(--tracks-muted);
          font-size: 0.75rem;
        }

        .track-activities__item p {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 650;
          line-height: 1.4;
        }

        .track-activities__item small {
          margin-left: 0.45rem;
          color: var(--tracks-muted);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .tracks__notion-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          color: var(--tracks-ink);
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
        }

        .tracks__notion-link svg {
          width: 1rem;
          height: 1rem;
        }

        .tracks__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--tracks-line);
        }

        .tracks__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 3.25rem;
          padding-inline: 1.5rem;
          background: var(--tracks-ink);
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
        }

        .tracks__cta.is-disabled {
          border: 1px solid var(--tracks-line);
          background: transparent;
          color: var(--tracks-muted);
        }

        .tracks__schedule {
          color: var(--tracks-muted);
          font-size: 0.8rem;
          text-align: right;
        }

        @media (max-width: 68.75rem) {
          .tracks__header {
            grid-template-columns: 1fr;
          }

          .tracks__catalog {
            grid-template-columns: 15rem minmax(0, 1fr);
            gap: 2rem;
          }

          .tracks__columns {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 45rem) {
          .tracks__inner {
            width: calc(100% - 2rem);
            padding-block: 2rem;
          }

          .tracks__title {
            font-size: clamp(2.75rem, 13vw, 4rem);
          }

          .tracks__catalog {
            display: block;
            padding-top: 2rem;
          }

          .tracks__directory {
            margin-bottom: 2.5rem;
          }

          .tracks__tabs {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            border: 0;
            scrollbar-width: none;
          }

          .tracks__tabs::-webkit-scrollbar {
            display: none;
          }

          .tracks__tabs li {
            flex: 0 0 auto;
          }

          .tracks__tab {
            display: flex;
            width: auto;
            min-height: 2.75rem;
            padding: 0 0.875rem;
            border: 1px solid var(--tracks-line);
          }

          .tracks__tab-status {
            display: none;
          }

          .tracks__panel-header {
            min-height: 9rem;
          }

          .tracks__name-line h3 {
            font-size: clamp(2.25rem, 10vw, 3.25rem);
          }

          .tracks__columns {
            gap: 2.5rem;
          }

          .tracks__footer {
            align-items: stretch;
            flex-direction: column;
          }

          .tracks__schedule {
            text-align: left;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tracks__panel,
          .tracks__tab {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Tracks
