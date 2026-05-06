import { useMemo, useState } from 'react';
import bundlesData from '@shared/data/static/bundles.json';
import { useProgressStore } from '@shared/store/useProgressStore';
import { getItemImagePath } from '@shared/utils/itemImages';
import { ItemCard } from './components/ItemCard';
import styles from './Bundles.module.css';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

interface BundleItem {
  id: string;
  name: string;
  image?: string;
  season?: Season[];
  quality?: string;
  amount?: number;
}

interface Bundle {
  id: string;
  name: string;
  reward?: string;
  items: BundleItem[];
}

interface BundleRoom {
  id: string;
  name: string;
  bundles: Bundle[];
}

interface BundlesDataset {
  rooms: BundleRoom[];
}

type ItemFilter = 'all' | 'pending' | 'completed';
type SeasonFilter = 'all' | Season;

const data = bundlesData as BundlesDataset;

const SEASON_LABELS: Record<Season, string> = {
  spring: 'Primavera',
  summer: 'Verano',
  fall: 'Otoño',
  winter: 'Invierno',
};

const getProgressPercent = (completed: number, total: number) => {
  if (total === 0) {
    return 0;
  }
  return Math.round((completed / total) * 100);
};

const getItemImageSrc = (item: BundleItem) => {
  return getItemImagePath(item.name, item.image);
};

export const Bundles = () => {
  const donatedItems = useProgressStore((state) => state.donatedItems);
  const currentSeason = useProgressStore((state) => state.currentSeason);

  const [activeRoomId, setActiveRoomId] = useState(data.rooms[0]?.id ?? '');
  const [itemFilter, setItemFilter] = useState<ItemFilter>('all');
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all');

  const allItems = useMemo(
    () => data.rooms.flatMap((room) => room.bundles.flatMap((bundle) => bundle.items)),
    []
  );

  const globalCompleted = allItems.filter((item) => donatedItems.includes(item.id)).length;
  const globalTotal = allItems.length;

  const activeRoom = data.rooms.find((room) => room.id === activeRoomId) ?? data.rooms[0];

  const shouldShowItem = (itemId: string) => {
    const isCompleted = donatedItems.includes(itemId);
    if (itemFilter === 'pending') {
      return !isCompleted;
    }
    if (itemFilter === 'completed') {
      return isCompleted;
    }
    return true;
  };

  const shouldMatchSeason = (item: BundleItem) => {
    if (seasonFilter === 'all') {
      return true;
    }
    return item.season?.includes(seasonFilter) ?? false;
  };

  if (!activeRoom) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Lotes</h2>
        <section className={styles.panel}>
          <p className={styles.placeholder}>No hay datos de lotes disponibles.</p>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lotes</h2>

      <section className={styles.summaryPanel}>
        <div>
          <p className={styles.summaryLabel}>Progreso global</p>
          <p className={styles.summaryValue}>{globalCompleted} / {globalTotal} items</p>
        </div>
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBarFill}
            style={{ width: `${getProgressPercent(globalCompleted, globalTotal)}%` }}
          />
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.roomTabs}>
          {data.rooms.map((room) => {
            const roomItems = room.bundles.flatMap((bundle) => bundle.items);
            const roomCompleted = roomItems.filter((item) => donatedItems.includes(item.id)).length;
            const roomTotal = roomItems.length;

            return (
              <button
                key={room.id}
                type="button"
                className={`${styles.roomTab} ${room.id === activeRoom.id ? styles.roomTabActive : ''}`}
                onClick={() => setActiveRoomId(room.id)}
              >
                <span>{room.name}</span>
                <small>{roomCompleted}/{roomTotal}</small>
              </button>
            );
          })}
        </div>

        <div className={styles.filterStack}>
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Mostrar:</span>
            <button
              type="button"
              className={`${styles.filterBtn} ${itemFilter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setItemFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${itemFilter === 'pending' ? styles.filterBtnActive : ''}`}
              onClick={() => setItemFilter('pending')}
            >
              Pendientes
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${itemFilter === 'completed' ? styles.filterBtnActive : ''}`}
              onClick={() => setItemFilter('completed')}
            >
              Completados
            </button>
          </div>

          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Estacion:</span>
            <button
              type="button"
              className={`${styles.filterBtn} ${seasonFilter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setSeasonFilter('all')}
            >
              Todas
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${seasonFilter === 'spring' ? styles.filterBtnActive : ''}`}
              onClick={() => setSeasonFilter('spring')}
            >
              Primavera
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${seasonFilter === 'summer' ? styles.filterBtnActive : ''}`}
              onClick={() => setSeasonFilter('summer')}
            >
              Verano
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${seasonFilter === 'fall' ? styles.filterBtnActive : ''}`}
              onClick={() => setSeasonFilter('fall')}
            >
              Otoño
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${seasonFilter === 'winter' ? styles.filterBtnActive : ''}`}
              onClick={() => setSeasonFilter('winter')}
            >
              Invierno
            </button>
          </div>
        </div>

        <div className={styles.bundleList}>
          {activeRoom.bundles.map((bundle) => {
            const completed = bundle.items.filter((item) => donatedItems.includes(item.id)).length;
            const total = bundle.items.length;
            const visibleItems = bundle.items.filter((item) => shouldShowItem(item.id) && shouldMatchSeason(item));

            return (
              <article key={bundle.id} className={styles.bundleCard}>
                <header className={styles.bundleHeader}>
                  <div>
                    <h3 className={styles.bundleTitle}>{bundle.name}</h3>
                    {bundle.reward && <p className={styles.bundleReward}>Recompensa: {bundle.reward}</p>}
                  </div>
                  <p className={styles.bundleProgressLabel}>{completed}/{total}</p>
                </header>

                <div className={styles.progressBarTrack}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${getProgressPercent(completed, total)}%` }}
                  />
                </div>

                <div className={styles.itemsGrid}>
                  {visibleItems.length === 0 ? (
                    <p className={styles.emptyItems}>No hay items para este filtro.</p>
                  ) : (
                    visibleItems.map((item) => {
                      const isCurrentSeasonItem = item.season?.includes(currentSeason);
                      const isOutOfSeason = item.season && !isCurrentSeasonItem;
                      const seasonText = item.season?.map((season) => SEASON_LABELS[season]).join(', ');

                      return (
                        <div
                          key={item.id}
                          className={`${styles.itemWrap} ${isCurrentSeasonItem ? styles.currentSeasonItem : ''} ${isOutOfSeason ? styles.outOfSeasonItem : ''}`}
                        >
                          <ItemCard id={item.id} name={item.name} imageSrc={getItemImageSrc(item)} />
                          {(item.season || item.amount || item.quality) && (
                            <p className={styles.itemMeta}>
                              {item.amount ? `${item.amount}x` : null}
                              {item.quality ? ` ${item.quality}` : null}
                              {seasonText ? ` | ${seasonText}` : null}
                            </p>
                          )}
                          {isCurrentSeasonItem && <span className={styles.seasonHint}>Temporada actual</span>}
                        </div>
                      );
                    })
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};