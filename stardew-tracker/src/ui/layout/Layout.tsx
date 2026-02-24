import { Outlet, Link, useLocation } from 'react-router-dom';
import { useGameStore } from '../../core/store/useGameStore';
import { useEffect, useState } from 'react';
import styles from './Layout.module.css';

export const Layout = () => {
    const currentSeason = useGameStore((state) => state.currentSeason);
    const location = useLocation();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { path: '/', label: 'Agenda', icon: '📅' },
        { path: '/bundles', label: 'Lotes', icon: '📦' },
        { path: '/villagers', label: 'Aldeanos', icon: '💬' },
        { path: '/settings', label: 'Ajustes', icon: '⚙️' },
    ];

    return (
        <div className={styles.layoutContainer}>
            <nav className={styles.navbar}>
                {!isMobile && <h2 className={styles.navTitle}>🌾 SDV Helper</h2>}

                <div className={styles.navLinksWrapper}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span className={styles.label}>{item.label}</span>
                        </Link>
                    ))}
                </div>

                <a
                    href="https://ko-fi.com/carlotadelavega"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.donationLink}
                >
                    <span className={styles.icon}>☕</span>
                    {!isMobile && <span className={styles.label}>Invítanos un café</span>}
                </a>
            </nav>

            <div className={styles.mainContent}>
                <div className={styles.contentWrapper}>
                    <header className={styles.header}>
                        <h1>🌾 SDV</h1>
                        <div className={styles.seasonBadge}>
                            <strong>{currentSeason}</strong>
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