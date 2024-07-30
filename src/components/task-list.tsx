import {observer} from "mobx-react";
import {useStore} from "../stores";
import {useEffect} from "react";
import {TaskItem} from "./task-item";
import {BaseText} from "./base-text";

export const TaskList = observer(() => {
    const store = useStore();
    useEffect(() => {}, []);
    return (
        <div className="mt-6">
            {store.task.tasks.map((task) => (
                <TaskItem key={task.id} task={task}></TaskItem>
            ))}
            <BaseText className="p-3">
                Completed ({store.task.completedTasks.length})
            </BaseText>
            {store.task.completedTasks.map((task) => (
                <TaskItem key={task.id} task={task}></TaskItem>
            ))}
        </div>
    );
})