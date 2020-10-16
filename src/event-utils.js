import './index.css';

let eventGuid = 0
//let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

//let etext = this.TodoList.items[0].item.text

export const INITIAL_EVENTS = [
   // {
   //   id: createEventId(),
   //   title: etext,
   //   start: todayStr + 'T12:00:00'
   // }
]

export function createEventId() {
  return String(eventGuid++)
}
