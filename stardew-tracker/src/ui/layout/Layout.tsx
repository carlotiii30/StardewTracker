import { Outlet, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslations } from '@shared/i18n';
import { useProgressStore } from '@shared/store/useProgressStore';
import styles from './Layout.module.css';

export const Layout = () => {
    const currentSeason = useProgressStore((state) => state.currentSeason);
    const location = useLocation();
    const { language, t, getSeasonLabel } = useTranslations();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [location.pathname]);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const navItems = [
        { path: '/', label: t.layout.agenda, iconName: 'agenda' },
        { path: '/bundles', label: t.layout.bundles, iconName: 'bundles' },
        { path: '/villagers', label: t.layout.villagers, iconName: 'villagers' },
        { path: '/settings', label: t.layout.settings, iconName: 'settings' },
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
                        <span className={styles.label}>{t.layout.donation}</span>
                    </a>
                )}
            </nav>

            <div className={styles.mainContent}>
                <div className={styles.contentWrapper}>
                    <header className={styles.header}>
                        <h1>{t.layout.title}</h1>
                        <div className={styles.seasonBadge}>
                            <strong>{getSeasonLabel(currentSeason)}</strong>
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