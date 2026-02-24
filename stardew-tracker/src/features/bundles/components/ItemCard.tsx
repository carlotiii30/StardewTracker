import { useGameStore } from '../../../core/store/useGameStore';
import styles from './ItemCard.module.css';

interface ItemProps {
  id: string;
  name: string;
  imageSrc: string;
}

export const ItemCard = ({ id, name, imageSrc }: ItemProps) => {
  const donatedItems = useGameStore((state) => state.donatedItems);
  const toggleItem = useGameStore((state) => state.toggleItem);

  const isCompleted = donatedItems.includes(id);

  return (
    <div
      className={`${styles.card} ${isCompleted ? styles.completed : ''}`}
      onClick={() => toggleItem(id)}
    >
      <div className={styles.iconContainer}>
        <img src={imageSrc} alt={name} />
        {isCompleted && <span className={styles.check}>✅</span>}
      </div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};