import { useState } from 'react';
import villagersData from '@shared/data/static/villagers.json';
import { useTranslations } from '@shared/i18n';
import { getItemImagePath } from '@shared/utils/itemImages';
import { getItemLabel } from '@shared/translations/items';
import styles from './Villagers.module.css';

export const Villagers = () => {
  const [search, setSearch] = useState('');
  const { t, language } = useTranslations();
  const villagersEntries = Object.entries(villagersData);

  const filteredVillagers = villagersEntries.filter(([name, gifts]) => {
    const searchTerm = search.toLowerCase();
    return (
      name.toLowerCase().includes(searchTerm) ||
      gifts.some((gift) => {
        const giftLabel = getItemLabel(gift, language);
        return gift.toLowerCase().includes(searchTerm) || giftLabel.toLowerCase().includes(searchTerm);
      })
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{t.villagers.title}</h2>
        <input
          type="text"
          placeholder={t.villagers.placeholder}
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
                <p className={styles.label}>{t.villagers.loves}</p>
                <ul className={styles.giftList}>
                  {gifts.map((gift) => {
                    const isHighlight = search !== '' && gift.toLowerCase().includes(search.toLowerCase());
                    const giftLabel = getItemLabel(gift, language);

                    return (
                      <li
                        key={gift}
                        className={`${styles.giftItem} ${isHighlight ? styles.highlight : ''}`}
                      >
                        <img
                          src={getItemImagePath(gift)}
                          alt={gift}
                          className={styles.giftIcon}
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <span>{giftLabel}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>{t.villagers.noResults(search)}</p>
        )}
      </div>
    </div>
  );
};