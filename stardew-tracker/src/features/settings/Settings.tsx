import { useMemo, useState } from 'react';
import styles from './Settings.module.css';

export const Settings = () => {
    const [issueSummary, setIssueSummary] = useState('');
    const [reportStatus, setReportStatus] = useState('');

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
        if (!data) return alert("No hay datos para guardar");

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
                alert("Error: El archivo no es válido");
            }
        };
        reader.readAsText(file);
    };

    const buildReportBody = () => {
        const title = issueSummary.trim() || 'Sin descripción del error';

        return [
            'Reporte de error - Stardew Tracker',
            '',
            'Descripción del problema:',
            title,
            '',
            'Contexto técnico:',
            `- Fecha: ${diagnosticContext.timestamp}`,
            `- URL: ${diagnosticContext.url}`,
            `- Idioma del navegador: ${diagnosticContext.language}`,
            `- User Agent: ${diagnosticContext.userAgent}`,
            `- Tamaño del backup local: ${diagnosticContext.storageSize} bytes`
        ].join('\n');
    };

    const reportIssue = async () => {
        if (issueSummary.trim().length < 8) {
            setReportStatus('Describe el error con al menos 8 caracteres.');
            return;
        }

        const reportBody = buildReportBody();
        const shareUrl = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Reporte de error - Stardew Tracker',
                    text: reportBody,
                    url: shareUrl
                });
                setReportStatus('Gracias. El reporte se compartió correctamente.');
                setIssueSummary('');
                return;
            }

            await navigator.clipboard.writeText(reportBody);
            setReportStatus('No hay menu de compartir en este navegador. Copiamos el reporte al portapapeles para que puedas enviarlo.');
        } catch {
            setReportStatus('No se pudo enviar el reporte. Intenta de nuevo.');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Configuración y Datos</h2>

            <section className={styles.section}>
                <h3>Copia de Seguridad</h3>
                <p>Guarda tu progreso en un archivo para no perderlo si limpias el navegador.</p>
                <div className={styles.buttonGroup}>
                    <button onClick={exportData} className={styles.saveBtn}> Guardar archivo </button>

                    <label className={styles.uploadBtn}>
                        Cargar archivo
                        <input type="file" accept=".json" onChange={importData} hidden />
                    </label>
                </div>
            </section>

            <section className={styles.section}>
                <h3>Reportar un error</h3>
                <p>Si algo falla o está mal, cuéntanos qué, intentaremos solucionarlo lo antes posible.</p>

                <textarea
                    className={styles.issueInput}
                    placeholder="Ejemplo: Al marcar un cultivo para Verano, no se guarda al recargar la página"
                    value={issueSummary}
                    onChange={(e) => {
                        setIssueSummary(e.target.value);
                        if (reportStatus) setReportStatus('');
                    }}
                    rows={4}
                />

                <div className={styles.buttonGroup}>
                    <button onClick={reportIssue} className={styles.saveBtn}>Enviar reporte</button>
                </div>

                {reportStatus && <p className={styles.statusText}>{reportStatus}</p>}
            </section>

            <section className={styles.donationSection}>
                <h3>Apoya el proyecto</h3>
                <p>Somos dos amigas (una informática y una diseñadora) creando esto con mucho amor y café.</p>
                <a
                    href="https://ko-fi.com/carlotadelavega"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.kofiBtn}
                >
                    Invítanos a un café (Ko-fi)
                </a>
            </section>
        </div>
    );
};