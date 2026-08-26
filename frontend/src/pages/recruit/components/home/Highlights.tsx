import { useEffect } from 'react'

import {
  type HighlightItem,
  highlights,
  instagram,
} from '../../data/highlight.data'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HighlightCard({
  item,
  featured = false,
}: {
  item: HighlightItem
  featured?: boolean
}) {
  const content = (
    <>
      <img
        className="highlights-card-image"
        src={item.image}
        alt={item.alt}
        loading={featured ? 'eager' : 'lazy'}
      />

      <div className="highlights-card-shade" />

      <div className="highlights-card-content">
        <div>
          <h3>{item.title}</h3>
          <time>{item.date}</time>
        </div>

        <span className="highlights-card-arrow">{/*<ArrowIcon />*/}</span>
      </div>
    </>
  )

  if (item.href) {
    return (
      <a
        className={`highlights-card ${
          featured ? 'highlights-card-featured' : ''
        }`}
        href={item.href}
      >
        {content}
      </a>
    )
  }

  return (
    <article
      className={`highlights-card ${
        featured ? 'highlights-card-featured' : ''
      }`}
    >
      {content}
    </article>
  )
}

export function Highlights() {
  const [featured, ...secondary] = highlights

  useEffect(() => {
    // 인스타그램 임베딩 캡션 제거용도
    document.querySelectorAll('blockquote.instagram-media').forEach((el) => {
      el.removeAttribute('data-instgrm-captioned')
    })

    const existingScript = document.querySelector(
      'script[src="//www.instagram.com/embed.js"]',
    )

    if (window.instgrm) {
      window.instgrm.Embeds.process()
      return
    }

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        window.instgrm?.Embeds.process()
      })

      return
    }

    const script = document.createElement('script')

    script.async = true
    script.src = '//www.instagram.com/embed.js'

    script.onload = () => {
      window.instgrm?.Embeds.process()
    }

    document.body.appendChild(script)
  }, [])

  return (
    <>
      <section className="highlights" id="highlights">
        <div className="highlights-inner">
          <header className="highlights-header">
            <div className="highlights-heading">
              <h2>
                해달
                <br className="highlights-title-break" />
                <span> 하이라이트</span>
              </h2>

              {/*<p>해달의 순간들.</p>*/}
            </div>

            <a
              className="highlights-instagram-link"
              href={instagram.profileUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>인스타그램 더보기</span>
              <ArrowIcon />
            </a>
          </header>

          <div className="highlights-divider" />

          <div className="highlights-layout">
            <div className="highlights-gallery">
              {featured && <HighlightCard item={featured} featured />}

              <div className="highlights-secondary">
                {secondary.map((item) => (
                  <HighlightCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <aside
              className="highlights-instagram"
              aria-label={`${instagram.username} Instagram 게시물`}
            >
              {/* 이거 좀 이상함 지울거임*/}
              {/*<div className="highlights-instagram-label">*/}
              {/*  <span>Instagram</span>*/}
              {/*  <span>{instagram.username}</span>*/}
              {/*</div>*/}

              <div className="highlights-instagram-embed">
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={instagram.permalink}
                  data-instgrm-version="14"
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        .highlights {
          box-sizing: border-box;

          width: 100%;
          min-height: 100svh;

          padding:
            clamp(4rem, 8vh, 7rem)
            var(--page-gutter, clamp(1.5rem, 4vw, 4.5rem));

          color: #11171c;
          background: #f8f8f6;
        }

        .highlights,
        .highlights * {
          box-sizing: border-box;
        }

        .highlights-inner {
          width: min(100%, var(--content-max, 107.5rem));
          margin: 0 auto;
        }

        /* --------------------------------
         * Header
         * -------------------------------- */

        .highlights-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 3rem;
        }

        .highlights-heading h2 {
          margin: 0;

          font-size: clamp(3.4rem, 5.2vw, 6.4rem);
          font-weight: 800;
          line-height: 0.88;
          letter-spacing: -0.075em;
        }

        .highlights-heading h2 span {
          color: #03045e;
        }

        .highlights-title-break {
          display: none;
        }

        .highlights-heading p {
          margin:
            clamp(1rem, 1.5vw, 1.5rem)
            0
            0;

          color: #888d8f;

          font-size: clamp(0.875rem, 0.9vw, 1.1rem);
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: -0.025em;
        }

        .highlights-instagram-link {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;

          flex-shrink: 0;

          padding: 0.5rem 0;

          color: #11171c;

          font-size: clamp(0.875rem, 0.9vw, 1rem);
          font-weight: 600;
          letter-spacing: -0.025em;
          text-decoration: none;

          transition:
            gap 180ms ease,
            opacity 180ms ease;
        }

        .highlights-instagram-link svg {
          width: 1.35rem;
          height: 1.35rem;
        }

        .highlights-instagram-link:hover {
          gap: 1rem;
          opacity: 0.55;
        }

        .highlights-divider {
          width: 100%;
          height: 1px;

          margin:
            clamp(1.75rem, 3vw, 3rem)
            0
            clamp(2rem, 3vw, 3.5rem);

          background: #aeb1b1;
        }

        /* --------------------------------
         * Main layout
         * -------------------------------- */

        .highlights-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1.32fr)
            minmax(20rem, 0.9fr);

          align-items: start;
          gap: clamp(1.5rem, 3vw, 3.5rem);
        }

        /* --------------------------------
         * Gallery
         * -------------------------------- */

        .highlights-gallery {
          min-width: 0;
        }

        .highlights-card {
          position: relative;

          display: block;
          overflow: hidden;

          min-width: 0;

          color: #ffffff;
          background: #171a1c;

          text-decoration: none;

          border-radius: 0.35rem;
          isolation: isolate;
        }

        .highlights-card-featured {
          aspect-ratio: 16 / 7;
        }

        .highlights-secondary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(0.4rem, 0.75vw, 0.75rem);

          margin-top: clamp(0.4rem, 0.75vw, 0.75rem);
        }

        .highlights-secondary .highlights-card {
          aspect-ratio: 4 / 3.05;
        }

        .highlights-card-image {
          position: absolute;
          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;
          // filter: grayscale(1);

          transition:
            transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 350ms ease;
        }

        .highlights-card-shade {
          position: absolute;
          inset: 0;
          z-index: 1;

          pointer-events: none;

          background:
            linear-gradient(
              180deg,
              rgb(0 0 0 / 0.02) 35%,
              rgb(0 0 0 / 0.72) 100%
            );
        }

        .highlights-card-content {
          position: absolute;
          inset:
            auto
            clamp(1rem, 1.6vw, 1.6rem)
            clamp(1rem, 1.5vw, 1.5rem);
          z-index: 2;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;

          pointer-events: none;
        }

        .highlights-card-content h3 {
          margin: 0 0 0.3rem;

          font-size: clamp(1rem, 1.25vw, 1.4rem);
          font-weight: 750;
          line-height: 1.2;
          letter-spacing: -0.04em;
        }

        .highlights-card-content time {
          display: block;

          color: rgb(255 255 255 / 0.8);

          font-size: clamp(0.7rem, 0.75vw, 0.9rem);
          font-weight: 500;
          letter-spacing: -0.015em;
        }

        .highlights-card-arrow {
          display: grid;
          flex: 0 0 auto;
          place-items: center;

          transition: transform 180ms ease;
        }

        .highlights-card-arrow svg {
          width: clamp(1.25rem, 1.5vw, 1.65rem);
          height: clamp(1.25rem, 1.5vw, 1.65rem);
        }

        .highlights-card[href]:hover .highlights-card-image {
          transform: scale(1.025);
          filter: grayscale(1) contrast(1.04);
        }

        .highlights-card[href]:hover .highlights-card-arrow {
          transform: translateX(0.3rem);
        }

        /* --------------------------------
         * Instagram
         * -------------------------------- */

        .highlights-instagram {
          min-width: 0;
        }

        .highlights-instagram-label {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-bottom: 0.75rem;

          color: #939799;

          font-size: clamp(0.68rem, 0.7vw, 0.8rem);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .highlights-instagram-embed {
          position: relative;

          width: 100%;
          overflow: hidden;

          border: 1px solid #d4d6d6;
          border-radius: 0.6rem;

          background: #ffffff;

          // filter: grayscale(1);
        }

        /*
         * Instagram embed 자체가 inline style을 많이 사용하기 때문에
         * 바깥 컨테이너를 통해 너비를 제어한다.
         */
        .highlights-instagram-embed .instagram-media {
          width: 100% !important;
          min-width: 0 !important;
          max-width: none !important;

          margin: 0 !important;

          border: 0 !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }

        /* --------------------------------
         * Responsive
         * -------------------------------- */

        @media (max-width: 75rem) {
          .highlights-layout {
            grid-template-columns: minmax(0, 1.15fr) minmax(18rem, 0.85fr);
            gap: 1.5rem;
          }

          .highlights-card-featured {
            aspect-ratio: 16 / 8;
          }
        }

        @media (max-width: 56rem) {
          .highlights {
            min-height: auto;
          }

          .highlights-header {
            align-items: flex-start;
          }

          .highlights-layout {
            grid-template-columns: 1fr;
          }

          .highlights-instagram {
            width: min(100%, 36rem);
            margin-top: 1.5rem;
          }
        }

        @media (max-width: 40rem) {
          .highlights {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .highlights-header {
            display: block;
          }

          .highlights-heading h2 {
            font-size: clamp(3rem, 14vw, 4.5rem);
            line-height: 0.9;
          }

          .highlights-title-break {
            display: block;
          }

          .highlights-heading h2 span {
            margin-left: 0;
          }

          .highlights-instagram-link {
            margin-top: 1.75rem;
          }

          .highlights-card-featured {
            aspect-ratio: 4 / 3;
          }

          .highlights-secondary {
            grid-template-columns: 1fr;
          }

          .highlights-secondary .highlights-card {
            aspect-ratio: 16 / 9;
          }

          .highlights-card-content {
            inset: auto 1.1rem 1.1rem;
          }

          .highlights-card-content h3 {
            font-size: 1.05rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .highlights-card-image,
          .highlights-card-arrow,
          .highlights-instagram-link {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
