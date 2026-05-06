type Season = 'spring' | 'summer' | 'fall' | 'winter';

type LegacyTask = {
    id: string;
    text: string;
    completed: boolean;
    season: Season;
    day: number;
};

type LegacyState = {
    completedBundles?: string[];
    donatedItems?: string[];
    currentSeason?: Season;
    day?: number;
    tasks?: LegacyTask[];
};

type LegacyPersistShape = {
    state?: LegacyState;
};

const LEGACY_KEY = 'stardew-tracker-storage';

export const readLegacyState = (): LegacyState => {
    if (typeof window === 'undefined') {
        return {};
    }

    try {
        const raw = window.localStorage.getItem(LEGACY_KEY);
        if (!raw) {
            return {};
        }

        const parsed = JSON.parse(raw) as LegacyPersistShape | null;
        return parsed?.state ?? {};
    } catch {
        return {};
    }
};
