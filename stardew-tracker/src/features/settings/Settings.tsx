import styles from './Settings.module.css';

export const Settings = () => {
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
            } catch (err) {
                alert("Error: El archivo no es válido");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className={styles.container}>
            <h2>Configuración y Datos</h2>

            <section className={styles.section}>
                <h3>Copia de Seguridad</h3>
                <p>Guarda tu progreso en un archivo para no perderlo si limpias el navegador.</p>
                <div className={styles.buttonGroup}>
                    <button onClick={exportData} className={styles.saveBtn}>💾 Guardar archivo .json</button>

                    <label className={styles.uploadBtn}>
                        📂 Cargar archivo
                        <input type="file" accept=".json" onChange={importData} hidden />
                    </label>
                </div>
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
                    ☕ Invítanos a un café (Ko-fi)
                </a>
            </section>
        </div>
    );
};