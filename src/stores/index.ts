import { createContext, useContext } from 'react'

import { Theme } from './theme';
import {Task} from "./task";

const ctx = createContext({
    theme: new Theme(),
    task: new Task(),
});

export const useStore = () => useContext(ctx);