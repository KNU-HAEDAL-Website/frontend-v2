import { useEffect, useRef, useState } from 'react'

import { type BootcampDay, bootcamps } from '../../data/bootcamp.data'

const scheduleDays: readonly {
  day: BootcampDay
  englishName: string
}[] = [
  { day: '월', englishName: 'MON' },
  { day: '화', englishName: 'TUE' },
  { day: '수', englishName: 'WED' },
  { day: '목', englishName: 'THU' },
  { day: '금', englishName: 'FRI' },
]

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

export function Bootcamp() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeSlug, setActiveSlug] = useState(bootcamps[0].slug)
  const activeIndex = bootcamps.findIndex(
    (bootcamp) => bootcamp.slug === activeSlug,
  )
  const currentIndex = activeIndex < 0 ? 0 : activeIndex
  const activeBootcamp = bootcamps[currentIndex]
  const mastheadRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const masthead = mastheadRef.current
    if (!masthead) return

    const target = masthead.querySelector('.scroll-highlight-wrapper')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        target.classList.toggle('is-visible', entry.isIntersecting)
      },
      {
        threshold: 0.25,
      },
    )

    observer.observe(masthead)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="activities"
      aria-labelledby="activities-title"
    >
      <div className="activities__inner">
        <header className="activities__masthead" ref={mastheadRef}>
          <h2 id="activities-title" className="activities__title">
            <span className="scroll-highlight-wrapper">
              해달 그리고
              <br />
              <em className="activities_titleLine">부트캠프</em>
            </span>
          </h2>
        </header>

        <div className="activities__catalog">
          <nav className="activities__directory" aria-label="부트캠프 선택">
            <ol className="activities__tabs">
              {bootcamps.map((bootcamp, index) => {
                const isActive = index === currentIndex

                return (
                  <li key={bootcamp.slug}>
                    <button
                      type="button"
                      className={
                        isActive
                          ? 'activities__tab is-active'
                          : 'activities__tab'
                      }
                      aria-pressed={isActive}
                      aria-controls="activities-panel"
                      onClick={() => setActiveSlug(bootcamp.slug)}
                    >
                      <span className="activities__tabNumber">
                        {formatIndex(index)}
                      </span>
                      <span className="activities__tabName">
                        {bootcamp.name}
                      </span>
                      <span
                        className="activities__availability"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <article
            key={activeBootcamp.slug}
            id="activities-panel"
            className="activities__panel"
            tabIndex={0}
            aria-live="polite"
            aria-labelledby="activities-current-title"
          >
            <header className="activities__panelHeader">
              <div>
                <div className="activities__nameLine">
                  <h3 id="activities-current-title">{activeBootcamp.name}</h3>
                  <span>{activeBootcamp.level}</span>
                </div>
                <p className="activities__headline">
                  {activeBootcamp.headline}
                </p>
              </div>
              <p className="activities__count" aria-hidden="true">
                {formatIndex(currentIndex)}
                <span>/ {String(bootcamps.length).padStart(2, '0')}</span>
              </p>
            </header>

            <figure
              className="activities__sample"
              aria-label={`${activeBootcamp.name} 예제 코드`}
            >
              {/*<figcaption>SAMPLE — {activeBootcamp.sampleLabel}</figcaption>*/}
              <pre>
                <code>{activeBootcamp.sample}</code>
              </pre>
            </figure>

            <section
              className="activities__curriculum"
              aria-labelledby="activities-curriculum-title"
            >
              <header className="activities__curriculumHeader">
                <h4 id="activities-curriculum-title">CURRICULUM</h4>
              </header>
              <ol>
                {activeBootcamp.curriculum.map((item) => (
                  <li key={`${activeBootcamp.slug}-${item.period}`}>
                    <span className="activities__period">{item.period}</span>
                    <strong>{item.subject}</strong>
                    <span className="activities__outcome">{item.outcome}</span>
                  </li>
                ))}
              </ol>
            </section>
          </article>
        </div>

        <section
          className="activities__schedule"
          aria-labelledby="bootcamp-schedule-title"
        >
          <header className="activities__scheduleHeader">
            <h3 id="bootcamp-schedule-title">부트캠프 요일 안내</h3>
            <p>요일별로 운영되는 부트캠프 강좌를 확인해보세요.</p>
          </header>

          <div className="activities__scheduleGrid">
            {scheduleDays.map(({ day, englishName }) => {
              const scheduledBootcamps = bootcamps.filter((bootcamp) =>
                bootcamp.day.includes(day),
              )

              return (
                <article className="activities__dayCard" key={day}>
                  <header>
                    <h4>{day}</h4>
                    <span>{englishName}</span>
                  </header>
                  <ul>
                    {scheduledBootcamps.map((bootcamp) => (
                      <li key={`${day}-${bootcamp.slug}`}>
                        <strong>{bootcamp.name}</strong>
                        <span
                          className={`activities__level activities__level--${bootcamp.level}`}
                        >
                          {bootcamp.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </section>
      </div>

      <style>{`
        .scroll-highlight-wrapper {
          position: relative;
          display: inline-block;
          isolation: isolate;
        }

        .scroll-highlight-wrapper::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(calc(-50% - 100px), 60px) scale(0);
          width: 3.5em;
          height: 3.5em;
          background-color: #d8dbd9;
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          background: radial-gradient(
          circle,
          rgba(216, 219, 217, 0.9) 0%,
          rgba(216, 219, 217, 0.5) 35%,
          rgba(216, 219, 217, 0.14) 60%,
          rgba(216, 219, 217, 0) 75%);
          transition: transform 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease;
          }

        .scroll-highlight-wrapper.is-visible::after {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-highlight-wrapper::after {
          transition: none;
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          }
        }


        .activities {
          --activities-ink: #11171c;
          --activities-slate: #62696d;
          --activities-muted: #959b9e;
          --activities-line: #d8dbd9;
          --activities-paper: #f5f5f2;
          --activities-soft: #eeeeeb;
          --activities-dark: #111619;
          --activities-dark-text: #f5f5f2;

          box-sizing: border-box;
          min-height: 100vh;
          min-height: 100svh;
          margin: 0;
          padding: clamp(2.5rem, 5vh, 4rem) 0 clamp(4rem, 7vh, 6rem);
          border-top: 4px solid var(--activities-ink);
          background: var(--activities-paper);
          color: var(--activities-ink);
          font-family: var(--font-site);
        }

        .activities *,
        .activities *::before,
        .activities *::after {
          box-sizing: border-box;
        }

        .activities__inner {
          width: min(
            calc(100% - var(--page-gutter) * 2),
            var(--content-max)
          );
          margin: 0 auto;
        }

        .activities__masthead {
          padding-bottom: clamp(2.5rem, 4.5vh, 3.5rem);
          border-bottom: 1px solid var(--activities-line);
        }

        .activities__sample figcaption,
        .activities__curriculumHeader {
          font-family: var(--font-site);
          font-size: clamp(0.625rem, 0.55rem + 0.15vw, 0.75rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.15em;
        }

        .activities__title {
          margin: 0;
          font-size: clamp(4rem, 4.5vw, 5.5rem);
          font-weight: 750;
          line-height: 0.94;
          letter-spacing: -0.074em;
          word-break: keep-all;
        }

        .activities__title > span {
          display: block;
        }

        .activities__title > span.scroll-highlight-wrapper {
          display: inline-block;
          width: fit-content;
        }

        .activities__titleLine {
          white-space: nowrap;
        }

        .activities__title em {
          color: #03045e;
          font-style: normal;
        }


        .activities__catalog {
          display: grid;
          grid-template-columns: clamp(18rem, 22vw, 24rem) minmax(0, 1fr);
          gap: clamp(3rem, 4vw, 5rem);
          padding-top: clamp(2.5rem, 4vh, 3.5rem);
        }


        .activities__tabs {
          margin: 0;
          padding: 0;
          border-bottom: 1px solid var(--activities-line);
          list-style: none;
        }
        .activities__tab {
          position: relative;
          display: grid;
          grid-template-columns: 3.25rem minmax(0, 1fr) 0.5rem;
          gap: 0.75rem;
          align-items: center;
          width: 100%;
          height: clamp(4.5rem, 4.6vw, 5.25rem);
          padding: 0 clamp(1rem, 1.3vw, 1.375rem);
          border: 0;
          background: transparent;
          color: var(--activities-slate);
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 160ms ease, color 160ms ease;
        }

        .activities__tab::before {
          position: absolute;
          inset: 0 auto 0 0;
          width: 4px;
          background: var(--activities-ink);
          content: "";
          opacity: 0;
          transition: opacity 160ms ease;
        }

        .activities__tab:hover {
          background: var(--activities-soft);
        }

        .activities__tab:focus-visible {
          outline: 2px solid var(--activities-ink);
          outline-offset: -2px;
        }

        .activities__tab.is-active {
          background: var(--activities-ink);
          color: var(--activities-dark-text);
        }

        .activities__tab.is-active::before {
          opacity: 1;
        }

        .activities__tabNumber {
          position: relative;
          isolation: isolate;
          z-index: 0;
          transition: color 0.3s ease 0.15s;
          color: var(--activities-muted);
          font-family: var(--font-site);
          font-size: clamp(0.6875rem, 0.62vw, 0.8125rem);
          letter-spacing: 0.07em;
        }
        .activities__tabNumber::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 10%;
          transform: translate(calc(-50% - 40px), 20px) scale(0);
          width: 3.5em;
          height: 3.5em;
          border-radius: 50%;
          z-index: -1;
          opacity: 0;
          pointer-events: none;
          background: radial-gradient(
          circle,
          rgba(17, 23, 28, 0.2) 0%,
          rgba(17, 23, 28, 0.1) 35%,
          rgba(17, 23, 28, 0.03) 60%,
          rgba(17, 23, 28, 0) 75%);
        transition:
        transform 0.7s cubic-bezier(0.175,0.885,0.32,1.275),
        opacity 0.4s ease;
      }
        .activities__tab:hover .activities__tabNumber::after{
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        }
        .activities__tab:hover .activities__tabNumber {
          color: var(--activities-ink);
        }
        .activities__tab:hover .activities__tabName {
          color: var(--activities-ink);
          transition: color 0.3s ease 0.15s;
        }

        .activities__tab.is-active .activities__tabNumber {
          color: var(--activities-dark-text);
        }

        .activities__tabName {
          overflow: hidden;
          font-size: clamp(1rem, 1vw, 1.25rem);
          font-weight: 560;
          line-height: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .activities__tab.is-active .activities__tabName {
          color: var(--activities-dark-text);
          font-weight: 700;
        }

        .activities__availability,
        .activities__legend > span {
          width: 0.375rem;
          height: 0.375rem;
          background: var(--activities-muted);
        }

        .activities__tab.is-active .activities__availability {
          width: 0.5rem;
          height: 0.5rem;
          background: var(--activities-dark-text);
        }

        .activities__legend {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0 0 0.75rem;
          color: var(--activities-muted);
          font-size: clamp(0.6875rem, 0.65vw, 0.8125rem);
          line-height: 1;
        }

        .activities__panel {
          height: clamp(34rem, 68vh, 46rem);
          height: clamp(34rem, 68svh, 46rem);
          min-width: 0;
          overflow-y: auto;
          overscroll-behavior-y: contain;
          scrollbar-color: var(--activities-muted) transparent;
          scrollbar-gutter: stable;
          scrollbar-width: thin;
        }

        .activities__panel::-webkit-scrollbar {
          width: 6px;
        }

        .activities__panel::-webkit-scrollbar-track {
          background: transparent;
        }

        .activities__panel::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: var(--activities-slate);
        }

        .activities__panel:focus-visible {
          outline: 2px solid var(--activities-ink);
          outline-offset: 3px;
        }

        .activities__panelHeader {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 2rem;
          min-height: clamp(10rem, 10vw, 12rem);
        }

        .activities__nameLine {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .activities__nameLine h3 {
          margin: 0;
          font-family: var(--font-site);
          font-size: clamp(3.25rem, 4.2vw, 4.75rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .activities__nameLine > span {
          padding: 0.375rem 0.625rem 0.3125rem;
          border-radius: 2px;
          background: #0077b6;
          color: #caf0f8;
          font-size: clamp(0.8125rem, 0.72vw, 0.9375rem);
          font-weight: 700;
          line-height: 1;
        }

        .activities__headline {
          margin: 1.125rem 0 0;
          color: var(--activities-slate);
          font-size: clamp(1.75rem, 2vw, 2.5rem);
          font-weight: 650;
          line-height: 1.25;
          letter-spacing: -0.04em;
          word-break: keep-all;
        }

        .activities__count {
          margin: 0.25rem 0 0;
          font-family: var(--font-site);
          font-size: clamp(1.5rem, 1.5vw, 2rem);
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .activities__count span {
          color: var(--activities-muted);
          font-size: 0.8125rem;
        }

        .activities__sample {
          min-height: clamp(12rem, 11vw, 14rem);
          margin: 0 0 clamp(2rem, 3vw, 3rem);
          padding: clamp(1.75rem, 2vw, 2.25rem);
          overflow: hidden;
          border-radius: 6px;
          border: 1px solid #252b2e;
          background: var(--activities-dark);
          color: var(--activities-dark-text);
        }

        .activities__sample figcaption {
          margin: 0 0 clamp(1.25rem, 1.5vw, 1.75rem);
          color: var(--activities-muted);
          font-size: clamp(0.75rem, 0.68rem + 0.1vw, 0.875rem);
        }

        .activities__sample pre {
          margin: 0;
          overflow-x: auto;
          font-family: var(--font-site);
          font-size: clamp(0.9375rem, 0.9vw, 1.125rem);
          line-height: 1.65;
          tab-size: 2;
        }

        .activities__sample code {
          font: inherit;
        }

        .activities__curriculumHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--activities-line);
          color: var(--activities-muted);
          font-size: clamp(0.875rem, 0.78rem + 0.12vw, 1rem);
        }

        .activities__curriculumHeader h4,
        .activities__curriculumHeader p {
          margin: 0;
          font: inherit;
        }

        .activities__curriculum ol {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .activities__curriculum li {
          display: grid;
          grid-template-columns: 5.5rem minmax(14rem, 0.9fr) minmax(0, 1fr);
          gap: 1rem;
          align-items: center;
          min-height: clamp(5rem, 4.6vw, 6rem);
          border-bottom: 1px solid var(--activities-line);
          font-size: clamp(1.125rem, 1.1vw, 1.375rem);
        }

        .activities__curriculum strong {
          font-weight: 650;
        }

        .activities__period {
          color: var(--activities-muted);
          font-family: var(--font-site);
          font-size: clamp(0.8125rem, 0.72rem + 0.1vw, 0.9375rem);
          letter-spacing: 0.08em;
        }

        .activities__outcome {
          color: var(--activities-muted);
          font-size: clamp(0.9375rem, 0.9vw, 1.0625rem);
          white-space: nowrap;
        }

        .activities__schedule {
          margin-top: clamp(6rem, 11vw, 10rem);
          padding-top: clamp(4rem, 7vw, 6rem);
          border-top: 1px solid var(--activities-line);
        }

        .activities__scheduleHeader {
          margin-bottom: clamp(2.5rem, 4vw, 4rem);
        }

        .activities__scheduleHeader h3 {
          margin: 0;
          font-size: clamp(2.75rem, 4vw, 4.75rem);
          font-weight: 650;
          line-height: 1.05;
          letter-spacing: -0.055em;
          word-break: keep-all;
        }

        .activities__scheduleHeader p {
          margin: 1.25rem 0 0;
          color: var(--activities-slate);
          font-size: clamp(1rem, 1.25vw, 1.375rem);
          line-height: 1.5;
          word-break: keep-all;
        }

        .activities__scheduleGrid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(0.75rem, 1.25vw, 1.5rem);
        }

        .activities__dayCard {
          min-width: 0;
          min-height: clamp(22rem, 29vw, 29rem);
          padding: clamp(1.5rem, 2vw, 2.25rem);
          border: 1px solid var(--activities-line);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.3);
        }

        .activities__dayCard > header {
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--activities-line);
        }

        .activities__dayCard h4 {
          margin: 0;
          font-size: clamp(2.25rem, 2.8vw, 3.25rem);
          font-weight: 650;
          line-height: 1;
        }

        .activities__dayCard header span {
          display: block;
          margin-top: 0.75rem;
          color: var(--activities-slate);
          font-size: 0.8125rem;
          letter-spacing: 0.25em;
        }

        .activities__dayCard ul {
          display: grid;
          gap: 1.5rem;
          margin: 0;
          padding: 2rem 0 0;
          list-style: none;
        }

        .activities__dayCard li {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          justify-content: space-between;
        }

        .activities__dayCard li strong {
          min-width: 0;
          font-size: clamp(1rem, 1.25vw, 1.375rem);
          font-weight: 560;
          line-height: 1.25;
          word-break: keep-all;
        }

        .activities__level {
          flex: 0 0 auto;
          padding: 0.35rem 0.7rem 0.3rem;
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 700;
          line-height: 1;
        }

        .activities__level--기초 {
          background: var(--activities-soft);
          color: var(--activities-ink);
        }

        .activities__level--심화 {
          background: var(--activities-dark);
          color: var(--activities-dark-text);
        }

        @media (max-width: 68.75rem) {
          .activities__title {
            font-size: clamp(3.5rem, 6vw, 4.25rem);
          }

          .activities__catalog {
            grid-template-columns: 16rem minmax(0, 1fr);
            gap: 2rem;
          }

          .activities__tab {
            height: 4.25rem;
          }

          .activities__panelHeader {
            min-height: 9.5rem;
          }

          .activities__panel {
            height: clamp(28rem, 70vh, 36rem);
            height: clamp(28rem, 70svh, 36rem);
          }

          .activities__sample {
            min-height: 10rem;
          }

          .activities__curriculum li {
            grid-template-columns: 4.5rem minmax(0, 1fr) auto;
          }

          .activities__scheduleGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .activities__dayCard {
            min-height: 21rem;
          }
        }

        @media (max-width: 45rem) {
          .activities {
            padding-top: 2rem;
            padding-bottom: 3rem;
          }

          .activities__masthead {
            padding-bottom: 2rem;
          }

          .activities__title {
            font-size: clamp(2.5rem, 10.5vw, 3.375rem);
          }

          .activities__titleLine {
            white-space: normal;
          }

          .activities__introduction {
            font-size: 0.875rem;
          }

          .activities__catalog {
            display: block;
            padding-top: 1.75rem;
          }

          .activities__directory {
            margin-bottom: 2.25rem;
          }

          .activities__tabs {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            border: 0;
            scrollbar-width: none;
          }

          .activities__tabs::-webkit-scrollbar {
            display: none;
          }

          .activities__tabs li {
            flex: 0 0 auto;
          }

          .activities__tab {
            display: flex;
            gap: 0.5rem;
            width: auto;
            height: 2.75rem;
            padding: 0 0.875rem;
            border: 1px solid var(--activities-line);
          }

          .activities__tab::before,
          .activities__availability,
          .activities__legend {
            display: none;
          }

          .activities__tab.is-active {
            border-color: var(--activities-ink);
            background: var(--activities-ink);
            color: var(--activities-dark-text);
          }

          .activities__panelHeader {
            min-height: 9.5rem;
          }

          .activities__headline {
            font-size: 1.5rem;
          }

          .activities__sample {
            min-height: 9.5rem;
            padding: 1.125rem;
          }

          .activities__schedule {
            margin-top: 5rem;
            padding-top: 3.5rem;
          }

          .activities__scheduleHeader h3 {
            font-size: clamp(2.25rem, 10vw, 3.25rem);
          }

          .activities__scheduleGrid {
            grid-template-columns: none;
            grid-auto-columns: minmax(15rem, 82vw);
            grid-auto-flow: column;
            overflow-x: auto;
            padding-bottom: 0.75rem;
            scroll-snap-type: x proximity;
            scrollbar-width: thin;
          }

          .activities__dayCard {
            min-height: 20rem;
            scroll-snap-align: start;
          }
        }

        @media (max-width: 28.75rem) {
          .activities__title {
            font-size: clamp(2.25rem, 11vw, 2.875rem);
          }

          .activities__nameLine h3 {
            font-size: 2.5rem;
          }

          .activities__count {
            font-size: 0.875rem;
          }

          .activities__sample pre {
            font-size: 0.8125rem;
          }

          .activities__curriculum li {
            grid-template-columns: 4.25rem minmax(0, 1fr);
            min-height: 4rem;
          }

          .activities__outcome {
            grid-column: 2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .activities__tab {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
