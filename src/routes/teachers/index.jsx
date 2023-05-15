import { A } from "solid-start";
import { useContext, createSignal } from "solid-js";
export default function Teachers() {
    const [teacher, setTeacher] = createSignal([
        {
            id: "asdadadad",
            name: "bla",
            details: "more details",
            classes: ["IF-10B", "IF-11B"],
        },
    ]);

    return (
        <main class="text-center mx-auto text-gray-700 p-4">
            <h1>{teacher()[0].name}</h1>
            <A href={`/teachers/${teacher()[0].id}`}>{teacher()[0].id}</A>
            <ul>
                <For each={teacher()[0].classes}>
                    {(teacher) => <li>{teacher}</li>}
                </For>
            </ul>
        </main>
    );
}
