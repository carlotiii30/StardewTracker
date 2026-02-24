import { useGameStore } from '../../../core/store/useGameStore';
import styles from './DaySelector.module.css';

export const DaySelector = () => {
    const { day, setDay } = useGameStore();

    const days = Array.from({ length: 28 }, (_, i) => i + 1);

    return (
        <div className={styles.container}>
            <p className={styles.label}>Día del mes:</p>
            <div className={styles.grid}>
                {days.map((d) => (
                    <button
                        key={d}
                        onClick={() => setDay(d)}
                        className={`${styles.dayButton} ${day === d ? styles.active : ''}`}
                    >
                        {d}
                    </button>
                ))}
            </div>
            <div className={styles.controls}>
                <button onClick={() => setDay(day - 1)} disabled={day === 1}>◀</button>
                <span className={styles.currentDay}>Día {day}</span>
                <button onClick={() => setDay(day + 1)} disabled={day === 28}>▶</button>
            </div>
        </div>
    );
};