import {action, computed, makeAutoObservable, observable} from "mobx";

export const STORAGE_KEY = '@tasks';
export const RANDOM_TASK_HASH_LENGTH = 12;

export type TaskType = {
    id: string,
    body: string,
    updatedAt: number,
    isDone: boolean,
};

export class Task {
    @observable
    protected _tasks: TaskType[] = [];
    @observable
    protected _taskEdit?: TaskType

    constructor() {
        this.getTasksFromStorage();
        makeAutoObservable(this);
    }

    @computed
    get taskEdit() {
        return this._taskEdit;
    }

    @computed
    get tasks() {
        return this._tasks.filter((task) => {
            return !task.isDone
        })
            .sort((a, b) => b.updatedAt - a.updatedAt);
    }

    @computed
    get completedTasks() {
        return this._tasks.filter((task) => {
            return task.isDone
        })
            .sort((a, b) => b.updatedAt - a.updatedAt);
    }

    @action
    add(body: string) {
        this._tasks.push(
            {
                id: this.makeid(RANDOM_TASK_HASH_LENGTH),
                body,
                isDone: false,
                updatedAt: new Date().getTime()
            })
        this.sync();
    }

    @action
    edit(task: TaskType) {
        this._taskEdit = task;
    }

    @action
    update(id: TaskType['id'], body: string) {
        this.find(id, (task, i) => {
            this._tasks[i] = {
                ...task,
                body,
            };

            this._taskEdit = undefined;
            this.sync();
        });
    }

    @action
    delete(id: string) {
        this.find(id, (_, i) => {
            this._tasks.splice(i, 1);
            this.sync();
        })
    }

    @action
    toggleDone(id: TaskType['id']) {
        this.find(id, (task, i) => {
            this._tasks[i] = {
                ...task,
                isDone: !task.isDone,
                updatedAt: !task.isDone ? new Date().getTime() : task.updatedAt,
            };
            this.sync();
        });
    }

    private getTasksFromStorage() {
        // @ts-ignore
        const tasks = localStorage.getItem(STORAGE_KEY);
        if (tasks) {
            this._tasks = JSON.parse(tasks);
        }
    }

    private sync() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks));
    }

    private find(id: TaskType['id'], callback: (task: TaskType, index: number) => void) {
        const index = this._tasks.findIndex((task) => task.id === id);
        if (index !== -1) callback(this._tasks[index], index);
    }


    private makeid(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return "#" + result + this._tasks.length.toString();
    }
}