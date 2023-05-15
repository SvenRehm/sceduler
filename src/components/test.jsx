import { createSignal, createEffect } from 'solid-js';

import { GlobalStateData } from '../store/globalState.jsx';
import { EVENTS } from '~/events.js';
import {
  startOfWeek,
  eachDayOfInterval,
  addBusinessDays,

  format,
  getDate,
  getDay,
  getHours,
  getMinutes,
  nextMonday
} from 'date-fns';
import de from 'date-fns/locale/de';
export default function Test() {
  const { name, setName, count, setCount } = GlobalStateData();
  const [currentWeekDays, setCurrentWeekDays] = createSignal([]);
  const [currentWeekStart, setCurrentWeekStart] = createSignal(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [currentWeekEnd, setCurrentWeekEnd] = createSignal(
    addBusinessDays(currentWeekStart(), 4)
  );
  
  const [test, setTest] = createSignal([
    {
      id: 121233,
      start: '',
      end: ''
    },
    {
      id: 121233,
      start: '',
      end: ''
    },
    {
      id: 121233,
      start: '',
      end: ''
    },
    {
      id: 121233,
      start: '',
      end: ''
    }
  ]);
  function nextWeek() {
    setCurrentWeekStart(nextMonday(currentWeekStart()));
  }
  createEffect(() => {
    setCurrentWeekEnd(addBusinessDays(currentWeekStart(), 4));

    setCurrentWeekDays(
      eachDayOfInterval({
        start: currentWeekStart(),
        end: currentWeekEnd()
      })
    );
    console.log(currentWeekDays());
  });

  const EventTest = [
    {
      id: 1,
      day: 1,
      events: [{ title: 'bla' }, { title: 'asdadc' }, { title: 'afdg' }]
    },
    {
      id: 2,
      day: 2,
      events: [{ title: 'bla' }]
    },
    {
      id: 3,
      day: 3,
      events: [{ title: 'bla' }]
    }
  ];
  return (
    <>
      <button class="group rounded-2xl h-12 w-48 bg-green-500 font-bold text-lg text-white relative overflow-hidden" type="button" onClick={nextWeek}>
        get next week
      </button>
      <table class="min-w-full">
        <thead class="bg-gray-200 border-b">
          <tr>
            <td scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Zeit</td>
            <For each={currentWeekDays()}>
              {(day) => <td class="text-sm font-medium text-gray-900 px-6 py-4 text-left">{format(day, 'dd.LL cccc', { locale: de })}</td>}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={test()}>
            {(timeSlot, i) => (
              <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {timeSlot.start}
                  {i() + 1}
                  <br />
                  {timeSlot.end}
                </td>
                <For each={currentWeekDays()}>
                  {(day, j) => (
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {j() + 1}
                      <For each={EventTest}>
                        {(event) => (
                          <Show when={event.day === j() + 1}>
                            {JSON.stringify(event.events[i()]?.title)}
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
