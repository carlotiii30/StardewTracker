import { useGameStore } from '../../core/store/useGameStore';
import styles from './Agenda.module.css';
import { DaySelector } from './components/DaySelector';
import { DailyAlerts } from './components/DailyAlerts';

export const Agenda = () => {
    // 1. Añadimos setSeason a la extracción
    const { currentSeason, setSeason, day, tasks, addTask, toggleTask, deleteTask } = useGameStore();

    const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const input = e.currentTarget;
            if (input.value.trim()) {
                addTask(input.value);
                input.value = '';
            }
        }
    };

    const seasons = ['primavera', 'verano', 'otoño', 'invierno'] as const;

    // 2. Creamos una variable para las tareas filtradas por día Y estación
    const dailyTasks = tasks.filter(t => t.season === currentSeason && t.day === day);

    return (
        <div className={styles.agendaContainer}>
            <section className={styles.seasonSelector}>
                {seasons.map(s => (
                    <button
                        key={s}
                        onClick={() => setSeason(s)}
                        className={`${styles.seasonBtn} ${currentSeason === s ? styles[s] : ''}`}
                        title={s}
                    >
                        {s === 'primavera' ? '🌸' : s === 'verano' ? '☀️' : s === 'otoño' ? '🍁' : '❄️'}
                    </button>
                ))}
            </section>

            <DaySelector />

            <section className={styles.todaySection}>
                <h3 className={styles.sectionTitle}>
                    {day} de {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}
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