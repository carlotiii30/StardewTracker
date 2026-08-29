import { useRef } from 'react';
import { SEASONS } from '@shared/constants';
import { useTranslations } from '@shared/i18n';
import schedules from '@shared/data/static/schedules.json';
import { useProgressStore } from '@shared/store/useProgressStore';
import { useAgendaStore } from '@shared/store/useAgendaStore';
import styles from './Agenda.module.css';
import { DailyAlerts } from './components/DailyAlerts';
import { MonthlyCalendar } from './components/MonthlyCalendar';

type BusinessSchedule = {
    closed: string[];
    note: string;
};

type SchedulesMap = Record<string, BusinessSchedule>;

export const Agenda = () => {
    const taskInputRef = useRef<HTMLInputElement>(null);
    const { t, getSeasonLabel } = useTranslations();
    const currentSeason = useProgressStore((state) => state.currentSeason);
    const setSeason = useProgressStore((state) => state.setSeason);
    const day = useProgressStore((state) => state.day);
    const setDay = useProgressStore((state) => state.setDay);
    const tasks = useAgendaStore((state) => state.tasks);
    const addTask = useAgendaStore((state) => state.addTask);
    const toggleTask = useAgendaStore((state) => state.toggleTask);
    const deleteTask = useAgendaStore((state) => state.deleteTask);
    const moveTaskToNextDay = useAgendaStore((state) => state.moveTaskToNextDay);

    const submitTask = (input: HTMLInputElement) => {
        if (input.value.trim()) {
            addTask(input.value);
            input.value = '';
        }
    };

    const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitTask(e.currentTarget);
        }
    };

    const handleAddTaskFromButton = () => {
        if (taskInputRef.current) {
            submitTask(taskInputRef.current);
            taskInputRef.current.focus();
        }
    };

    const checkTaskWarning = (text: string, day: number) => {
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const dayName = daysOfWeek[(day - 1) % 7];

        const businessNames = Object.keys(schedules);
        const foundBusiness = businessNames.find(name =>
            text.toLowerCase().includes(name.toLowerCase())
        );

        if (foundBusiness) {
            const info = (schedules as SchedulesMap)[foundBusiness];
            if (info.closed.includes(dayName)) {
                return info.note;
            }
        }
        return null;
    };

    const seasonTasks = tasks.filter(t => t.season === currentSeason);
    const dailyTasks = seasonTasks.filter(t => t.day === day);

    return (
        <div className={styles.agendaContainer}>
            <section className={styles.seasonSelector}>
                {SEASONS.map(s => (
                    <button
                        key={s}
                        onClick={() => setSeason(s)}
                        className={`${styles.seasonBtn} ${currentSeason === s ? styles[s] : ''}`}
                        title={getSeasonLabel(s)}
                    >
                        <img
                            src={`/seasons/${s}.png`}
                            alt={getSeasonLabel(s)}
                            className={styles.seasonIcon}
                        />
                    </button>
                ))}
            </section>

            <MonthlyCalendar
                currentSeason={currentSeason}
                selectedDay={day}
                onSelectDay={setDay}
                tasks={seasonTasks}
            />

            <section className={styles.todaySection}>
                <h3 className={styles.sectionTitle}>
                    {t.agenda.todayLabel(day, getSeasonLabel(currentSeason))}
                </h3>
                <DailyAlerts />
            </section>

            <hr className={styles.divider} />

            <section className={styles.tasksSection}>
                <h3 className={styles.sectionTitle}>{t.agenda.notesTitle}</h3>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>{t.agenda.inputBadge}</span>
                    <input
                        ref={taskInputRef}
                        type="text"
                        placeholder={t.agenda.placeholder}
                        onKeyDown={handleAddTask}
                        className={styles.taskInput}
                    />
                    <button
                        type="button"
                        onClick={handleAddTaskFromButton}
                        className={styles.addBtn}
                        aria-label={t.agenda.noteAriaLabel}
                    >
                        {t.agenda.register}
                    </button>
                </div>

                <div className={styles.taskList}>
                    {dailyTasks.length === 0 ? (
                        <p className={styles.emptyState}>{t.agenda.emptyState}</p>
                    ) : (
                        dailyTasks.map(task => {
                            const warning = checkTaskWarning(task.text, day);

                            return (
                                <div key={task.id} className={styles.taskContainer}>
                                    <div className={styles.taskWrapper}>
                                        <div
                                            onClick={() => toggleTask(task.id)}
                                            className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                                        >
                                            <span
                                                className={`${styles.checkIcon} ${task.completed ? styles.checkDone : ''}`}
                                                aria-hidden="true"
                                            />
                                            <span className={styles.taskText}>{task.text}</span>
                                        </div>
                                        <div className={styles.actions}>
                                            <button
                                                onClick={() => moveTaskToNextDay(task.id)}
                                                className={styles.moveBtn}
                                                title={t.agenda.moveToTomorrow}
                                            >
                                                {t.agenda.moveToTomorrow}
                                            </button>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className={styles.deleteBtn}
                                                title={t.agenda.deleteTask}
                                            >
                                                {t.agenda.deleteTask}
                                            </button>
                                        </div>
                                    </div>

                                    {warning && !task.completed && (
                                        <div className={styles.smartWarning}>
                                            <span className={styles.warningIcon}>{t.agenda.warning}</span>
                                            <p className={styles.warningText}>{warning}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
};