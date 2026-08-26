import { clubActivities, websiteProject } from '../../data/activities.data'

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function Activities() {
  return (
    <section
      className="club-activities"
      aria-labelledby="club-activities-title"
    >
      <div className="club-activities__inner">
        <header className="club-activities__header">
          <h2 id="club-activities-title" className="club-activities__title">
            해달 그리고
            <br />
            <span>Activities</span>
          </h2>
        </header>

        <ol className="club-activities__grid">
          {clubActivities.map((activity, index) => (
            <li className="club-activities__item" key={activity.id}>
              <article className="club-activities__card">
                <header className="club-activities__card-header">
                  <span className="club-activities__index" aria-hidden="true">
                    {formatIndex(index)}
                  </span>
                  <h3>{activity.title}</h3>
                </header>

                <p className="club-activities__description">
                  {activity.description}
                </p>

                {activity.keywords && (
                  <ul
                    className="club-activities__keywords"
                    aria-label={`${activity.title} 목록`}
                  >
                    {activity.keywords.map((keyword) => (
                      <li key={keyword.name}>
                        <strong>{keyword.name}</strong>
                        <span>{keyword.detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>

        <article
          className="website-project"
          aria-labelledby="website-project-title"
        >
          <header className="website-project__header">
            <div>
              {/*<p className="website-project__eyebrow">*/}
              {/*  <span aria-hidden="true" />*/}
              {/*  ONGOING PROJECT*/}
              {/*</p>*/}
              <h3 id="website-project-title">{websiteProject.title}</h3>
            </div>
            {/*<span className="website-project__status">진행 중</span>*/}
          </header>

          <div className="website-project__body">
            <div className="website-project__overview">
              <p className="website-project__summary">
                {websiteProject.summary}
              </p>
              {websiteProject.descriptions.map((description) => (
                <p key={description}>{description}</p>
              ))}
            </div>

            <dl className="website-project__stack">
              {websiteProject.techGroups.map((group) => (
                <div key={group.category}>
                  <dt>{group.category}</dt>
                  <dd>
                    {group.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </div>

      <style>{`
        .club-activities {
          --club-activities-ink: #11171c;
          --club-activities-slate: #62696d;
          --club-activities-muted: #959b9e;
          --club-activities-line: #d8dbd9;
          --club-activities-soft: #f5f5f2;
          --club-activities-accent: #03045e;
          --club-activities-accent-soft: #90e0ef;

          width: 100%;
          background: #ffffff;
          color: var(--club-activities-ink);
          font-family: var(--font-site);
        }

        .club-activities *,
        .club-activities *::before,
        .club-activities *::after {
          box-sizing: border-box;
        }

        .club-activities__inner {
          width: min(
            calc(100% - var(--page-gutter) * 2),
            var(--content-max)
          );
          margin: 0 auto;
          padding-block: clamp(3rem, 6vw, 6rem);
        }

        .club-activities__header {
          padding-bottom: clamp(2.5rem, 4vw, 4rem);
          border-bottom: 1px solid var(--club-activities-line);
        }

        .club-activities__title {
          margin: 0;
          font-size: clamp(4rem, 4.5vw, 5.5rem);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.065em;
        }

        .club-activities__title span {
          color: var(--club-activities-accent);
        }

        .club-activities__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          margin: 0;
          padding: 0;
          border-bottom: 1px solid var(--club-activities-line);
          list-style: none;
        }

        .club-activities__item {
          min-width: 0;
          border-bottom: 1px solid var(--club-activities-line);
        }

        .club-activities__item:nth-child(odd) {
          border-right: 1px solid var(--club-activities-line);
        }

        .club-activities__item:nth-last-child(-n + 2) {
          border-bottom: 0;
        }

        .club-activities__card {
          display: flex;
          flex-direction: column;
          min-height: clamp(18rem, 25vw, 23rem);
          padding: clamp(1.75rem, 3vw, 3rem);
        }

        .club-activities__item:nth-child(odd) .club-activities__card {
          padding-left: 0;
        }

        .club-activities__item:nth-child(even) .club-activities__card {
          padding-right: 0;
        }

        .club-activities__card-header {
          display: grid;
          grid-template-columns: 2.5rem minmax(0, 1fr);
          gap: 1rem;
          align-items: start;
        }

        .club-activities__index {
          padding-top: 0.4rem;
          color: var(--club-activities-muted);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .club-activities__card h3 {
          max-width: 28rem;
          margin: 0;
          font-size: clamp(1.75rem, 2.5vw, 3rem);
          font-weight: 750;
          line-height: 1.08;
          letter-spacing: -0.055em;
          word-break: keep-all;
        }

        .club-activities__description {
          max-width: 31rem;
          margin: clamp(2rem, 4vw, 3.5rem) 0 0 3.5rem;
          color: var(--club-activities-slate);
          font-size: clamp(0.95rem, 1.15vw, 1.125rem);
          line-height: 1.7;
          letter-spacing: -0.025em;
          white-space: pre-line;
          word-break: keep-all;
        }

        .club-activities__keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: auto 0 0 3.5rem;
          padding: clamp(2rem, 3vw, 3rem) 0 0;
          list-style: none;
        }

        .club-activities__keywords li {
          display: inline-flex;
          align-items: baseline;
          gap: 0.5rem;
          padding: 0.65rem 0.8rem;
          background: var(--club-activities-soft);
          line-height: 1;
        }

        .club-activities__keywords strong {
          font-size: 0.875rem;
          font-weight: 750;
          letter-spacing: -0.02em;
        }

        .club-activities__keywords span {
          color: var(--club-activities-muted);
          font-size: 0.75rem;
          letter-spacing: -0.02em;
        }

        .website-project {
          margin-top: clamp(3.5rem, 7vw, 7rem);
          padding: clamp(2rem, 4vw, 4.5rem);
          overflow: hidden;
          background: var(--club-activities-accent);
          color: #ffffff;
        }

        .website-project__header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          padding-bottom: clamp(2rem, 4vw, 3.5rem);
          border-bottom: 1px solid rgba(255, 255, 255, 0.28);
        }

        .website-project__eyebrow {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin: 0 0 1.25rem;
          color: var(--club-activities-accent-soft);
          font-size: clamp(0.6875rem, 0.7vw, 0.8125rem);
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .website-project__eyebrow span {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: var(--club-activities-accent-soft);
          box-shadow: 0 0 0.75rem rgba(144, 224, 239, 0.8);
        }

        .website-project h3 {
          max-width: 48rem;
          margin: 0;
          font-size: clamp(2.5rem, 5vw, 5.75rem);
          font-weight: 750;
          line-height: 0.98;
          letter-spacing: -0.065em;
          word-break: keep-all;
        }

        .website-project__status {
          flex: 0 0 auto;
          padding: 0.65rem 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.55);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .website-project__body {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(3rem, 6vw, 7rem);
          padding-top: clamp(2.5rem, 5vw, 4.5rem);
          white-space: pre-line;
        }

        .website-project__overview {
          max-width: 37rem;
          white-space: pre-line;
        }

        .website-project__overview p {
          margin: 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: clamp(0.9375rem, 1.1vw, 1.0625rem);
          line-height: 1.8;
          letter-spacing: -0.025em;
          word-break: keep-all;
          white-space: pre-line;
        }

        .website-project__overview p + p {
          margin-top: 1.25rem;
          white-space: pre-line;
        }

        .website-project__overview .website-project__summary {
          margin-bottom: clamp(2rem, 3vw, 3rem);
          color: #ffffff;
          font-size: clamp(1.25rem, 1.8vw, 1.75rem);
          font-weight: 650;
          line-height: 1.55;
          letter-spacing: -0.04em;
          white-space: pre-line;
        }

        .website-project__stack {
          margin: 0;
        }

        .website-project__stack > div {
          display: grid;
          grid-template-columns: minmax(7rem, 0.35fr) minmax(0, 1fr);
          gap: 1.5rem;
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.22);
        }

        .website-project__stack > div:last-child {
          border-bottom: 1px solid rgba(255, 255, 255, 0.22);
        }

        .website-project__stack dt {
          color: var(--club-activities-accent-soft);
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .website-project__stack dd {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem 0.9rem;
          margin: 0;
        }

        .website-project__stack dd span {
          font-size: clamp(0.8125rem, 0.9vw, 0.9375rem);
          font-weight: 550;
          line-height: 1.5;
        }

        @media (max-width: 68.75rem) {
          .club-activities__title {
            font-size: clamp(3.5rem, 6vw, 4.25rem);
          }

          .club-activities__card {
            min-height: 19rem;
          }

          .website-project__body {
            grid-template-columns: 1fr;
          }

          .website-project__overview {
            max-width: 45rem;
          }
        }

        @media (max-width: 45rem) {
          .club-activities__inner {
            width: calc(100% - 2rem);
            padding-block: 2rem;
          }

          .club-activities__header {
            padding-bottom: 2rem;
          }

          .club-activities__title {
            font-size: clamp(2.5rem, 10.5vw, 3.375rem);
          }

          .club-activities__grid {
            grid-template-columns: 1fr;
          }

          .club-activities__item,
          .club-activities__item:nth-child(odd),
          .club-activities__item:nth-last-child(-n + 2) {
            border-right: 0;
            border-bottom: 1px solid var(--club-activities-line);
          }

          .club-activities__item:last-child {
            border-bottom: 0;
          }

          .club-activities__card,
          .club-activities__item:nth-child(odd) .club-activities__card,
          .club-activities__item:nth-child(even) .club-activities__card {
            min-height: 0;
            padding: 2rem 0;
          }

          .club-activities__card h3 {
            font-size: clamp(1.75rem, 8vw, 2.5rem);
          }

          .club-activities__description {
            margin: 1.5rem 0 0 3.5rem;
          }

          .club-activities__keywords {
            margin: 0 0 0 3.5rem;
            padding-top: 2rem;
          }

          .website-project {
            margin-top: 3.5rem;
            padding: 1.5rem;
          }

          .website-project__header {
            display: block;
          }

          .website-project h3 {
            font-size: clamp(2.25rem, 11vw, 3.5rem);
          }

          .website-project__status {
            display: inline-block;
            margin-top: 1.5rem;
          }

          .website-project__body {
            gap: 2.5rem;
            padding-top: 2.5rem;
          }

          .website-project__stack > div {
            grid-template-columns: 1fr;
            gap: 0.65rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .website-project__eyebrow span {
            box-shadow: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Activities
