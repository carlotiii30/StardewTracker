import { Outlet, Link, useLocation } from 'react-router-dom';
import { SEASON_TRANSLATIONS } from '@shared/constants';
import { useProgressStore } from '@shared/store/useProgressStore';
import { useEffect, useState } from 'react';
import styles from './Layout.module.css';

export const Layout = () => {
    const currentSeason = useProgressStore((state) => state.currentSeason);
    const location = useLocation();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { path: '/', label: 'Agenda', iconName: 'agenda' },
        { path: '/bundles', label: 'Lotes', iconName: 'bundles' },
        { path: '/villagers', label: 'Aldeanos', iconName: 'villagers' },
        { path: '/settings', label: 'Ajustes', iconName: 'settings' },
    ];

    return (
        <div className={`${styles.layoutContainer} ${styles[currentSeason]}`}>
            <nav className={styles.navbar}>
                {!isMobile && <h2 className={styles.navTitle}>SDV Helper</h2>}

                <div className={styles.navLinksWrapper}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                        >
                            <img
                                src={`/menus/${item.iconName}.png`}
                                alt={item.label}
                                className={styles.navIcon}
                            />
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    ))}
                </div>

                {!isMobile && (
                    <a
                        href="https://ko-fi.com/carlotadelavega"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.donationLink}
                    >
                        <span className={styles.icon}>Ko-fi</span>
                        <span className={styles.label}>Invítanos un café</span>
                    </a>
                )}
            </nav>

            <div className={styles.mainContent}>
                <div className={styles.contentWrapper}>
                    <header className={styles.header}>
                        <h1>Stardew Valley Tracker</h1>
                        <div className={styles.seasonBadge}>
                            <strong>{SEASON_TRANSLATIONS[currentSeason]}</strong>
                        </div>
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};