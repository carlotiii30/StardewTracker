import { describe, expect, it } from 'vitest';
import bundles from '../bundles.json';
import calendar from '../calendar.json';
import villagers from '../villagers.json';

describe('bundles.json', () => {
    it('tiene la propiedad "rooms" como array no vacío', () => {
        expect(Array.isArray(bundles.rooms)).toBe(true);
        expect(bundles.rooms.length).toBeGreaterThan(0);
    });

    it('cada room tiene id, name y bundles', () => {
        for (const room of bundles.rooms) {
            expect(room).toHaveProperty('id');
            expect(room).toHaveProperty('name');
            expect(Array.isArray(room.bundles)).toBe(true);
        }
    });

    it('cada bundle tiene id, name, reward e items', () => {
        for (const room of bundles.rooms) {
            for (const bundle of room.bundles) {
                expect(bundle).toHaveProperty('id');
                expect(bundle).toHaveProperty('name');
                expect(bundle).toHaveProperty('reward');
                expect(Array.isArray(bundle.items)).toBe(true);
            }
        }
    });

    it('los ids de bundle son únicos', () => {
        const ids = bundles.rooms.flatMap((r) => r.bundles.map((b) => b.id));
        const unique = new Set(ids);
        expect(unique.size).toBe(ids.length);
    });
});

describe('calendar.json', () => {
    const seasons = ['spring', 'summer', 'fall', 'winter'] as const;

    it('contiene las cuatro estaciones', () => {
        for (const season of seasons) {
            expect(calendar).toHaveProperty(season);
        }
    });

    it('cada entrada tiene day, name y type', () => {
        for (const season of seasons) {
            for (const entry of (calendar as Record<string, unknown[]>)[season]) {
                expect(entry).toHaveProperty('day');
                expect(entry).toHaveProperty('name');
                expect(entry).toHaveProperty('type');
            }
        }
    });

    it('los días están entre 1 y 28', () => {
        for (const season of seasons) {
            for (const entry of (calendar as Record<string, { day: number }[]>)[season]) {
                expect(entry.day).toBeGreaterThanOrEqual(1);
                expect(entry.day).toBeLessThanOrEqual(28);
            }
        }
    });
});

describe('villagers.json', () => {
    it('es un objeto con al menos un aldeano', () => {
        const names = Object.keys(villagers);
        expect(names.length).toBeGreaterThan(0);
    });

    it('cada aldeano tiene una lista de regalos no vacía', () => {
        for (const [name, gifts] of Object.entries(villagers)) {
            expect(Array.isArray(gifts), `${name} debería tener un array de regalos`).toBe(true);
            expect((gifts as unknown[]).length, `${name} no debería tener lista vacía`).toBeGreaterThan(0);
        }
    });
});
