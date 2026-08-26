import { clubStats } from '../../data/stats.data'

export function Stats() {
  return (
    <section className="stats" aria-labelledby="stats-title">
      <div className="stats__inner">
        <header className="stats__header">
          <h1 id="stats-title" className="stats__title">
            숫자로 보는 해달
          </h1>
        </header>

        <dl className="stats__list">
          {clubStats.map((stat) => (
            <div
              className={
                stat.accent ? 'stats__row stats__row--accent' : 'stats__row'
              }
              key={stat.id}
            >
              <dt className="stats__label">
                <span className="stats__status" aria-hidden="true" />
                {stat.label}
              </dt>

              <dd
                className="stats__value"
                aria-label={`${stat.label} ${stat.value.toLocaleString('ko-KR')}${stat.unit}`}
              >
                <span className="stats__marker" aria-hidden="true">
                  <span />
                </span>
                <span aria-hidden="true">
                  {stat.value.toLocaleString('ko-KR')}
                </span>
                <span className="stats__unit" aria-hidden="true">
                  {stat.unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        .stats {
          display: flex;
          box-sizing: border-box;
          min-height: 100vh;
          min-height: 100svh;
          margin: 0;
          padding: 0 0 clamp(2rem, 4vh, 3rem);
          overflow: hidden;
          border-top: 4px solid #858585;
          background: #ffffff;
          color: #06111e;
          font-family: var(--font-site);
        }

        .stats *,
        .stats *::before,
        .stats *::after {
          box-sizing: border-box;
        }

        .stats__inner {
          display: flex;
          flex-direction: column;
          width: min(
            calc(100% - var(--page-gutter) * 2),
            var(--content-max)
          );
          min-height: calc(100svh - clamp(2rem, 4vh, 3rem) - 4px);
          margin: 0 auto;
        }

        .stats__header {
          display: flex;
          align-items: flex-start;
          min-height: clamp(13rem, 28svh, 19rem);
          padding-top: clamp(3rem, 7vh, 5rem);
        }

        .stats__title {
          max-width: 38rem;
          margin: 0;
          font-size: clamp(4rem, 4.5vw, 5.5rem);
          font-weight: 650;
          line-height: 1.32;
          letter-spacing: -0.045em;
          word-break: keep-all;
        }

        .stats__list {
          display: flex;
          flex: 1;
          flex-direction: column;
          min-height: 0;
          margin: 0;
          padding: 0;
          border-top: 1px solid #e3e6e7;
        }

        .stats__row {
          display: grid;
          flex: 1 0 11rem;
          grid-template-columns: minmax(14rem, 28%) minmax(0, 1fr);
          align-items: center;
          min-height: 11rem;
          border-bottom: 1px solid #e3e6e7;
        }

        .stats__label {
          display: flex;
          align-items: center;
          gap: clamp(1.125rem, 1.25vw, 1.5rem);
          margin: 0;
          color: #13202c;
          font-size: clamp(1.125rem, 1.25vw, 1.5rem);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.02em;
          word-break: keep-all;
        }

        .stats__status {
          width: 0.375rem;
          height: 0.375rem;
          background: transparent;
        }

        .stats__row--accent .stats__status {
          background: #77e7aa;
        }

        .stats__value {
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 0.08em;
          min-width: 0;
          margin: 0;
          font-family: var(--font-site);
          font-size: clamp(5.5rem, 10vw, 12rem);
          font-weight: 400;
          line-height: 0.88;
          letter-spacing: -0.065em;
          white-space: nowrap;
        }

        .stats__unit {
          color: #13202c;
          font-family: var(--font-site);
          font-size: 0.25em;
          font-weight: 500;
          line-height: 1;
          letter-spacing: -0.06em;
        }



        @media (max-width: 68.75rem) {
          .stats__header {
            min-height: clamp(12rem, 28svh, 14rem);
            padding-top: clamp(2.5rem, 6vh, 3.5rem);
          }

          .stats__title {
            max-width: 30rem;
            font-size: clamp(1.375rem, 2.4vw, 1.75rem);
          }

          .stats__row {
            grid-template-columns: minmax(10rem, 30%) minmax(0, 1fr);
          }

          .stats__value {
            font-size: clamp(5rem, 10vw, 7.5rem);
          }

          .stats__marker {
            width: 1.5rem;
            height: 1.5rem;
          }
        }

        @media (max-width: 32.5rem) {
          .stats {
            min-height: 100svh;
            padding-bottom: 1.5rem;
          }

          .stats__inner {
            min-height: calc(100svh - 1.75rem);
          }

          .stats__header {
            min-height: clamp(10.5rem, 24svh, 12.5rem);
            padding-top: 2.5rem;
          }

          .stats__title {
            max-width: 21rem;
            font-size: 1.25rem;
          }

          .stats__row {
            display: flex;
            flex: 1 0 9.5rem;
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
            min-height: 9.5rem;
            padding: 1.125rem 0;
          }

          .stats__label {
            font-size: 0.75rem;
          }

          .stats__value {
            margin-top: 1.5rem;
            font-size: clamp(4rem, 20vw, 5.25rem);
          }

          .stats__marker {
            width: 1.125rem;
            height: 1.125rem;
            border-radius: 0.25rem;
          }
        }
      `}</style>
    </section>
  )
}
