import { useMemo, useState } from 'react'

import {
  type ScheduleDate,
  type ScheduleEvent,
  scheduleEvents,
} from '../../data/schedule.data'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

interface CalendarCell {
  year: number
  month: number
  day: number

  isCurrentMonth: boolean
}

interface EventSegment {
  isRange: boolean
  continuesBefore: boolean
  continuesAfter: boolean
  showLabel: boolean
}

const SCHEDULE_STYLES = `
  .schedule {
    --schedule-paper: #f5f5f2;
    --schedule-white: #ffffff;

    --schedule-ink: #11171c;
    --schedule-slate: #62696d;
    --schedule-muted: #9a9fa1;

    --schedule-line: #d8dbd9;
    --schedule-soft: #eeeeeb;

    width: 100%;

    background: var(--schedule-paper);
    color: var(--schedule-ink);
  }

  .schedule *,
  .schedule *::before,
  .schedule *::after {
    box-sizing: border-box;
  }

  .schedule__inner {
    width: min(
      calc(
        100% -
        (
          var(
            --page-gutter,
            clamp(1.5rem, 4vw, 4.5rem)
          ) * 2
        )
      ),
      var(--content-max, 107.5rem)
    );

    margin-inline: auto;

    padding-block:
      clamp(5rem, 9vw, 9rem)
      clamp(6rem, 11vw, 11rem);
  }

  .schedule__layout {
    display: grid;

    grid-template-columns:
      minmax(15rem, 0.32fr)
      minmax(0, 1fr);

    gap: clamp(3rem, 6vw, 7.5rem);

    align-items: start;
  }

  /* ---------------------------------
     SIDEBAR
  --------------------------------- */

  .schedule-sidebar {
    position: sticky;

    top: 2rem;

    min-width: 0;
  }

  .schedule-sidebar__eyebrow {
    margin: 0 0 1rem;

    font-family:
      "JetBrains Mono",
      "SFMono-Regular",
      Consolas,
      monospace;

    font-size: clamp(0.72rem, 0.72vw, 0.84rem);
    font-weight: 500;

    letter-spacing: 0.12em;

    color: var(--schedule-muted);
  }

  .schedule-sidebar__month {
    margin: 0;

    font-size: clamp(5rem, 7vw, 8rem);
    font-weight: 800;

    line-height: 0.9;
    letter-spacing: -0.075em;
  }

  .schedule-sidebar__rule {
    display: flex;

    align-items: center;

    width: min(100%, 18rem);

    margin-block:
      clamp(2rem, 3.5vw, 3rem)
      clamp(2.5rem, 4vw, 4rem);
  }

  .schedule-sidebar__rule::before {
    content: "";

    flex: 1;

    height: 1px;

    background: var(--schedule-ink);
  }

  .schedule-sidebar__rule::after {
    content: "→";

    display: block;

    margin-left: -0.1rem;

    font-size: 1.4rem;
    font-weight: 300;

    line-height: 1;
  }

  .schedule-sidebar__description {
    max-width: 20rem;

    margin: 0;

    font-size: clamp(1rem, 1.05vw, 1.2rem);
    font-weight: 500;

    line-height: 1.7;
    letter-spacing: -0.025em;
  }

  /* ---------------------------------
     NAVIGATION
  --------------------------------- */

  .schedule-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;

    width: min(100%, 18rem);

    margin-top: clamp(3rem, 5vw, 5rem);

    border: 1px solid var(--schedule-ink);
  }

  .schedule-nav__button {
    min-height: 3.25rem;

    border: 0;

    background: transparent;
    color: var(--schedule-ink);

    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;

    cursor: pointer;

    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  .schedule-nav__button + .schedule-nav__button {
    border-left: 1px solid var(--schedule-ink);
  }

  .schedule-nav__button:hover {
    background: var(--schedule-ink);
    color: #fff;
  }

  .schedule-nav__button--primary {
    background: var(--schedule-ink);
    color: #fff;
  }

  .schedule-nav__button--primary:hover {
    background: transparent;
    color: var(--schedule-ink);
  }

  /* ---------------------------------
     ALL SCHEDULE CTA
  --------------------------------- */

  .schedule-sidebar__all {
    display: inline-flex;

    align-items: center;
    justify-content: space-between;

    gap: 2rem;

    width: min(100%, 13rem);
    min-height: 3.25rem;

    margin-top: clamp(3.5rem, 6vw, 5rem);

    padding-inline: 1.25rem;

    border: 1px solid var(--schedule-ink);

    color: var(--schedule-ink);

    font-size: 0.88rem;
    font-weight: 550;

    text-decoration: none;

    transition:
      background-color 150ms ease,
      color 150ms ease;
  }

  .schedule-sidebar__all:hover {
    background: var(--schedule-ink);
    color: #fff;
  }

  .schedule-sidebar__all-arrow {
    font-size: 1.35rem;
    font-weight: 300;

    transform: rotate(-45deg);
  }

  /* ---------------------------------
     CALENDAR
  --------------------------------- */

  .schedule-calendar {
    overflow: hidden;

    border: 1px solid var(--schedule-line);
    border-radius: 1rem;

    background: var(--schedule-white);
  }

  .schedule-calendar__weekdays {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    height: clamp(4rem, 5vw, 5rem);

    align-items: center;
  }

  .schedule-calendar__weekday {
    display: flex;

    align-items: center;
    justify-content: center;

    height: 100%;

    font-size: clamp(0.82rem, 0.85vw, 0.95rem);
    font-weight: 650;
  }

  .schedule-calendar__grid {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));

    border-top: 1px solid var(--schedule-line);
    border-left: 1px solid var(--schedule-line);
  }

  .calendar-day {
    --calendar-cell-padding: clamp(0.8rem, 1vw, 1.1rem);

    position: relative;

    min-width: 0;
    min-height: clamp(9rem, 12vw, 12.5rem);

    padding: var(--calendar-cell-padding);

    border-right: 1px solid var(--schedule-line);
    border-bottom: 1px solid var(--schedule-line);

    background: var(--schedule-white);
  }

  .calendar-day__number {
    display: block;

    margin-bottom: 1rem;

    font-size: clamp(0.9rem, 0.95vw, 1.05rem);
    font-weight: 500;
  }

  .calendar-day--outside .calendar-day__number {
    color: #c5c8c7;
  }

  /* ---------------------------------
     EVENTS
  --------------------------------- */

  .calendar-day__events {
    display: flex;
    flex-direction: column;

    gap: 0.45rem;
  }

  .calendar-event {
    display: grid;
    grid-template-columns:
      0.48rem
      minmax(0, 1fr);
    column-gap: 0.55rem;
    align-items: baseline;
    min-width: 0;
  }

  .calendar-event::before {
    content: "";
    width: 0.48rem;
    height: 0.48rem;
    margin-top: 0.1rem;
    border-radius: 50%;
    background: var(--schedule-ink);
  }

  .calendar-event--range {
    position: relative;
    z-index: 1;

    display: flex;
    align-items: center;

    min-height: 1.85rem;
    padding: 0.3rem 0.65rem;

    border-radius: 0.3rem;
    background: #03045e;
    color: #ffffff;
  }

  .calendar-event--range::before {
    content: none;
  }

  .calendar-event--continues-before {
    margin-left: calc(0px - var(--calendar-cell-padding) - 1px);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .calendar-event--continues-after {
    margin-right: calc(0px - var(--calendar-cell-padding) - 1px);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .calendar-event--range .calendar-event__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .calendar-event__title {
    display: block;

    min-width: 0;

    overflow-wrap: break-word;

    font-size: clamp(0.72rem, 0.78vw, 0.88rem);
    font-weight: 600;

    line-height: 1.45;
    letter-spacing: -0.02em;
  }

  .calendar-event__time {
    display: block;
    grid-column: 2;

    margin-top: 0.25rem;

    font-family:
      "JetBrains Mono",
      "SFMono-Regular",
      Consolas,
      monospace;

    font-size: clamp(0.66rem, 0.68vw, 0.77rem);

    line-height: 1.45;
  }

  /* ---------------------------------
     RESPONSIVE
  --------------------------------- */

  @media (max-width: 78rem) {
    .schedule__layout {
      grid-template-columns: 15rem minmax(0, 1fr);

      gap: 3rem;
    }

    .calendar-day {
      min-height: 9rem;
    }
  }

  @media (max-width: 64rem) {
    .schedule__layout {
      grid-template-columns: 1fr;

      gap: 4rem;
    }

    .schedule-sidebar {
      position: static;

      display: grid;

      grid-template-columns:
        minmax(0, 1fr)
        minmax(14rem, 0.5fr);

      column-gap: 3rem;
    }

    .schedule-sidebar__main {
      grid-row: span 3;
    }

    .schedule-nav {
      margin-top: 0;
    }

    .schedule-sidebar__all {
      margin-top: 2.5rem;
    }
  }

  @media (max-width: 48rem) {
    .schedule-sidebar {
      display: block;
    }

    .schedule-nav {
      margin-top: 3rem;
    }

    .schedule-calendar {
      overflow-x: auto;

      border-radius: 0.6rem;
    }

    .schedule-calendar__content {
      min-width: 52rem;
    }

    .calendar-day {
      min-height: 8.75rem;
    }
  }

  @media (max-width: 32rem) {
    .schedule-sidebar__month {
      font-size: 4.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .schedule *,
    .schedule *::before,
    .schedule *::after {
      transition: none !important;
    }
  }
`

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getPreviousMonth(year: number, month: number) {
  if (month === 1) {
    return {
      year: year - 1,
      month: 12,
    }
  }

  return {
    year,
    month: month - 1,
  }
}

function getNextMonth(year: number, month: number) {
  if (month === 12) {
    return {
      year: year + 1,
      month: 1,
    }
  }

  return {
    year,
    month: month + 1,
  }
}

function createCalendarCells(year: number, month: number): CalendarCell[] {
  const firstDay = new Date(year, month - 1, 1).getDay()

  const daysInCurrentMonth = getDaysInMonth(year, month)

  const previous = getPreviousMonth(year, month)

  const daysInPreviousMonth = getDaysInMonth(previous.year, previous.month)

  const cells: CalendarCell[] = []

  /*
   * 이전 달 날짜
   */
  for (let index = firstDay - 1; index >= 0; index--) {
    cells.push({
      year: previous.year,
      month: previous.month,
      day: daysInPreviousMonth - index,
      isCurrentMonth: false,
    })
  }

  /*
   * 현재 달
   */
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    cells.push({
      year,
      month,
      day,
      isCurrentMonth: true,
    })
  }

  /*
   * 6주 달력으로 맞춘다.
   * 총 42칸.
   */
  const next = getNextMonth(year, month)

  let nextDay = 1

  while (cells.length < 42) {
    cells.push({
      year: next.year,
      month: next.month,
      day: nextDay,
      isCurrentMonth: false,
    })

    nextDay++
  }

  return cells
}

function getDateValue(date: ScheduleDate) {
  return date.year * 10_000 + date.month * 100 + date.day
}

function isEventOnDate(event: ScheduleEvent, date: ScheduleDate) {
  const dateValue = getDateValue(date)
  const startValue = getDateValue(event)
  const endValue = getDateValue(event.end ?? event)

  return dateValue >= startValue && dateValue <= endValue
}

function getEventSegment(
  event: ScheduleEvent,
  cell: CalendarCell,
  cellIndex: number,
): EventSegment {
  if (!event.end) {
    return {
      isRange: false,
      continuesBefore: false,
      continuesAfter: false,
      showLabel: true,
    }
  }

  const cellValue = getDateValue(cell)
  const startValue = getDateValue(event)
  const endValue = getDateValue(event.end)
  const isFirstColumn = cellIndex % 7 === 0
  const isLastColumn = cellIndex % 7 === 6
  const continuesBefore = !isFirstColumn && cellValue > startValue
  const continuesAfter = !isLastColumn && cellValue < endValue

  return {
    isRange: true,
    continuesBefore,
    continuesAfter,
    showLabel: !continuesBefore,
  }
}

function getEventClassName(segment: EventSegment) {
  return [
    'calendar-event',
    segment.isRange ? 'calendar-event--range' : '',
    segment.continuesBefore ? 'calendar-event--continues-before' : '',
    segment.continuesAfter ? 'calendar-event--continues-after' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function Schedule() {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(9)

  const calendarCells = useMemo(
    () => createCalendarCells(year, month),
    [year, month],
  )

  function moveToPreviousMonth() {
    const previous = getPreviousMonth(year, month)

    setYear(previous.year)
    setMonth(previous.month)
  }

  function moveToNextMonth() {
    const next = getNextMonth(year, month)

    setYear(next.year)
    setMonth(next.month)
  }

  function getEventsForDay(cell: CalendarCell) {
    return scheduleEvents.filter((event) => isEventOnDate(event, cell))
  }

  return (
    <section className="schedule" aria-labelledby="schedule-title">
      <style>{SCHEDULE_STYLES}</style>

      <div className="schedule__inner">
        <div className="schedule__layout">
          {/* -------------------------
              LEFT
          ------------------------- */}

          <aside className="schedule-sidebar">
            <div className="schedule-sidebar__main">
              <p className="schedule-sidebar__eyebrow">SCHEDULE</p>

              <h2 className="schedule-sidebar__month" id="schedule-title">
                {month}월
              </h2>

              <div className="schedule-sidebar__rule" aria-hidden="true" />

              <p className="schedule-sidebar__description">
                해달의 준회원 모집 일정은
                <br />
                여기에서 확인할 수 있습니다.
              </p>
            </div>

            <nav className="schedule-nav" aria-label="달력 월 이동">
              <button
                className="schedule-nav__button schedule-nav__button--primary"
                type="button"
                onClick={moveToPreviousMonth}
              >
                이전 달
              </button>

              <button
                className="schedule-nav__button"
                type="button"
                onClick={moveToNextMonth}
              >
                다음 달
              </button>
            </nav>

            {/*<a className="schedule-sidebar__all" href="#schedule">*/}
            {/*  전체 일정 보기*/}
            {/*  <span className="schedule-sidebar__all-arrow" aria-hidden="true">*/}
            {/*    →*/}
            {/*  </span>*/}
            {/*</a>*/}
          </aside>

          {/* -------------------------
              CALENDAR
          ------------------------- */}

          <div className="schedule-calendar">
            <div className="schedule-calendar__content">
              <header className="schedule-calendar__weekdays">
                {WEEKDAYS.map((weekday) => (
                  <div className="schedule-calendar__weekday" key={weekday}>
                    {weekday}
                  </div>
                ))}
              </header>

              <div
                className="schedule-calendar__grid"
                role="grid"
                aria-label={`${year}년 ${month}월 일정`}
              >
                {calendarCells.map((cell, index) => {
                  const events = getEventsForDay(cell)

                  return (
                    <div
                      className={[
                        'calendar-day',
                        !cell.isCurrentMonth ? 'calendar-day--outside' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      key={`${cell.year}-${cell.month}-${cell.day}-${index}`}
                      role="gridcell"
                    >
                      <time
                        className="calendar-day__number"
                        dateTime={`${cell.year}-${String(cell.month).padStart(
                          2,
                          '0',
                        )}-${String(cell.day).padStart(2, '0')}`}
                      >
                        {cell.day}
                      </time>

                      <div className="calendar-day__events">
                        {events.map((event) => {
                          const segment = getEventSegment(event, cell, index)

                          return (
                            <div
                              className={getEventClassName(segment)}
                              key={event.id}
                              aria-hidden={segment.showLabel ? undefined : true}
                            >
                              {segment.showLabel && (
                                <span className="calendar-event__title">
                                  {event.title}
                                </span>
                              )}

                              {segment.showLabel && event.time && (
                                <span className="calendar-event__time">
                                  {event.time}
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule
