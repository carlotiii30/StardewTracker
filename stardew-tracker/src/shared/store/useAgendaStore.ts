import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useProgressStore } from './useProgressStore';
import { readLegacyState } from './legacyState';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

type Task = {
    id: string;
    text: string;
    completed: boolean;
    season: Season;
    day: number;
};

type AgendaState = {
    tasks: Task[];
    addTask: (text: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    moveTaskToNextDay: (id: string) => void;
    clearCompletedTasks: () => void;
};

const legacyState = readLegacyState();

export const useAgendaStore = create<AgendaState>()(
    persist(
        (set) => ({
            tasks: legacyState.tasks ?? [],

            addTask: (text) => set((state) => {
                const { currentSeason, day } = useProgressStore.getState();

                return {
                    tasks: [
                        ...state.tasks,
                        {
                            id: crypto.randomUUID(),
                            text,
                            completed: false,
                            season: currentSeason,
                            day,
                        },
                    ],
                };
            }),

            toggleTask: (id) => set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === id ? { ...task, completed: !task.completed } : task
                ),
            })),

            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            })),

            clearCompletedTasks: () => set((state) => ({
                tasks: state.tasks.filter((task) => !task.completed),
            })),

            moveTaskToNextDay: (id) => set((state) => {
                const task = state.tasks.find((item) => item.id === id);
                if (!task) {
                    return state;
                }

                let nextDay = task.day + 1;
                let nextSeason = task.season;

                if (nextDay > 28) {
                    nextDay = 1;
                    const seasons: Season[] = ['spring', 'summer', 'fall', 'winter'];
                    const currentIndex = seasons.indexOf(task.season);
                    nextSeason = seasons[(currentIndex + 1) % 4];
                }

                return {
                    tasks: state.tasks.map((item) =>
                        item.id === id
                            ? { ...item, day: nextDay, season: nextSeason, completed: false }
                            : item
                    ),
                };
            }),
        }),
        {
            name: 'stardew-tracker-agenda',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
