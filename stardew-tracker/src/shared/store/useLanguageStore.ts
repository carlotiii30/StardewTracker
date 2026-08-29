import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Language = 'es' | 'en';

type LanguageState = {
    language: Language;
    setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            language: 'es',
            setLanguage: (language) => set({ language }),
        }),
        {
            name: 'stardew-tracker-language',
            storage: createJSONStorage(() => localStorage),
        }
    )
);