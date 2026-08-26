import { contributors } from '../../data/contributors.data'

const githubAvatarUrl = (github: string) =>
  `https://github.com/${encodeURIComponent(github)}.png?size=96`

const githubProfileUrl = (github: string) =>
  `https://github.com/${encodeURIComponent(github)}`

export function Contributors() {
  return (
    <section className="contributors" aria-labelledby="contributors-title">
      <div className="contributors__inner">
        <header className="contributors__header">
          <h2 id="contributors-title" className="contributors__title">
            Contributors
          </h2>
        </header>

        <div className="contributors__grid">
          {contributors.map((contributor, index) => {
            const hasGithub = contributor.github.trim().length > 0

            const content = (
              <>
                <span className="contributors__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="contributors__avatar" aria-hidden="true">
                  {hasGithub ? (
                    <img
                      src={githubAvatarUrl(contributor.github)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="contributors__avatarFallback">
                      {contributor.name.slice(0, 1)}
                    </span>
                  )}
                </span>

                <span className="contributors__name">{contributor.name}</span>
                <span className="contributors__role">{contributor.role}</span>
              </>
            )

            return hasGithub ? (
              <a
                key={`${contributor.github}-${contributor.name}`}
                className="contributors__item"
                href={githubProfileUrl(contributor.github)}
                target="_blank"
                rel="noreferrer"
                aria-label={`${contributor.name} GitHub 프로필 열기`}
              >
                {content}
              </a>
            ) : (
              <div
                key={`${contributor.name}-${index}`}
                className="contributors__item contributors__item--static"
              >
                {content}
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .contributors {
          width: 100%;
          min-height: 100svh;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          padding: clamp(3.5rem, 7vh, 6.5rem) var(--page-gutter, clamp(1.5rem, 4vw, 4.5rem));
          background: #ffffff;
          color: #111111;
        }

        .contributors__inner {
          width: min(100%, var(--content-max, 107.5rem));
          margin: 0 auto;
        }

        .contributors__header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: clamp(1.5rem, 3vw, 2.75rem);
          padding-bottom: clamp(1rem, 1.8vw, 1.5rem);
          border-bottom: 1px solid #d9d9d9;
        }

        .contributors__title {
          margin: 0;
          font-size: clamp(2.5rem, 4.8vw, 5.25rem);
          line-height: 0.95;
          font-weight: 700;
          letter-spacing: -0.055em;
        }

        .contributors__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(0.45rem, 0.7vw, 0.7rem);
        }

        .contributors__item {
          min-width: 0;
          height: clamp(3.2rem, 4.5vw, 4.25rem);
          display: grid;
          grid-template-columns: 2rem 2.35rem minmax(0, 1fr) auto;
          align-items: center;
          column-gap: clamp(0.55rem, 0.8vw, 0.8rem);
          box-sizing: border-box;
          padding: 0 clamp(0.75rem, 1vw, 1rem);
          border: 1px solid #e0e0e0;
          border-radius: 0.65rem;
          background: #ffffff;
          color: inherit;
          text-decoration: none;
          transition:
            border-color 160ms ease,
            background-color 160ms ease,
            transform 160ms ease;
        }

        a.contributors__item:hover {
          border-color: #9d9d9d;
          background: #fafafa;
          transform: translateY(-1px);
        }

        a.contributors__item:focus-visible {
          outline: 2px solid #111111;
          outline-offset: 2px;
        }

        .contributors__index {
          font-size: clamp(0.72rem, 0.7vw, 0.82rem);
          font-variant-numeric: tabular-nums;
          color: #9a9a9a;
        }

        .contributors__avatar {
          width: 2.35rem;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 50%;
          background: #eeeeee;
          flex: none;
        }

        .contributors__avatar img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          filter: grayscale(1);
        }

        .contributors__avatarFallback {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: #555555;
          background: #eeeeee;
        }

        .contributors__name {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: clamp(0.9rem, 0.95vw, 1.08rem);
          font-weight: 600;
          letter-spacing: -0.025em;
        }

        .contributors__role {
          padding-left: 0.75rem;
          white-space: nowrap;
          font-size: clamp(0.72rem, 0.75vw, 0.88rem);
          color: #747474;
        }

        @media (max-width: 64rem) {
          .contributors {
            min-height: auto;
          }

          .contributors__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 40rem) {
          .contributors {
            padding-block: 3.5rem;
          }

          .contributors__header {
            margin-bottom: 1.25rem;
          }

          .contributors__grid {
            grid-template-columns: 1fr;
          }

          .contributors__item {
            height: 3.5rem;
            grid-template-columns: 1.7rem 2.15rem minmax(0, 1fr) auto;
          }

          .contributors__avatar {
            width: 2.15rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contributors__item {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
