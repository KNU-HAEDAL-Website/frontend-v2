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
      className="bootcamp"
      aria-labelledby="bootcamp-title"
    >
      <div className="bootcamp__inner">
        <header className="bootcamp__masthead" ref={mastheadRef}>
          <h2 id="bootcamp-title" className="bootcamp__title">
            <span className="scroll-highlight-wrapper">
              해달 그리고
              <br />
              <em className="bootcamp__titleLine">부트캠프</em>
            </span>
          </h2>
        </header>

        <div className="bootcamp__catalog">
          <nav className="bootcamp__directory" aria-label="부트캠프 선택">
            <ol className="bootcamp__tabs">
              {bootcamps.map((bootcamp, index) => {
                const isActive = index === currentIndex

                return (
                  <li key={bootcamp.slug}>
                    <button
                      type="button"
                      className={
                        isActive ? 'bootcamp__tab is-active' : 'bootcamp__tab'
                      }
                      aria-pressed={isActive}
                      aria-controls="bootcamp-panel"
                      onClick={() => setActiveSlug(bootcamp.slug)}
                    >
                      <span className="bootcamp__tabNumber">
                        {formatIndex(index)}
                      </span>
                      <span className="bootcamp__tabName">{bootcamp.name}</span>
                      <span
                        className="bootcamp__availability"
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
            id="bootcamp-panel"
            className="bootcamp__panel"
            tabIndex={0}
            aria-live="polite"
            aria-labelledby="bootcamp-current-title"
          >
            <header className="bootcamp__panelHeader">
              <div>
                <div className="bootcamp__nameLine">
                  <h3 id="bootcamp-current-title">{activeBootcamp.name}</h3>
                  <span>{activeBootcamp.level}</span>
                </div>
                <p className="bootcamp__headline">{activeBootcamp.headline}</p>
              </div>
              <p className="bootcamp__count" aria-hidden="true">
                {formatIndex(currentIndex)}
                <span>/ {String(bootcamps.length).padStart(2, '0')}</span>
              </p>
            </header>

            <figure
              className="bootcamp__sample"
              aria-label={`${activeBootcamp.name} 예제 코드`}
            >
              {/*<figcaption>SAMPLE — {activeBootcamp.sampleLabel}</figcaption>*/}
              <pre>
                <code>{activeBootcamp.sample}</code>
              </pre>
            </figure>

            <section
              className="bootcamp__curriculum"
              aria-labelledby="bootcamp-curriculum-title"
            >
              <header className="bootcamp__curriculumHeader">
                <h4 id="bootcamp-curriculum-title">CURRICULUM</h4>
              </header>
              <ol>
                {activeBootcamp.curriculum.map((item) => (
                  <li key={`${activeBootcamp.slug}-${item.period}`}>
                    <span className="bootcamp__period">{item.period}</span>
                    <strong>{item.subject}</strong>
                    <span className="bootcamp__outcome">{item.outcome}</span>
                  </li>
                ))}
              </ol>
            </section>
          </article>
        </div>

        <section
          className="bootcamp__schedule"
          aria-labelledby="bootcamp-schedule-title"
        >
          <header className="bootcamp__scheduleHeader">
            <h3 id="bootcamp-schedule-title">부트캠프 요일 안내</h3>
            <p>요일별로 운영되는 부트캠프 강좌를 확인해보세요.</p>
          </header>

          <div className="bootcamp__scheduleGrid">
            {scheduleDays.map(({ day, englishName }) => {
              const scheduledBootcamps = bootcamps.filter((bootcamp) =>
                bootcamp.day.includes(day),
              )

              return (
                <article className="bootcamp__dayCard" key={day}>
                  <header>
                    <h4>{day}</h4>
                    <span>{englishName}</span>
                  </header>
                  <ul>
                    {scheduledBootcamps.map((bootcamp) => (
                      <li key={`${day}-${bootcamp.slug}`}>
                        <strong>{bootcamp.name}</strong>
                        <span
                          className={`bootcamp__level bootcamp__level--${bootcamp.level}`}
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


        .bootcamp {
          --bootcamp-ink: #11171c;
          --bootcamp-slate: #62696d;
          --bootcamp-muted: #959b9e;
          --bootcamp-line: #d8dbd9;
          --bootcamp-paper: #f5f5f2;
          --bootcamp-soft: #eeeeeb;
          --bootcamp-dark: #111619;
          --bootcamp-dark-text: #f5f5f2;

          box-sizing: border-box;
          min-height: 100vh;
          min-height: 100svh;
          margin: 0;
          padding: clamp(2.5rem, 5vh, 4rem) 0 clamp(4rem, 7vh, 6rem);
          border-top: 4px solid var(--bootcamp-ink);
          background: var(--bootcamp-paper);
          color: var(--bootcamp-ink);
          font-family: var(--font-site);
        }

        .bootcamp *,
        .bootcamp *::before,
        .bootcamp *::after {
          box-sizing: border-box;
        }

        .bootcamp__inner {
          width: min(
            calc(100% - var(--page-gutter) * 2),
            var(--content-max)
          );
          margin: 0 auto;
        }

        .bootcamp__masthead {
          padding-bottom: clamp(2.5rem, 4.5vh, 3.5rem);
          border-bottom: 1px solid var(--bootcamp-line);
        }

        .bootcamp__sample figcaption,
        .bootcamp__curriculumHeader {
          font-family: var(--font-site);
          font-size: clamp(0.625rem, 0.55rem + 0.15vw, 0.75rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.15em;
        }

        .bootcamp__title {
          margin: 0;
          font-size: clamp(4rem, 4.5vw, 5.5rem);
          font-weight: 750;
          line-height: 0.94;
          letter-spacing: -0.074em;
          word-break: keep-all;
        }

        .bootcamp__title > span {
          display: block;
        }

        .bootcamp__title > span.scroll-highlight-wrapper {
          display: inline-block;
          width: fit-content;
        }

        .bootcamp__titleLine {
          white-space: nowrap;
        }

        .bootcamp__title em {
          color: #03045e;
          font-style: normal;
        }


        .bootcamp__catalog {
          display: grid;
          grid-template-columns: clamp(18rem, 22vw, 24rem) minmax(0, 1fr);
          gap: clamp(3rem, 4vw, 5rem);
          padding-top: clamp(2.5rem, 4vh, 3.5rem);
        }


        .bootcamp__tabs {
          margin: 0;
          padding: 0;
          border-bottom: 1px solid var(--bootcamp-line);
          list-style: none;
        }
        .bootcamp__tab {
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
          color: var(--bootcamp-slate);
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: background-color 160ms ease, color 160ms ease;
        }

        .bootcamp__tab::before {
          position: absolute;
          inset: 0 auto 0 0;
          width: 4px;
          background: var(--bootcamp-ink);
          content: "";
          opacity: 0;
          transition: opacity 160ms ease;
        }

        .bootcamp__tab:hover {
          background: var(--bootcamp-soft);
        }

        .bootcamp__tab:focus-visible {
          outline: 2px solid var(--bootcamp-ink);
          outline-offset: -2px;
        }

        .bootcamp__tab.is-active {
          background: var(--bootcamp-ink);
          color: var(--bootcamp-dark-text);
        }

        .bootcamp__tab.is-active::before {
          opacity: 1;
        }

        .bootcamp__tabNumber {
          position: relative;
          isolation: isolate;
          z-index: 0;
          transition: color 0.3s ease 0.15s;
          color: var(--bootcamp-muted);
          font-family: var(--font-site);
          font-size: clamp(0.6875rem, 0.62vw, 0.8125rem);
          letter-spacing: 0.07em;
        }
        .bootcamp__tabNumber::after {
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
        .bootcamp__tab:hover .bootcamp__tabNumber::after{
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
        }
        .bootcamp__tab:hover .bootcamp__tabNumber {
          color: var(--bootcamp-ink);
        }
        .bootcamp__tab:hover .bootcamp__tabName {
          color: var(--bootcamp-ink);
          transition: color 0.3s ease 0.15s;
        }

        .bootcamp__tab.is-active .bootcamp__tabNumber {
          color: var(--bootcamp-dark-text);
        }

        .bootcamp__tabName {
          overflow: hidden;
          font-size: clamp(1rem, 1vw, 1.25rem);
          font-weight: 560;
          line-height: 1;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .bootcamp__tab.is-active .bootcamp__tabName {
          color: var(--bootcamp-dark-text);
          font-weight: 700;
        }

        .bootcamp__availability,
        .bootcamp__legend > span {
          width: 0.375rem;
          height: 0.375rem;
          background: var(--bootcamp-muted);
        }

        .bootcamp__tab.is-active .bootcamp__availability {
          width: 0.5rem;
          height: 0.5rem;
          background: var(--bootcamp-dark-text);
        }

        .bootcamp__legend {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem 0 0 0.75rem;
          color: var(--bootcamp-muted);
          font-size: clamp(0.6875rem, 0.65vw, 0.8125rem);
          line-height: 1;
        }

        .bootcamp__panel {
          height: clamp(34rem, 68vh, 46rem);
          height: clamp(34rem, 68svh, 46rem);
          min-width: 0;
          overflow-y: auto;
          overscroll-behavior-y: contain;
          scrollbar-color: var(--bootcamp-muted) transparent;
          scrollbar-gutter: stable;
          scrollbar-width: thin;
        }

        .bootcamp__panel::-webkit-scrollbar {
          width: 6px;
        }

        .bootcamp__panel::-webkit-scrollbar-track {
          background: transparent;
        }

        .bootcamp__panel::-webkit-scrollbar-thumb {
          border-radius: 999px;
          background: var(--bootcamp-slate);
        }

        .bootcamp__panel:focus-visible {
          outline: 2px solid var(--bootcamp-ink);
          outline-offset: 3px;
        }

        .bootcamp__panelHeader {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 2rem;
          min-height: clamp(10rem, 10vw, 12rem);
        }

        .bootcamp__nameLine {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bootcamp__nameLine h3 {
          margin: 0;
          font-family: var(--font-site);
          font-size: clamp(3.25rem, 4.2vw, 4.75rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .bootcamp__nameLine > span {
          padding: 0.375rem 0.625rem 0.3125rem;
          border-radius: 2px;
          background: #0077b6;
          color: #caf0f8;
          font-size: clamp(0.8125rem, 0.72vw, 0.9375rem);
          font-weight: 700;
          line-height: 1;
        }

        .bootcamp__headline {
          margin: 1.125rem 0 0;
          color: var(--bootcamp-slate);
          font-size: clamp(1.75rem, 2vw, 2.5rem);
          font-weight: 650;
          line-height: 1.25;
          letter-spacing: -0.04em;
          word-break: keep-all;
        }

        .bootcamp__count {
          margin: 0.25rem 0 0;
          font-family: var(--font-site);
          font-size: clamp(1.5rem, 1.5vw, 2rem);
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .bootcamp__count span {
          color: var(--bootcamp-muted);
          font-size: 0.8125rem;
        }

        .bootcamp__sample {
          min-height: clamp(12rem, 11vw, 14rem);
          margin: 0 0 clamp(2rem, 3vw, 3rem);
          padding: clamp(1.75rem, 2vw, 2.25rem);
          overflow: hidden;
          border-radius: 6px;
          border: 1px solid #252b2e;
          background: var(--bootcamp-dark);
          color: var(--bootcamp-dark-text);
        }

        .bootcamp__sample figcaption {
          margin: 0 0 clamp(1.25rem, 1.5vw, 1.75rem);
          color: var(--bootcamp-muted);
          font-size: clamp(0.75rem, 0.68rem + 0.1vw, 0.875rem);
        }

        .bootcamp__sample pre {
          margin: 0;
          overflow-x: auto;
          font-family: var(--font-site);
          font-size: clamp(0.9375rem, 0.9vw, 1.125rem);
          line-height: 1.65;
          tab-size: 2;
        }

        .bootcamp__sample code {
          font: inherit;
        }

        .bootcamp__curriculumHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--bootcamp-line);
          color: var(--bootcamp-muted);
          font-size: clamp(0.875rem, 0.78rem + 0.12vw, 1rem);
        }

        .bootcamp__curriculumHeader h4,
        .bootcamp__curriculumHeader p {
          margin: 0;
          font: inherit;
        }

        .bootcamp__curriculum ol {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .bootcamp__curriculum li {
          display: grid;
          grid-template-columns: 5.5rem minmax(14rem, 0.9fr) minmax(0, 1fr);
          gap: 1rem;
          align-items: center;
          min-height: clamp(5rem, 4.6vw, 6rem);
          border-bottom: 1px solid var(--bootcamp-line);
          font-size: clamp(1.125rem, 1.1vw, 1.375rem);
        }

        .bootcamp__curriculum strong {
          font-weight: 650;
        }

        .bootcamp__period {
          color: var(--bootcamp-muted);
          font-family: var(--font-site);
          font-size: clamp(0.8125rem, 0.72rem + 0.1vw, 0.9375rem);
          letter-spacing: 0.08em;
        }

        .bootcamp__outcome {
          color: var(--bootcamp-muted);
          font-size: clamp(0.9375rem, 0.9vw, 1.0625rem);
          white-space: nowrap;
        }

        .bootcamp__schedule {
          margin-top: clamp(6rem, 11vw, 10rem);
          padding-top: clamp(4rem, 7vw, 6rem);
          border-top: 1px solid var(--bootcamp-line);
        }

        .bootcamp__scheduleHeader {
          margin-bottom: clamp(2.5rem, 4vw, 4rem);
        }

        .bootcamp__scheduleHeader h3 {
          margin: 0;
          font-size: clamp(2.75rem, 4vw, 4.75rem);
          font-weight: 650;
          line-height: 1.05;
          letter-spacing: -0.055em;
          word-break: keep-all;
        }

        .bootcamp__scheduleHeader p {
          margin: 1.25rem 0 0;
          color: var(--bootcamp-slate);
          font-size: clamp(1rem, 1.25vw, 1.375rem);
          line-height: 1.5;
          word-break: keep-all;
        }

        .bootcamp__scheduleGrid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: clamp(0.75rem, 1.25vw, 1.5rem);
        }

        .bootcamp__dayCard {
          min-width: 0;
          min-height: clamp(22rem, 29vw, 29rem);
          padding: clamp(1.5rem, 2vw, 2.25rem);
          border: 1px solid var(--bootcamp-line);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.3);
        }

        .bootcamp__dayCard > header {
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--bootcamp-line);
        }

        .bootcamp__dayCard h4 {
          margin: 0;
          font-size: clamp(2.25rem, 2.8vw, 3.25rem);
          font-weight: 650;
          line-height: 1;
        }

        .bootcamp__dayCard header span {
          display: block;
          margin-top: 0.75rem;
          color: var(--bootcamp-slate);
          font-size: 0.8125rem;
          letter-spacing: 0.25em;
        }

        .bootcamp__dayCard ul {
          display: grid;
          gap: 1.5rem;
          margin: 0;
          padding: 2rem 0 0;
          list-style: none;
        }

        .bootcamp__dayCard li {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          justify-content: space-between;
        }

        .bootcamp__dayCard li strong {
          min-width: 0;
          font-size: clamp(1rem, 1.25vw, 1.375rem);
          font-weight: 560;
          line-height: 1.25;
          word-break: keep-all;
        }

        .bootcamp__level {
          flex: 0 0 auto;
          padding: 0.35rem 0.7rem 0.3rem;
          border-radius: 999px;
          font-size: 0.8125rem;
          font-weight: 700;
          line-height: 1;
        }

        .bootcamp__level--기초 {
          background: var(--bootcamp-soft);
          color: var(--bootcamp-ink);
        }

        .bootcamp__level--심화 {
          background: var(--bootcamp-dark);
          color: var(--bootcamp-dark-text);
        }

        @media (max-width: 68.75rem) {
          .bootcamp__title {
            font-size: clamp(3.5rem, 6vw, 4.25rem);
          }

          .bootcamp__catalog {
            grid-template-columns: 16rem minmax(0, 1fr);
            gap: 2rem;
          }

          .bootcamp__tab {
            height: 4.25rem;
          }

          .bootcamp__panelHeader {
            min-height: 9.5rem;
          }

          .bootcamp__panel {
            height: clamp(28rem, 70vh, 36rem);
            height: clamp(28rem, 70svh, 36rem);
          }

          .bootcamp__sample {
            min-height: 10rem;
          }

          .bootcamp__curriculum li {
            grid-template-columns: 4.5rem minmax(0, 1fr) auto;
          }

          .bootcamp__scheduleGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .bootcamp__dayCard {
            min-height: 21rem;
          }
        }

        @media (max-width: 45rem) {
          .bootcamp {
            padding-top: 2rem;
            padding-bottom: 3rem;
          }

          .bootcamp__masthead {
            padding-bottom: 2rem;
          }

          .bootcamp__title {
            font-size: clamp(2.5rem, 10.5vw, 3.375rem);
          }

          .bootcamp__titleLine {
            white-space: normal;
          }

          .bootcamp__introduction {
            font-size: 0.875rem;
          }

          .bootcamp__catalog {
            display: block;
            padding-top: 1.75rem;
          }

          .bootcamp__directory {
            margin-bottom: 2.25rem;
          }

          .bootcamp__tabs {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            border: 0;
            scrollbar-width: none;
          }

          .bootcamp__tabs::-webkit-scrollbar {
            display: none;
          }

          .bootcamp__tabs li {
            flex: 0 0 auto;
          }

          .bootcamp__tab {
            display: flex;
            gap: 0.5rem;
            width: auto;
            height: 2.75rem;
            padding: 0 0.875rem;
            border: 1px solid var(--bootcamp-line);
          }

          .bootcamp__tab::before,
          .bootcamp__availability,
          .bootcamp__legend {
            display: none;
          }

          .bootcamp__tab.is-active {
            border-color: var(--bootcamp-ink);
            background: var(--bootcamp-ink);
            color: var(--bootcamp-dark-text);
          }

          .bootcamp__panelHeader {
            min-height: 9.5rem;
          }

          .bootcamp__headline {
            font-size: 1.5rem;
          }

          .bootcamp__sample {
            min-height: 9.5rem;
            padding: 1.125rem;
          }

          .bootcamp__schedule {
            margin-top: 5rem;
            padding-top: 3.5rem;
          }

          .bootcamp__scheduleHeader h3 {
            font-size: clamp(2.25rem, 10vw, 3.25rem);
          }

          .bootcamp__scheduleGrid {
            grid-template-columns: none;
            grid-auto-columns: minmax(15rem, 82vw);
            grid-auto-flow: column;
            overflow-x: auto;
            padding-bottom: 0.75rem;
            scroll-snap-type: x proximity;
            scrollbar-width: thin;
          }

          .bootcamp__dayCard {
            min-height: 20rem;
            scroll-snap-align: start;
          }
        }

        @media (max-width: 28.75rem) {
          .bootcamp__title {
            font-size: clamp(2.25rem, 11vw, 2.875rem);
          }

          .bootcamp__nameLine h3 {
            font-size: 2.5rem;
          }

          .bootcamp__count {
            font-size: 0.875rem;
          }

          .bootcamp__sample pre {
            font-size: 0.8125rem;
          }

          .bootcamp__curriculum li {
            grid-template-columns: 4.25rem minmax(0, 1fr);
            min-height: 4rem;
          }

          .bootcamp__outcome {
            grid-column: 2;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bootcamp__tab {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
