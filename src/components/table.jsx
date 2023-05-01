import { createSignal } from "solid-js";
import { GlobalStateData } from "../store/globalState.jsx";
import { EVENTS } from "~/events.js";
import {
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    addBusinessDays,
    getDate,
    getHours,
    getMinutes,
} from "date-fns";
export default function Table() {
    const { name, setName, count, setCount } = GlobalStateData();
    const [currentWeekDays, setCurrentWeekDays] = createSignal([]);
    const [weekDayName, setWeekDayName] = createSignal({
        1: "Montag",
        2: "Dienstag",
        3: "Mittwoch",
        4: "Donnerstag",
        5: "Freitag",
    });
    // <Show
    const [timeTable, setTimeTable] = createSignal([
        { start: "07:00", end: "7:45" },
        { start: "09:00", end: "7:45" },
        { start: "07:00", end: "7:45" },
        { start: "07:00", end: "7:45" },
        { start: "10:00", end: "7:45" },
        { start: "20:00", end: "7:45" },
    ]);
    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const currentWeekEnd = addBusinessDays(currentWeekStart, 4);

    const allWeekdays = eachDayOfInterval({
        start: currentWeekStart,
        end: currentWeekEnd,
    });
    setCurrentWeekDays(allWeekdays);
    console.log(EVENTS);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Zeit</td>
                        <For each={currentWeekDays()}>
                            {(day) => <td>{weekDayName()[getDate(day)]}</td>}
                        </For>
                    </tr>
                </thead>
                <tbody>
                    <For each={timeTable()}>
                        {(timeSlot) => (
                            <tr>
                                <td>
                                    {timeSlot.start}
                                    <br />
                                    {timeSlot.end}
                                </td>
                                <For each={currentWeekDays()}>
                                    {(day) => (
                                        <td>
                                            <For each={EVENTS}>
                                                {(event) => (
                                                    <Show
                                                        when={
                                                            `${getHours(
                                                                event.start
                                                            )
                                                                .toString()
                                                                .padStart(
                                                                    2,
                                                                    "0"
                                                                )}:00` ===
                                                            timeSlot.start
                                                        }
                                                    >
                                                        <Show
                                                            when={
                                                                getDate(
                                                                    event.start
                                                                ) ==
                                                                getDate(day)
                                                            }
                                                        >
                                                            {`${getHours(
                                                                event.start
                                                            )
                                                                .toString()
                                                                .padStart(
                                                                    2,
                                                                    "0"
                                                                )}:00`}
                                                        </Show>
                                                    </Show>
                                                )}
                                            </For>
                                        </td>
                                    )}
                                </For>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </>
    );
}
