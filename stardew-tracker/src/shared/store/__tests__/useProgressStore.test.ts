import { beforeEach, describe, expect, it } from 'vitest';
import { useProgressStore } from '../useProgressStore';

beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState({
        completedBundles: [],
        donatedItems: [],
        currentSeason: 'spring',
        day: 1,
    });
});

describe('toggleItem', () => {
    it('añade un item si no estaba donado', () => {
        useProgressStore.getState().toggleItem('item-1');
        expect(useProgressStore.getState().donatedItems).toContain('item-1');
    });

    it('elimina un item si ya estaba donado', () => {
        useProgressStore.setState({ donatedItems: ['item-1'] });
        useProgressStore.getState().toggleItem('item-1');
        expect(useProgressStore.getState().donatedItems).not.toContain('item-1');
    });

    it('no afecta al resto de items al alternar uno', () => {
        useProgressStore.setState({ donatedItems: ['item-1', 'item-2'] });
        useProgressStore.getState().toggleItem('item-1');
        expect(useProgressStore.getState().donatedItems).toContain('item-2');
    });
});

describe('setSeason', () => {
    it('cambia la estación correctamente', () => {
        useProgressStore.getState().setSeason('winter');
        expect(useProgressStore.getState().currentSeason).toBe('winter');
    });
});

describe('setDay', () => {
    it('establece el día dentro del rango', () => {
        useProgressStore.getState().setDay(15);
        expect(useProgressStore.getState().day).toBe(15);
    });

    it('limita el día al mínimo (1)', () => {
        useProgressStore.getState().setDay(0);
        expect(useProgressStore.getState().day).toBe(1);
    });

    it('limita el día al máximo (28)', () => {
        useProgressStore.getState().setDay(99);
        expect(useProgressStore.getState().day).toBe(28);
    });

    it('acepta exactamente el día 1', () => {
        useProgressStore.getState().setDay(1);
        expect(useProgressStore.getState().day).toBe(1);
    });

    it('acepta exactamente el día 28', () => {
        useProgressStore.getState().setDay(28);
        expect(useProgressStore.getState().day).toBe(28);
    });
});
