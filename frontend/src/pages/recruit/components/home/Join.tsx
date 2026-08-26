import { useState } from 'react'

import {
  type JoinInfoIcon,
  faqData,
  joinContent,
  joinInfo,
} from '../../data/join.data'

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ActivityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h12l4 4v12H4z" />
      <path d="M16 4v5h5" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 2.5 2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.32l-5.8 3.05 1.11-6.47-4.7-4.58 6.49-.94z" />
    </svg>
  )
}

function JoinIcon({ icon }: { icon: JoinInfoIcon }) {
  switch (icon) {
    case 'calendar':
      return <CalendarIcon />

    case 'users':
      return <UsersIcon />

    case 'activity':
      return <ActivityIcon />

    case 'star':
      return <StarIcon />
  }
}

export function Join() {
  const [openFaq, setOpenFaq] = useState<number | null>(1)

  const toggleFaq = (index: number) => {
    setOpenFaq((current) => (current === index ? null : index))
  }

  return (
    <section className="join" id="join">
      <div className="join__inner">
        <div className="join__main">
          {/* 모집 안내 */}
          <div className="join__intro">
            <p className="join__eyebrow">{joinContent.eyebrow}</p>

            <h2 className="join__title">{joinContent.title}</h2>

            <p className="join__description">{joinContent.description}</p>

            <div className="join__info">
              {joinInfo.map((item) => (
                <div className="join__info-item" key={item.label}>
                  <div className="join__info-icon">
                    <JoinIcon icon={item.icon} />
                  </div>

                  <div className="join__info-text">
                    <p className="join__info-label">{item.label}</p>

                    <p className="join__info-value">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="join__faq">
            <p className="join__eyebrow">{joinContent.faqEyebrow}</p>

            <h3 className="join__faq-title">{joinContent.faqTitle}</h3>

            <div className="join__faq-list">
              {faqData.map((item, index) => {
                const isOpen = openFaq === index
                const answerId = `join-faq-answer-${index}`

                return (
                  <article
                    className={`join__faq-item ${
                      isOpen ? 'join__faq-item--open' : ''
                    }`}
                    key={item.question}
                  >
                    <button
                      type="button"
                      className="join__faq-button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{item.question}</span>

                      <span className="join__faq-symbol" aria-hidden="true">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <div
                      id={answerId}
                      className="join__faq-answer"
                      aria-hidden={!isOpen}
                    >
                      <div className="join__faq-answer-inner">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="join__cta">
          <div className="join__cta-text">
            <h3 className="join__cta-title">{joinContent.ctaTitle}</h3>

            <p className="join__cta-description">
              {joinContent.ctaDescription}
            </p>
          </div>

          <a
            className="join__cta-button"
            href={joinContent.ctaHref}
            target="_blank"
            rel="noreferrer"
          >
            <span>{joinContent.ctaLabel}</span>

            <span className="join__cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      <style>{`
        .join {
          width: 100%;
          background: #ffffff;
          color: #111111;
          box-sizing: border-box;
        }

        .join *,
        .join *::before,
        .join *::after {
          box-sizing: border-box;
        }

        /*
         * 섹션 전체 폭
         *
         * 좌우 여백을 동일하게 유지하면서
         * 이전보다 콘텐츠 영역을 넓게 사용한다.
         */
        .join__inner {
          width: min(
            calc(100% - clamp(2rem, 5vw, 6rem)),
            107.5rem
          );

          min-height: 100svh;

          margin: 0 auto;

          padding:
            clamp(4rem, 8vh, 7rem)
            0
            clamp(3rem, 7vh, 6rem);

          display: flex;
          flex-direction: column;
          justify-content: space-between;

          gap: clamp(4rem, 8vh, 8rem);
        }

        /*
         * 모집안내 + FAQ
         */
        .join__main {
          display: grid;

          grid-template-columns:
            minmax(22rem, 0.9fr)
            minmax(32rem, 1.55fr);

          gap: clamp(4rem, 7vw, 9rem);
        }

        /*
         * 공통 작은 영문 제목
         */
        .join__eyebrow {
          margin: 0 0 clamp(1.6rem, 3vw, 2.8rem);

          font-size: clamp(
            0.72rem,
            0.7vw,
            0.9rem
          );

          font-weight: 700;
          line-height: 1;

          letter-spacing: -0.015em;
        }

        /*
         * 모집 안내
         */
        .join__title {
          margin: 0;

          font-size: clamp(
            3.75rem,
            6vw,
            7rem
          );

          font-weight: 800;
          line-height: 0.95;

          letter-spacing: -0.065em;

          word-break: keep-all;
        }

        .join__description {
          max-width: 29rem;

          margin:
            clamp(2rem, 4vw, 3.4rem)
            0
            0;

          font-size: clamp(
            0.95rem,
            1vw,
            1.16rem
          );

          font-weight: 400;
          line-height: 1.75;

          letter-spacing: -0.025em;

          word-break: keep-all;
        }

        /*
         * 모집 세부 정보
         */
        .join__info {
          max-width: 31rem;

          margin-top: clamp(
            2.4rem,
            5vw,
            4rem
          );

          padding-top: clamp(
            2rem,
            3vw,
            2.8rem
          );

          border-top: 1px solid #1a1a1a;

          display: grid;

          gap: clamp(
            1.6rem,
            2.6vw,
            2.3rem
          );
        }

        .join__info-item {
          display: grid;

          grid-template-columns:
            2.8rem
            minmax(0, 1fr);

          align-items: center;

          gap: 1.1rem;
        }

        .join__info-icon {
          width: 2rem;
          height: 2rem;

          color: #111111;
        }

        .join__info-icon svg {
          width: 100%;
          height: 100%;
        }

        .join__info-text {
          min-width: 0;
        }

        .join__info-label {
          margin: 0 0 0.35rem;

          font-size: clamp(
            0.83rem,
            0.8vw,
            0.98rem
          );

          font-weight: 700;

          letter-spacing: -0.025em;
        }

        .join__info-value {
          margin: 0;

          color: #333333;

          font-size: clamp(
            0.8rem,
            0.78vw,
            0.94rem
          );

          line-height: 1.55;

          letter-spacing: -0.025em;

          word-break: keep-all;
        }

        /*
         * FAQ
         */
        .join__faq {
          min-width: 0;
        }

        .join__faq-title {
          margin:
            0
            0
            clamp(2.5rem, 4vw, 4rem);

          font-size: clamp(
            2.8rem,
            4.6vw,
            5.4rem
          );

          font-weight: 800;
          line-height: 1;

          letter-spacing: -0.065em;

          word-break: keep-all;
        }

        .join__faq-list {
          border-top: 1px solid #b9b9b9;
        }

        .join__faq-item {
          border-bottom: 1px solid #d5d5d5;
        }

        .join__faq-button {
          width: 100%;

          min-height: clamp(
            4.2rem,
            6vw,
            5.6rem
          );

          padding: 0.25rem 0;

          border: 0;

          background: transparent;
          color: #111111;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 2rem;

          text-align: left;

          cursor: pointer;
        }

        .join__faq-button > span:first-child {
          font-size: clamp(
            1rem,
            1.15vw,
            1.35rem
          );

          font-weight: 700;
          line-height: 1.4;

          letter-spacing: -0.035em;

          word-break: keep-all;
        }

        .join__faq-symbol {
          flex: 0 0 auto;

          width: 1.5rem;

          font-size: clamp(
            1.6rem,
            1.8vw,
            2rem
          );

          font-weight: 300;
          line-height: 1;

          text-align: center;
        }

        /*
         * FAQ 아코디언 애니메이션
         */
        .join__faq-answer {
          display: grid;

          grid-template-rows: 0fr;

          visibility: hidden;

          transition:
            grid-template-rows 280ms ease,
            visibility 280ms;
        }

        .join__faq-item--open
          .join__faq-answer {
          grid-template-rows: 1fr;

          visibility: visible;
        }

        .join__faq-answer-inner {
          min-height: 0;
          overflow: hidden;
        }

        .join__faq-answer-inner p {
          max-width: 46rem;

          margin: 0;

          padding:
            0
            3rem
            clamp(1.7rem, 2.5vw, 2.3rem)
            0;

          color: #333333;

          font-size: clamp(
            0.88rem,
            0.9vw,
            1.03rem
          );

          line-height: 1.8;

          letter-spacing: -0.025em;

          word-break: keep-all;
        }

        /*
         * 하단 CTA
         */
        .join__cta {
          min-height: clamp(
            9rem,
            13vw,
            12rem
          );

          padding:
            clamp(1.8rem, 3.5vw, 3rem)
            clamp(1.8rem, 3.5vw, 3.5rem);

          border: 1px solid #111111;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 3rem;
        }

        .join__cta-title {
          margin: 0;

          font-size: clamp(
            1.65rem,
            2.2vw,
            2.6rem
          );

          font-weight: 800;
          line-height: 1.1;

          letter-spacing: -0.05em;

          word-break: keep-all;
        }

        .join__cta-description {
          margin: 0.8rem 0 0;

          color: #444444;

          font-size: clamp(
            0.82rem,
            0.84vw,
            1rem
          );

          line-height: 1.6;

          letter-spacing: -0.02em;

          word-break: keep-all;
        }

        .join__cta-button {
          width: clamp(
            15rem,
            25vw,
            24rem
          );

          min-height: clamp(
            4rem,
            5.5vw,
            5.2rem
          );

          padding: 0 2rem;

          background: #111111;
          color: #ffffff;

          text-decoration: none;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 2rem;

          font-size: clamp(
            0.9rem,
            0.95vw,
            1.08rem
          );

          font-weight: 700;

          letter-spacing: -0.025em;

          transition:
            background-color 180ms ease,
            transform 180ms ease;
        }

        .join__cta-arrow {
          font-size: 1.4em;
          font-weight: 300;

          transition: transform 180ms ease;
        }

        .join__cta-button:hover {
          background: #292929;
        }

        .join__cta-button:hover
          .join__cta-arrow {
          transform: translateX(0.3rem);
        }

        /*
         * 키보드 접근성
         */
        .join__cta-button:focus-visible,
        .join__faq-button:focus-visible {
          outline: 2px solid #111111;
          outline-offset: 4px;
        }

        /*
         * 태블릿
         */
        @media (max-width: 64rem) {
          .join__main {
            grid-template-columns: 1fr;

            gap: clamp(
              5rem,
              10vw,
              8rem
            );
          }

          .join__intro {
            display: grid;

            grid-template-columns:
              minmax(0, 1fr)
              minmax(18rem, 0.8fr);

            column-gap: 4rem;
          }

          .join__intro .join__eyebrow,
          .join__intro .join__title,
          .join__intro .join__description {
            grid-column: 1;
          }

          .join__info {
            grid-column: 2;
            grid-row: 1 / span 3;

            align-self: end;

            margin-top: 0;
          }
        }

        /*
         * 모바일
         */
        @media (max-width: 48rem) {
          .join__inner {
            min-height: auto;

            padding: 4rem 0;

            gap: 4rem;
          }

          .join__intro {
            display: block;
          }

          .join__title {
            font-size: clamp(
              3.4rem,
              15vw,
              5.6rem
            );
          }

          .join__description {
            max-width: 30rem;
          }

          .join__info {
            margin-top: 2.8rem;
          }

          .join__faq-title {
            margin-bottom: 2rem;

            font-size: clamp(
              2.8rem,
              11vw,
              4.5rem
            );
          }

          .join__faq-button {
            min-height: 4.7rem;
          }

          .join__faq-answer-inner p {
            padding-right: 1rem;
          }

          .join__cta {
            flex-direction: column;

            align-items: stretch;

            gap: 2rem;
          }

          .join__cta-button {
            width: 100%;
          }
        }

        /*
         * 작은 모바일
         */
        @media (max-width: 30rem) {
          .join__title {
            font-size: clamp(
              3rem,
              17vw,
              4.6rem
            );
          }

          .join__info-item {
            grid-template-columns:
              2.4rem
              minmax(0, 1fr);
          }

          .join__info-icon {
            width: 1.7rem;
            height: 1.7rem;
          }

          .join__faq-button {
            gap: 1rem;
          }

          .join__cta {
            padding: 1.5rem;
          }
        }

        /*
         * 모션 최소화 설정
         */
        @media (prefers-reduced-motion: reduce) {
          .join__faq-answer,
          .join__cta-button,
          .join__cta-arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
