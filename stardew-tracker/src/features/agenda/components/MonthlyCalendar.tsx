import { useState } from 'react';
import calendarData from '@shared/data/static/calendar.json';
import styles from './MonthlyCalendar.module.css';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

type TaskSummary = {
    day: number;
    season: Season;
    completed: boolean;
};

type CalendarEvent = {
    day: number;
    name: string;
    type: 'birthday' | 'festival';
};

interface MonthlyCalendarProps {
    currentSeason: Season;
    selectedDay: number;
    onSelectDay: (day: number) => void;
    tasks: TaskSummary[];
}

const WEEK_DAYS = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

export const MonthlyCalendar = ({
    currentSeason,
    selectedDay,
    onSelectDay,
    tasks,
}: MonthlyCalendarProps) => {
    const [showOnlyWithContent, setShowOnlyWithContent] = useState(false);
    const [activeTooltipDay, setActiveTooltipDay] = useState<number | null>(null);
    const days = Array.from({ length: 28 }, (_, index) => index + 1);

    const seasonEvents = (calendarData[currentSeason as keyof typeof calendarData] ?? []) as CalendarEvent[];

    const eventSummaryByDay = seasonEvents.reduce<Record<number, { birthday: boolean; festival: boolean }>>((acc, event) => {
        const current = acc[event.day] ?? { birthday: false, festival: false };
        acc[event.day] = {
            birthday: current.birthday || event.type === 'birthday',
            festival: current.festival || event.type === 'festival',
        };
        return acc;
    }, {});

    const taskSummaryByDay = tasks.reduce<Record<number, { total: number; pending: number }>>((acc, task) => {
        if (task.season !== currentSeason) {
            return acc;
        }

        const current = acc[task.day] ?? { total: 0, pending: 0 };
        acc[task.day] = {
            total: current.total + 1,
            pending: current.pending + (task.completed ? 0 : 1),
        };
        return acc;
    }, {});

    const eventsByDay = seasonEvents.reduce<Record<number, CalendarEvent[]>>((acc, event) => {
        const current = acc[event.day] ?? [];
        acc[event.day] = [...current, event];
        return acc;
    }, {});

    const visibleDays = days.filter((dayNumber) => {
        if (!showOnlyWithContent) {
            return true;
        }

        const hasEvents = Boolean(eventSummaryByDay[dayNumber]);
        const hasTasks = Boolean(taskSummaryByDay[dayNumber]?.total);
        return hasEvents || hasTasks || dayNumber === selectedDay;
    });

    const getDayDetails = (dayNumber: number) => {
        const events = eventsByDay[dayNumber] ?? [];
        const taskSummary = taskSummaryByDay[dayNumber];

        return {
            events,
            taskSummary,
            hasContent: events.length > 0 || Boolean(taskSummary?.total),
        };
    };

    return (
        <section className={styles.container}>
            <div className={styles.headerRow}>
                <h3 className={styles.title}>Calendario</h3>
                <div className={styles.controls}>
                    <button
                        type="button"
                        className={`${styles.filterBtn} ${showOnlyWithContent ? styles.filterBtnActive : ''}`}
                        onClick={() => setShowOnlyWithContent((prev) => !prev)}
                    >
                        {showOnlyWithContent ? 'Mostrar todos' : 'Solo con contenido'}
                    </button>
                    <p className={styles.caption}>Pulsa un dia para abrir su agenda</p>
                </div>
            </div>

            <div className={styles.weekHeader}>
                {WEEK_DAYS.map((dayName) => (
                    <span key={dayName} className={styles.weekDay}>{dayName}</span>
                ))}
            </div>

            <div className={styles.grid}>
                {visibleDays.map((dayNumber) => {
                    const eventSummary = eventSummaryByDay[dayNumber];
                    const taskSummary = taskSummaryByDay[dayNumber];
                    const dayDetails = getDayDetails(dayNumber);
                    const hasTasks = Boolean(taskSummary?.total);
                    const isTooltipOpen = activeTooltipDay === dayNumber;

                    return (
                        <div key={dayNumber} className={styles.dayCellWrap}>
                            <button
                                type="button"
                                className={`${styles.dayCell} ${selectedDay === dayNumber ? styles.selected : ''}`}
                                onClick={() => onSelectDay(dayNumber)}
                                onMouseEnter={() => setActiveTooltipDay(dayNumber)}
                                onMouseLeave={() => setActiveTooltipDay((current) => (current === dayNumber ? null : current))}
                                onFocus={() => setActiveTooltipDay(dayNumber)}
                                onBlur={() => setActiveTooltipDay((current) => (current === dayNumber ? null : current))}
                                aria-describedby={dayDetails.hasContent ? `calendar-tooltip-${dayNumber}` : undefined}
                            >
                                <span className={styles.dayNumber}>{dayNumber}</span>
                                <div className={styles.markers}>
                                    {eventSummary?.birthday && <span className={`${styles.marker} ${styles.birthday}`} />}
                                    {eventSummary?.festival && <span className={`${styles.marker} ${styles.festival}`} />}
                                    {hasTasks && <span className={`${styles.marker} ${styles.tasks}`} />}
                                </div>
                            </button>

                            {isTooltipOpen && dayDetails.hasContent && (
                                <div id={`calendar-tooltip-${dayNumber}`} role="tooltip" className={styles.tooltipCard}>
                                    <p className={styles.tooltipTitle}>Dia {dayNumber}</p>

                                    {dayDetails.events.map((event) => (
                                        <p key={`${dayNumber}-${event.type}-${event.name}`} className={styles.tooltipLine}>
                                            <span className={`${styles.tooltipTag} ${event.type === 'birthday' ? styles.birthdayTag : styles.festivalTag}`}>
                                                {event.type === 'birthday' ? 'Cumpleaños' : 'Festival'}
                                            </span>
                                            <span>{event.name}</span>
                                        </p>
                                    ))}

                                    <p className={styles.tooltipLine}>
                                        <span className={`${styles.tooltipTag} ${styles.tasksTag}`}>Notas</span>
                                        <span>
                                            {dayDetails.taskSummary
                                                ? 'Hay notas para este dia'
                                                : '0 notas'}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {showOnlyWithContent && visibleDays.length === 1 && visibleDays[0] === selectedDay && !eventSummaryByDay[selectedDay] && !taskSummaryByDay[selectedDay]?.total && (
                <p className={styles.emptyFilterState}>No hay dias con contenido en esta estacion todavia.</p>
            )}

            <div className={styles.legend}>
                <span className={styles.legendItem}><span className={`${styles.marker} ${styles.birthday}`} /> Cumpleaños</span>
                <span className={styles.legendItem}><span className={`${styles.marker} ${styles.festival}`} /> Festival</span>
                <span className={styles.legendItem}><span className={`${styles.marker} ${styles.tasks}`} /> Notas</span>
            </div>
        </section>
    );
};
