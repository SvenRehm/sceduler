import { createSignal, createEffect } from "solid-js";

import { GlobalStateData } from "../store/globalState.jsx";
import { EVENTS } from "~/events.js";
import {
    startOfWeek,
    eachDayOfInterval,
    addBusinessDays,
    format,
    getDate,
    getDay,
    getHours,
    getMinutes,
    nextMonday,
} from "date-fns";
import de from "date-fns/locale/de";
export default function Table() {
    const { name, setName, count, setCount } = GlobalStateData();
    const [currentWeekDays, setCurrentWeekDays] = createSignal([]);
    const [currentWeekStart, setCurrentWeekStart] = createSignal(
        startOfWeek(new Date(), { weekStartsOn: 1 })
    );
    const [currentWeekEnd, setCurrentWeekEnd] = createSignal(
        addBusinessDays(currentWeekStart(), 4)
    );
    const [timeTable, setTimeTable] = createSignal([
        { start: "07:00", end: "7:45" },
        { start: "09:00", end: "7:45" },
        { start: "07:00", end: "7:45" },
        { start: "07:00", end: "7:45" },
        { start: "10:00", end: "7:45" },
        { start: "20:00", end: "7:45" },
    ]);
    function nextWeek() {
        setCurrentWeekStart(nextMonday(currentWeekStart()));
    }
    createEffect(() => {
        setCurrentWeekEnd(addBusinessDays(currentWeekStart(), 4));
        setCurrentWeekDays(
            eachDayOfInterval({
                start: currentWeekStart(),
                end: currentWeekEnd(),
            })
        );
        console.log(currentWeekDays());
    });
    console.log(EVENTS);
    return (
        <>
            <button type="button" onClick={nextWeek}>
                hello
            </button>
            <table>
                <thead>
                    <tr>
                        <td>Zeit</td>
                        <For each={currentWeekDays()}>
                            {(day) => (
                                <>
                                    {format(day, "dd.LL cccc", {locale:de})}
                                </>
                            )}
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
