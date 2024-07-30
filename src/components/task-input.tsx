import { observer } from "mobx-react";
import { useStore } from "../stores";
import { useEffect, useRef, useState } from "react";

export const TaskInput = observer(() => {
    const store = useStore();
    const [body, setBody] = useState(store.task.taskEdit?.body || '');
    const inputRef = useRef<HTMLInputElement>(null);

    const submit = () => {
        if (body.trim()) {
            if (store.task.taskEdit) {
                store.task.update(store.task.taskEdit.id, body);
            } else {
                store.task.add(body);
            }
            setBody('');
        }
    };

    useEffect(() => {
        if (store.task.taskEdit) {
            setBody(store.task.taskEdit.body || '');
            inputRef.current?.focus();
        } else {
            setBody('');
        }
    }, [store.task.taskEdit]);

    return (
        <div className={`p-3 
                bg-component 
                dark:bg-component-dark
                text-dark
                dark:text-light
                flex 
                items-center
                shadow-lg
                rounded-lg
                mt-7
            `}>
            <input
                ref={inputRef}
                value={body}
                onChange={(e) => setBody(e.currentTarget.value)}
                onKeyDown={(e) => (e.key === 'Enter' ? submit() : '')}
                type="text"
                placeholder="+ add new task"
                className="bg-transparent outline-0 flex-1 px-3"
            />
            <button
                onClick={() => submit()}
                className="bg-primary px-3 py-1.5 text-sm text-light rounded-lg"
            >
                {store.task.taskEdit ? 'update' : 'add'}
            </button>
        </div>
    );
});
