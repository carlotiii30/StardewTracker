import { useMemo, useState } from 'react';
import { useTranslations } from '@shared/i18n';
import styles from './Settings.module.css';

export const Settings = () => {
    const [issueSummary, setIssueSummary] = useState('');
    const [reportStatus, setReportStatus] = useState('');
    const { language, setLanguage, t } = useTranslations();

    const diagnosticContext = useMemo(() => {
        const storageRaw = localStorage.getItem('stardew-tracker-storage');
        let storageSize = 0;

        if (storageRaw) {
            storageSize = new Blob([storageRaw]).size;
        }

        return {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            language: navigator.language,
            userAgent: navigator.userAgent,
            storageSize
        };
    }, []);

    const exportData = () => {
        const data = localStorage.getItem('stardew-tracker-storage');
        if (!data) return alert(t.settings.noDataToSave);

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `stardew-backup-${new Date().toISOString().slice(0, 10)}.json`;
        link.click();
    };

    const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                JSON.parse(content);
                localStorage.setItem('stardew-tracker-storage', content);
                window.location.reload();
            } catch {
                alert(t.settings.invalidFile);
            }
        };
        reader.readAsText(file);
    };

    const buildReportBody = () => {
        const title = issueSummary.trim() || t.settings.noDescription;

        return [
            t.settings.reportTitle,
            '',
            t.settings.reportBodyTitle,
            title,
            '',
            t.settings.technicalContextTitle,
            `- ${t.settings.reportDate}: ${diagnosticContext.timestamp}`,
            `- ${t.settings.reportUrl}: ${diagnosticContext.url}`,
            `- ${t.settings.reportBrowserLanguage}: ${diagnosticContext.language}`,
            `- ${t.settings.reportInterfaceLanguage}: ${language}`,
            `- ${t.settings.reportUserAgent}: ${diagnosticContext.userAgent}`,
            `- ${t.settings.reportStorageSize}: ${diagnosticContext.storageSize} bytes`
        ].join('\n');
    };

    const reportIssue = async () => {
        if (issueSummary.trim().length < 8) {
            setReportStatus(t.settings.reportTooShort);
            return;
        }

        const reportBody = buildReportBody();
        const shareUrl = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: t.settings.reportTitle,
                    text: reportBody,
                    url: shareUrl
                });
                setReportStatus(t.settings.reportSuccess);
                setIssueSummary('');
                return;
            }

            await navigator.clipboard.writeText(reportBody);
            setReportStatus(t.settings.reportClipboard);
        } catch {
            setReportStatus(t.settings.reportFailed);
        }
    };

    return (
        <div className={styles.container}>
            <h2>{t.settings.title}</h2>

            <section className={styles.section}>
                <h3>{t.settings.languageTitle}</h3>
                <p>{t.settings.languageDescription}</p>
                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={() => setLanguage('es')}
                        className={`${styles.saveBtn} ${language === 'es' ? styles.languageBtnActive : ''}`}
                    >
                        {t.settings.spanish}
                    </button>
                    <button
                        type="button"
                        onClick={() => setLanguage('en')}
                        className={`${styles.saveBtn} ${language === 'en' ? styles.languageBtnActive : ''}`}
                    >
                        {t.settings.english}
                    </button>
                </div>
            </section>

            <section className={styles.section}>
                <h3>{t.settings.backupTitle}</h3>
                <p>{t.settings.backupDescription}</p>
                <div className={styles.buttonGroup}>
                    <button onClick={exportData} className={styles.saveBtn}> {t.settings.saveFile} </button>

                    <label className={styles.uploadBtn}>
                        {t.settings.loadFile}
                        <input type="file" accept=".json" onChange={importData} hidden />
                    </label>
                </div>
            </section>

            <section className={styles.section}>
                <h3>{t.settings.errorTitle}</h3>
                <p>{t.settings.errorDescription}</p>

                <textarea
                    className={styles.issueInput}
                    placeholder={t.settings.issuePlaceholder}
                    value={issueSummary}
                    onChange={(e) => {
                        setIssueSummary(e.target.value);
                        if (reportStatus) setReportStatus('');
                    }}
                    rows={4}
                />

                <div className={styles.buttonGroup}>
                    <button onClick={reportIssue} className={styles.saveBtn}>{t.settings.sendReport}</button>
                </div>

                {reportStatus && <p className={styles.statusText}>{reportStatus}</p>}
            </section>

            <section className={styles.donationSection}>
                <h3>{t.settings.supportTitle}</h3>
                <p>{t.settings.supportDescription}</p>
                <a
                    href="https://ko-fi.com/carlotadelavega"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.kofiBtn}
                >
                    {t.settings.coffeeCta}
                </a>
            </section>
        </div>
    );
};