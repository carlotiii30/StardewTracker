import { useGameStore } from '../../../core/store/useGameStore';
import calendarData from '../../../core/data/static/calendar.json';
import villagersData from '../../../core/data/static/villagers.json';
import styles from './DailyAlerts.module.css';

export const DailyAlerts = () => {
    const { currentSeason, day } = useGameStore();

    const todaysEvents = calendarData[currentSeason].filter(event => event.day === day);

    if (todaysEvents.length === 0) return null;

    return (
        <div className={styles.alertsWrapper}>
            {todaysEvents.map((event, index) => {
                const gifts = event.type === 'birthday'
                    ? villagersData[event.name as keyof typeof villagersData]
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
                                    🎁 <strong>Regalos favoritos:</strong> {gifts.join(', ')}.
                                </p>
                            )}

                            {!gifts && event.type === 'festival' && (
                                <p className={styles.subtitle}>¡Revisa el horario del festival!</p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};