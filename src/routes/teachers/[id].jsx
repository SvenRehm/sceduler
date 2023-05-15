import { useParams } from "solid-start";

export default function UserPage() {
    const params = useParams();
    return (
        <div>
            User {params.id}
            <ul>
                <For each={teacher()[0].classes}>
                    {(teacher) => <li>{teacher}</li>}
                </For>
            </ul>
        </div>
    );
}
