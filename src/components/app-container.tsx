import {observer} from "mobx-react";
import {ThemeToggle} from "./theme-toggle";
import {BaseText} from "./base-text";
import Logo from '../logo.svg';
import {useStore} from "../stores";
import {useEffect} from "react";
import {TaskList} from "./task-list";
import {TaskInput} from "./task-input";

export const AppContainer = observer(() => {
    const store = useStore();
    useEffect(() => {
        document.body.setAttribute('data-mode', store.theme.themeMode);
    }, [store.theme.themeMode]);
    return (
        <div className="max-w-screen-md mx-auto p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={Logo} alt="logo"/>
                    <div className="text-xl text-primary">Todo</div>
                </div>
                <ThemeToggle></ThemeToggle>
            </div>
            <BaseText>Hello! This is my first to do list using React/Mobx/Tailwind/Typescript</BaseText>
            <TaskInput></TaskInput>
            <TaskList></TaskList>
        </div>
    );
})