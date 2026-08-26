export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__layout">
        <div className="hero__copy">
          <h1
            id="hero-title"
            className="hero__title"
            aria-label="ANY MAJOR. ONE CODE: HAEDAL;"
          >
            <span
              className="hero__titleLine hero__titleLine--muted"
              aria-hidden="true"
            >
              ANY MAJOR.
            </span>
            <span
              className="hero__titleLine hero__titleLine--muted"
              aria-hidden="true"
            >
              ONE CODE:
            </span>
            <span className="hero__titleLine" aria-hidden="true">
              HAEDAL;
            </span>
          </h1>
        </div>

        <div className="hero__trail">
          <p className="hero__trailText">경북대 IT대학 학술동아리 해달</p>
          <svg
            className="hero__arrow"
            viewBox="0 0 640 18"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M1 9H636M630 3L636 9L630 15" />
          </svg>
          <p className="hero__trailText">
            bootcamp, track, project, hackathon and more
          </p>
        </div>
      </div>

      <style>{`
        .hero {
          display: flex;
          box-sizing: border-box;
          min-height: calc(100vh - 4rem);
          min-height: calc(100svh - 4rem);
          margin: 0;
          padding: clamp(2.5rem, 5vh, 4rem) clamp(1rem, 1.5vw, 2rem)
            clamp(1.5rem, 4vh, 3rem);
          overflow: hidden;
          background: #ffffff;
          color: #000000;
          font-family: Arial, Helvetica, sans-serif;
        }

        .hero *,
        .hero *::before,
        .hero *::after {
          box-sizing: border-box;
        }

        .hero__layout {
          display: grid;
          flex: 1;
          grid-template-columns: minmax(0, 1.22fr) minmax(22rem, 0.78fr);
          gap: clamp(2.5rem, 4vw, 5rem);
          align-items: end;
          width: 100%;
        }

        .hero__copy {
          min-width: 0;
        }

        .hero__title {
          margin: 0;
          font-family: "Archivo Black", Arial, Helvetica, sans-serif;
          font-size: clamp(6.5rem, 9vw, 10.5rem);
          font-weight: 400;
          line-height: 0.86;
          letter-spacing: -0.045em;
        }

        .hero__titleLine {
          display: block;
          white-space: nowrap;
        }

        .hero__titleLine--muted {
          color: #737270;
        }

        .hero__description {
          margin: 0.75rem 0 0;
          color: #858482;
          font-family: inherit;
          font-size: clamp(1rem, 0.9rem + 0.2vw, 1.25rem);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.45px;
        }

        .hero__trail {
          width: 100%;
          margin-bottom: clamp(1rem, 5vh, 3.75rem);
        }

        .hero__arrow {
          display: block;
          width: 100%;
          height: 18px;
          overflow: visible;
          fill: none;
          stroke: #737270;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          vector-effect: non-scaling-stroke;
        }

        .hero__arrow path {
          vector-effect: non-scaling-stroke;
        }

        .hero__trailText {
          margin: 0;
          color: #858482;
          font-size: clamp(1.125rem, 1.25vw, 1.5rem);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -0.35px;
          text-align: right;
          white-space: nowrap;
        }

        @media (max-width: 68.75rem) {
          .hero__layout {
            grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
            gap: 2rem;
          }

          .hero__title {
            font-size: clamp(5rem, 8.5vw, 6.5rem);
          }

          .hero__trailText {
            font-size: clamp(1rem, 1.8vw, 1.25rem);
          }
        }

        @media (max-width: 51.25rem) {
          .hero {
            min-height: calc(100svh - 4rem);
            padding-top: clamp(2.5rem, 7vh, 4rem);
            padding-bottom: 1.5rem;
          }

          .hero__layout {
            grid-template-columns: 1fr;
            gap: clamp(2rem, 7vh, 3.5rem);
            align-content: end;
          }

          .hero__title {
            font-size: clamp(3.5rem, 10.5vw, 5rem);
          }

          .hero__description {
            margin-top: 10px;
            font-size: 1rem;
          }

          .hero__trail {
            width: 100%;
            margin-bottom: 0;
          }
        }

        @media (max-width: 30rem) {
          .hero {
            padding-top: 2rem;
            padding-bottom: 1rem;
          }

          .hero__layout {
            gap: 2.25rem;
          }

          .hero__title {
            font-size: clamp(2.75rem, 12.2vw, 3.25rem);
          }

          .hero__trailText {
            overflow-wrap: anywhere;
            font-size: 0.9375rem;
            line-height: 1.35;
            white-space: normal;
          }
        }

      `}</style>
    </section>
  )
}
