import { createSignal, createMemo, createContext, useContext } from "solid-js";

export const GlobalStateContext = createContext();

export function GlobalStateProvider(props) {
    const [name, setName] = createSignal("Dan");

    const [count, setCount] = createSignal(0);
    return (
        <GlobalStateContext.Provider value={{ name, setName, count, setCount }}>
            {props.children}
        </GlobalStateContext.Provider>
    );
}

export function GlobalStateData() {
    return useContext(GlobalStateContext);
}
