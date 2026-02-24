import { useState } from 'react';
import villagersData from '../../core/data/static/villagers.json';
import styles from './Villagers.module.css';

export const Villagers = () => {
  const [search, setSearch] = useState('');
  const villagersEntries = Object.entries(villagersData);

  const filteredVillagers = villagersEntries.filter(([name, gifts]) => {
    const searchTerm = search.toLowerCase();
    return (
      name.toLowerCase().includes(searchTerm) ||
      gifts.some(gift => gift.toLowerCase().includes(searchTerm))
    );
  });

  const getSafeFileName = (text: string) => {
    return text
      .toLowerCase()
      .replaceAll('á', 'a')
      .replaceAll('é', 'e')
      .replaceAll('í', 'i')
      .replaceAll('ó', 'o')
      .replaceAll('ú', 'u')
      .replaceAll('ñ', 'n')
      .replaceAll(' ', '_');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Aldeanos y Regalos 🎁</h2>
        <input
          type="text"
          placeholder="Busca por nombre o por regalo (ej: Diamante)..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div className={styles.grid}>
        {filteredVillagers.length > 0 ? (
          filteredVillagers.map(([name, gifts]) => (
            <div key={name} className={styles.card}>
              <div className={styles.portraitContainer}>
                <img
                  src={`/villagers/${name.toLowerCase()}.png`}
                  alt={name}
                  className={styles.portrait}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerText = name[0];
                  }}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.label}>Le encanta:</p>
                <ul className={styles.giftList}>
                  {gifts.map((gift) => {
                    const isHighlight = search !== '' && gift.toLowerCase().includes(search.toLowerCase());

                    return (
                      <li
                        key={gift}
                        className={`${styles.giftItem} ${isHighlight ? styles.highlight : ''}`}
                      >
                        <img
                          src={`/items/${getSafeFileName(gift)}.png`}
                          alt={gift}
                          className={styles.giftIcon}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <span>{gift}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No se encontró nada para "{search}"</p>
        )}
      </div>
    </div>
  );
};