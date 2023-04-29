import { createSignal } from "solid-js";
import { GlobalStateData } from "../store/globalState.jsx";
export default function Counter() {
    const { name, setName, count, setCount } = GlobalStateData();
    setName("blub");
    return (
        <>
            <button
                class="w-[200px] rounded-full bg-gray-100 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]"
                onClick={() => setCount(count() + 1)}
            >
                Clicks: {count()}
            </button>
            <h1>{name()} </h1>
        </>
    );
}
