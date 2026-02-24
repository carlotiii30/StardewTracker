import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Definimos qué es una Tarea para TypeScript
interface Task {
  id: string;
  text: string;
  completed: boolean;
  season: 'primavera' | 'verano' | 'otoño' | 'invierno';
  day: number;
}

interface GameState {
  // --- Estado del Juego ---
  completedBundles: string[];
  donatedItems: string[];
  currentSeason: 'primavera' | 'verano' | 'otoño' | 'invierno';
  day: number; // Del 1 al 28
  
  // --- Estado de la Agenda ---
  tasks: Task[];

  // --- Acciones del Juego ---
  toggleItem: (itemId: string) => void;
  setSeason: (season: 'primavera' | 'verano' | 'otoño' | 'invierno') => void;
  setDay: (day: number) => void;
  
  // --- Acciones de la Agenda ---
  addTask: (text: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearCompletedTasks: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // --- Valores iniciales ---
      completedBundles: [],
      donatedItems: [],
      currentSeason: 'primavera',
      day: 1,
      tasks: [],

      // --- Implementación de Acciones ---
      toggleItem: (itemId) => set((state) => {
        const exists = state.donatedItems.includes(itemId);
        return {
          donatedItems: exists 
            ? state.donatedItems.filter(id => id !== itemId)
            : [...state.donatedItems, itemId]
        };
      }),

      setSeason: (season) => set({ currentSeason: season }),
      
      setDay: (day) => set({ day: Math.min(Math.max(day, 1), 28) }), // Validamos rango 1-28

      addTask: (text) => set((state) => ({
        tasks: [
          ...state.tasks, 
          { 
            id: crypto.randomUUID(), 
            text, 
            completed: false, 
            season: state.currentSeason,
            day: state.day
          }
        ]
      })),

      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id)
      })),

      clearCompletedTasks: () => set((state) => ({
        tasks: state.tasks.filter(t => !t.completed)
      })),
    }),
    {
      name: 'stardew-tracker-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
)