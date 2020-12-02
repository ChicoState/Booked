import React from 'react'
//import ReactDOM from 'react-dom';
//import FullCalendar, { formatDate } from '@fullcalendar/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import './index.css';
import app from "./firebase";
import firebase from "./firebase";
import 'firebase/database';

export default class CalApp extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
       weekendsVisible: true,
       isSignedIn : false,
       currentEvents: [],
       items: [],
       text: '',
     }
  }

loadDB() {
  const itemsRef = app.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    this.state.currentEvents = [];
    if(firebase.auth().currentUser) {
      for (let item in items) {
        if(items[item].uid===firebase.auth().currentUser.uid) {
          newState.push({
            id: items[item].id,
            text: items[item].text,
            });
            const dateInMillis  = items[item].id;
            var date = new Date(dateInMillis);
            let dayStr = date;
            var addEvents =
              {
                id: createEventId(),
                title: items[item].text,
                start: dayStr,
                end: dayStr + 'T12:00:00'
              };
            this.state.currentEvents.push(addEvents);

          };
        };
      };
  });
}

componentDidMount = () => {
  firebase.auth().onAuthStateChanged(user => {
    this.setState({ isSignedIn: !!user})
    console.log("user", user)
  })
  this.loadDB();
}

componentDidUpdate(prevProps,prevState) {
  if (this.state.isSignedIn !== prevState.isSignedIn) {
    this.loadDB();
  }
}



  render() {
    this.loadDB();
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.currentEvents}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    // return (
    //   <div className='demo-app-sidebar'>
    //     <div className='demo-app-sidebar-section'>
    //       <h2>Instructions</h2>
    //       <ul>
    //         <li>Select dates and you will be prompted to create a new event</li>
    //         <li>Drag, drop, and resize events</li>
    //         <li>Click an event to delete it</li>
    //       </ul>
    //     </div>
    //     <div className='demo-app-sidebar-section'>
    //       <label>
    //         <input
    //           type='checkbox'
    //           checked={this.state.weekendsVisible}
    //           onChange={this.handleWeekendsToggle}
    //         ></input>
    //         toggle weekends
    //       </label>
    //     </div>
    //     <div className='demo-app-sidebar-section'>
    //       <h2>All Events ({this.state.currentEvents.length})</h2>
    //       <ul>
    //         {this.state.currentEvents.map(renderSidebarEvent)}
    //       </ul>
    //     </div>
    //   </div>
    // )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    // let calendarApi = selectInfo.view.calendar
    //
    // calendarApi.unselect() // clear date selection
    //
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  handleEventClick = (clickInfo) => {
//    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//      clickInfo.event.remove()
//    }
  }

  handleEvents = (events) => {
//    this.setState({
//      currentEvents: events
//    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }

// function gotoTasks(){
// setTimeout(() => {  ReactDOM.render(
//   <TodoApp />,
//   document.getElementById('root')
// ); }, 1000);
// }
