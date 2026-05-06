import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { readLegacyState } from './legacyState';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

type ProgressState = {
    completedBundles: string[];
    donatedItems: string[];
    currentSeason: Season;
    day: number;
    toggleItem: (itemId: string) => void;
    setSeason: (season: Season) => void;
    setDay: (day: number) => void;
};

const legacyState = readLegacyState();

export const useProgressStore = create<ProgressState>()(
    persist(
        (set) => ({
            completedBundles: legacyState.completedBundles ?? [],
            donatedItems: legacyState.donatedItems ?? [],
            currentSeason: legacyState.currentSeason ?? 'spring',
            day: legacyState.day ?? 1,

            toggleItem: (itemId) => set((state) => {
                const exists = state.donatedItems.includes(itemId);
                return {
                    donatedItems: exists
                        ? state.donatedItems.filter((id) => id !== itemId)
                        : [...state.donatedItems, itemId],
                };
            }),

            setSeason: (season) => set({ currentSeason: season }),

            setDay: (day) => set({ day: Math.min(Math.max(day, 1), 28) }),
        }),
        {
            name: 'stardew-tracker-progress',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
