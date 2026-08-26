import { Activities } from './Activities'
import { Contributors } from './Contributors'
import { Hero } from './Hero'
import { Highlights } from './Highlights'
import { Join } from './Join'
import { Projects } from './Projects'
import Schedule from './Schedule'
import { Stats } from './Stats'
import { Tracks } from './Tracks'

export const RecruitHome = () => {
  return (
    <div className="home">
      <style>{`
        .home {
          --content-max: 107.5rem;
          --font-site: 'NanumSquare', sans-serif;
          --page-gutter: clamp(1.5rem, 4vw, 4.5rem);
          width: 100%;
        }

        .home__sections {
          display: flex;
          flex-direction: column;
          gap: clamp(7rem, 10vw, 12rem);
          padding: clamp(7rem, 10vw, 12rem)
            clamp(1.5rem, 7vw, 8rem);
          background: #ffffff;
        }

        .home__sections > section {
          width: min(100%, 80rem);
          min-height: auto;
          margin-inline: auto;
          border: 0;
          background: #ffffff;
        }

        .home__sections .stats__inner,
        .home__sections .join__inner {
          min-height: auto;
        }

        @media (max-width: 45rem) {
          .home__sections {
            gap: clamp(4.5rem, 18vw, 7rem);
            padding: clamp(4.5rem, 18vw, 7rem) 1rem;
          }
        }
      `}</style>
      <Hero />
      <div className="home__sections">
        <Stats />
        <Activities />
        <Tracks />
        <Projects />
        <Highlights />
        <Schedule />
        <Join />
        <Contributors />
      </div>
    </div>
  )
}
