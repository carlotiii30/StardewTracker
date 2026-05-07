import { beforeEach, describe, expect, it } from 'vitest';
import { useAgendaStore } from '../useAgendaStore';
import { useProgressStore } from '../useProgressStore';

beforeEach(() => {
    localStorage.clear();
    useProgressStore.setState({
        completedBundles: [],
        donatedItems: [],
        currentSeason: 'spring',
        day: 1,
    });
    useAgendaStore.setState({ tasks: [] });
});

describe('addTask', () => {
    it('añade una tarea con el día y estación actuales', () => {
        useProgressStore.setState({ currentSeason: 'summer', day: 10 });
        useAgendaStore.getState().addTask('Regar cultivos');

        const tasks = useAgendaStore.getState().tasks;
        expect(tasks).toHaveLength(1);
        expect(tasks[0].text).toBe('Regar cultivos');
        expect(tasks[0].season).toBe('summer');
        expect(tasks[0].day).toBe(10);
        expect(tasks[0].completed).toBe(false);
    });

    it('genera un id único por tarea', () => {
        useAgendaStore.getState().addTask('Tarea A');
        useAgendaStore.getState().addTask('Tarea B');

        const [a, b] = useAgendaStore.getState().tasks;
        expect(a.id).not.toBe(b.id);
    });
});

describe('toggleTask', () => {
    it('marca una tarea como completada', () => {
        useAgendaStore.getState().addTask('Test');
        const id = useAgendaStore.getState().tasks[0].id;

        useAgendaStore.getState().toggleTask(id);
        expect(useAgendaStore.getState().tasks[0].completed).toBe(true);
    });

    it('desmarca una tarea ya completada', () => {
        useAgendaStore.getState().addTask('Test');
        const id = useAgendaStore.getState().tasks[0].id;

        useAgendaStore.getState().toggleTask(id);
        useAgendaStore.getState().toggleTask(id);
        expect(useAgendaStore.getState().tasks[0].completed).toBe(false);
    });
});

describe('deleteTask', () => {
    it('elimina la tarea por id', () => {
        useAgendaStore.getState().addTask('A borrar');
        const id = useAgendaStore.getState().tasks[0].id;

        useAgendaStore.getState().deleteTask(id);
        expect(useAgendaStore.getState().tasks).toHaveLength(0);
    });

    it('no afecta a otras tareas', () => {
        useAgendaStore.getState().addTask('Quedar');
        useAgendaStore.getState().addTask('Borrar');
        const idBorrar = useAgendaStore.getState().tasks[1].id;

        useAgendaStore.getState().deleteTask(idBorrar);
        expect(useAgendaStore.getState().tasks).toHaveLength(1);
        expect(useAgendaStore.getState().tasks[0].text).toBe('Quedar');
    });
});

describe('clearCompletedTasks', () => {
    it('elimina solo las tareas completadas', () => {
        useAgendaStore.getState().addTask('Completada');
        useAgendaStore.getState().addTask('Pendiente');
        const idCompletada = useAgendaStore.getState().tasks[0].id;
        useAgendaStore.getState().toggleTask(idCompletada);

        useAgendaStore.getState().clearCompletedTasks();

        const remaining = useAgendaStore.getState().tasks;
        expect(remaining).toHaveLength(1);
        expect(remaining[0].text).toBe('Pendiente');
    });
});

describe('moveTaskToNextDay', () => {
    it('mueve la tarea al día siguiente', () => {
        useProgressStore.setState({ currentSeason: 'spring', day: 5 });
        useAgendaStore.getState().addTask('Test');
        const id = useAgendaStore.getState().tasks[0].id;

        useAgendaStore.getState().moveTaskToNextDay(id);

        const task = useAgendaStore.getState().tasks[0];
        expect(task.day).toBe(6);
        expect(task.season).toBe('spring');
    });

    it('cambia de estación al pasar del día 28', () => {
        useProgressStore.setState({ currentSeason: 'spring', day: 28 });
        useAgendaStore.getState().addTask('Test');
        const id = useAgendaStore.getState().tasks[0].id;

        useAgendaStore.getState().moveTaskToNextDay(id);

        const task = useAgendaStore.getState().tasks[0];
        expect(task.day).toBe(1);
        expect(task.season).toBe('summer');
    });

    it('pasa de winter a spring al rotar estaciones', () => {
        useProgressStore.setState({ currentSeason: 'winter', day: 28 });
        useAgendaStore.getState().addTask('Test');
        const id = useAgendaStore.getState().tasks[0].id;

        useAgendaStore.getState().moveTaskToNextDay(id);

        const task = useAgendaStore.getState().tasks[0];
        expect(task.day).toBe(1);
        expect(task.season).toBe('spring');
    });

    it('marca la tarea como no completada al moverla', () => {
        useProgressStore.setState({ currentSeason: 'spring', day: 5 });
        useAgendaStore.getState().addTask('Test');
        const id = useAgendaStore.getState().tasks[0].id;
        useAgendaStore.getState().toggleTask(id);

        useAgendaStore.getState().moveTaskToNextDay(id);

        expect(useAgendaStore.getState().tasks[0].completed).toBe(false);
    });

    it('no hace nada si el id no existe', () => {
        useAgendaStore.getState().addTask('Test');
        useAgendaStore.getState().moveTaskToNextDay('id-inexistente');

        expect(useAgendaStore.getState().tasks).toHaveLength(1);
    });
});
