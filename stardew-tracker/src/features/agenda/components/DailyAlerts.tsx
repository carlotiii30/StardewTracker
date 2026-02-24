import { useGameStore } from '../../../core/store/useGameStore';
import calendarData from '../../../core/data/static/calendar.json';
import villagersData from '../../../core/data/static/villagers.json';
import styles from './DailyAlerts.module.css';

export const DailyAlerts = () => {
    const currentSeason = useGameStore((state) => state.currentSeason);
    const day = useGameStore((state) => state.day);

    if (!calendarData || !currentSeason || !calendarData[currentSeason as keyof typeof calendarData]) {
        console.warn(`Temporada "${currentSeason}" no encontrada en calendar.json`);
        return null;
    }

    const seasonEvents = calendarData[currentSeason as keyof typeof calendarData];
    const todaysEvents = seasonEvents.filter(event => event.day === day);

    if (todaysEvents.length === 0) return null;

    return (
        <div className={styles.alertsWrapper}>
            {todaysEvents.map((event, index) => {
                const gifts = event.type === 'birthday'
                    ? (villagersData as any)[event.name]
                    : null;

                return (
                    <div key={index} className={`${styles.alertCard} ${styles[event.type]}`}>
                        <span className={styles.icon}>
                            {event.type === 'birthday' ? '🎂' : '🚩'}
                        </span>
                        <div className={styles.text}>
                            <p className={styles.title}>
                                {event.type === 'birthday' ? `Cumpleaños de ${event.name}` : `Hoy: ${event.name}`}
                            </p>
                            {gifts && (
                                <p className={styles.gifts}>
                                    🎁 <strong>Le encanta:</strong> {gifts.join(', ')}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};