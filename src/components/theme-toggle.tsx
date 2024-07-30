import {observer} from "mobx-react";
import {IoIosMoon, IoIosSunny} from "react-icons/io";
import {useStore} from "../stores";
import {useEffect} from "react";

const AFTER_LIGHT_CLASS = 'after:left-[3px] ';
const AFTER_DARK_CLASS = 'after:left-[calc(3px+18px+3px)]';

export const ThemeToggle = observer(() => {
    const store = useStore();
    useEffect(() => {}, [store.theme.themeMode]);
    return (
        <button
            onClick={() => store.theme.toggle()}
            className={`
            flex
            items-center
            gap-[3px]
            text-[18px]
            bg-primary
            text-light
            rounded-full
            p-[3px]
            relative
            after:content-['']
            after:absolute
            after:bg-light
            after:h-[18px]
            after:w-[18px]
            after:rounded-full
            after:ease-in-out
            after:duration-300
            ${store.theme.mode(AFTER_LIGHT_CLASS, AFTER_DARK_CLASS)}
        `}>
            <IoIosMoon></IoIosMoon>
            <IoIosSunny></IoIosSunny>
        </button>
    )
})