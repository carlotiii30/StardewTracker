import { useGameStore } from '../../core/store/useGameStore';
import styles from './Agenda.module.css';
import { SEASON_TRANSLATIONS, SEASONS } from '../../core/constants';
import { DaySelector } from './components/DaySelector';
import { DailyAlerts } from './components/DailyAlerts';

export const Agenda = () => {
    const currentSeason = useGameStore((state) => state.currentSeason);
    const setSeason = useGameStore((state) => state.setSeason);
    const day = useGameStore((state) => state.day);
    const tasks = useGameStore((state) => state.tasks);
    const addTask = useGameStore((state) => state.addTask);
    const toggleTask = useGameStore((state) => state.toggleTask);
    const deleteTask = useGameStore((state) => state.deleteTask);
    const moveTaskToNextDay = useGameStore((state) => state.moveTaskToNextDay);

    const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const input = e.currentTarget;
            if (input.value.trim()) {
                addTask(input.value);
                input.value = '';
            }
        }
    };

    const dailyTasks = tasks.filter(t => t.season === currentSeason && t.day === day);

    return (
        <div className={styles.agendaContainer}>
            <section className={styles.seasonSelector}>
                {SEASONS.map(s => (
                    <button
                        key={s}
                        onClick={() => setSeason(s)}
                        className={`${styles.seasonBtn} ${currentSeason === s ? styles[s] : ''}`}
                        title={SEASON_TRANSLATIONS[s]}
                    >
                        <img
                            src={`/seasons/${s}.png`}
                            alt={SEASON_TRANSLATIONS[s]}
                            className={styles.seasonIcon}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML =
                                    s === 'spring' ? '🌸' : s === 'summer' ? '☀️' : s === 'fall' ? '🍁' : '❄️';
                            }}
                        />
                    </button>
                ))}
            </section>

            <DaySelector />

            <section className={styles.todaySection}>
                <h3 className={styles.sectionTitle}>
                    {day} de {SEASON_TRANSLATIONS[currentSeason]}
                </h3>
                <DailyAlerts />
            </section>

            <hr className={styles.divider} />

            <section className={styles.tasksSection}>
                <h3 className={styles.sectionTitle}>Notas del día</h3>
                <div className={styles.inputWrapper}>
                    <span className={styles.inputIcon}>✍️</span>
                    <input
                        type="text"
                        placeholder="Añadir recordatorio para hoy..."
                        onKeyDown={handleAddTask}
                        className={styles.taskInput}
                    />
                </div>

                <div className={styles.taskList}>
                    {dailyTasks.length === 0 ? (
                        <p className={styles.emptyState}>No hay notas para este día.</p>
                    ) : (
                        dailyTasks.map(task => (
                            <div key={task.id} className={styles.taskWrapper}>
                                <div
                                    onClick={() => toggleTask(task.id)}
                                    className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
                                >
                                    <span className={styles.checkIcon}>
                                        {task.completed ? '✅' : '⬜'}
                                    </span>
                                    <span className={styles.taskText}>{task.text}</span>
                                </div>
                                <button
                                    onClick={() => moveTaskToNextDay(task.id)}
                                    className={styles.moveBtn}
                                    title="Pasar a mañana"
                                >
                                    ➡️
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className={styles.deleteBtn}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};