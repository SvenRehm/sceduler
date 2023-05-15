import { createSignal, createEffect } from 'solid-js';
import { dndzone } from 'solid-dnd-directive';
import { GlobalStateData } from '../store/globalState.jsx';
import { EVENTS } from '~/events.js';
const containerStyle = {
  border: '1px solid black',
  padding: '0.3em',
  'max-width': '200px'
};
dndzone;
const itemStyle = {
  border: '1px solid blue',
  padding: '0.3em',
  margin: '0.2em 0'
};
export default function DND() {
  const { name, setName, count, setCount } = GlobalStateData();
  const [currentWeekDays, setCurrentWeekDays] = createSignal([]);
  const [items, setItems] = createSignal([
    { id: 1, title: 'item 1' },
    { id: 2, title: 'item 2' },
    { id: 3, title: 'item 3' }
  ]);
  function handleDndEvent(e) {
    const { items: newItems } = e.detail;
    setItems(newItems);
  }
  return (
    <main>
      <section
        style={containerStyle}
        use:dndzone={{ items }}
        on:consider={handleDndEvent}
        on:finalize={handleDndEvent}
      >
        <For each={items()}>
          {(item) => <div style={itemStyle}>{item.title}</div>}
        </For>
      </section>
    </main>
  );
}
