import { useState } from 'react';
import { useProgressStore } from '@shared/store/useProgressStore';
import calendarData from '@shared/data/static/calendar.json';
import villagersData from '@shared/data/static/villagers.json';
import styles from './DailyAlerts.module.css';

type VillagerGiftsMap = Record<string, string[]>;

export const DailyAlerts = () => {
    const currentSeason = useProgressStore((state) => state.currentSeason);
    const day = useProgressStore((state) => state.day);

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
                const isBirthday = event.type === 'birthday';
                const gifts = isBirthday ? (villagersData as VillagerGiftsMap)[event.name] : null;
                const isExpanded = expandedIndex === index;

                return (
                    <div
                        key={index}
                        className={`${styles.alertCard} ${styles[event.type]} ${isExpanded ? styles.expanded : ''}`}
                        onClick={() => isBirthday && setExpandedIndex(isExpanded ? null : index)}
                        style={{ cursor: isBirthday ? 'pointer' : 'default' }}
                    >
                        <div className={styles.mainInfo}>
                            <span className={`${styles.eventTypeTag} ${isBirthday ? styles.birthdayTag : styles.festivalTag}`}>
                                {isBirthday ? 'Cumpleaños' : 'Evento'}
                            </span>
                            <div className={styles.text}>
                                <p className={styles.title}>
                                    {isBirthday ? `Cumpleaños de ${event.name}` : `Hoy: ${event.name}`}
                                </p>
                                {isBirthday && (
                                    <span className={styles.hint}>
                                        {isExpanded ? 'Ocultar regalos' : 'Ver regalos favoritos'}
                                    </span>
                                )}
                            </div>
                        </div>
                        {isExpanded && isBirthday && gifts && (
                            <div className={styles.giftsContainer}>
                                <p className={styles.giftsTitle}>Regalos favoritos:</p>
                                <div className={styles.giftList}>
                                    {gifts.map((gift: string) => (
                                        <span key={gift} className={styles.giftTag}>
                                            {gift}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};