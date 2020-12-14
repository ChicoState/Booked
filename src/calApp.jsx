import React from 'react'
import FirebaseApp from "./FirebaseApp";
import firebase from "./FirebaseApp";
import 'firebase/database';
//import ReactDOM from 'react-dom';
//import FullCalendar, { formatDate } from '@fullcalendar/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './event-utils'
import './index.css';

export default class CalApp extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
       weekendsVisible: true,
       isSignedIn : false,
       currentEvents: [],
       items: [],
       cuid: "",
       text: '',
     }
  }

loadDB() {
//if (this._isMounted) {
//  const itemsRef = FirebaseApp.database().ref('text');
  const itemsRef = firebase.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let hashTags = [];
    let uniqueHash = [];
    if(this.state.isSignedIn) {
      // let newState = [];
      for (let item in items) {
//        if(items[item].uid===firebase.auth().currentUser.uid) {
        if(items[item].uid===this.state.cuid) {
          var regexp = /\B#\w\w+\b/g;
          let hashCheck = items[item].text.match(regexp);
          if (hashCheck !== null) {
            for(let tag in hashCheck) {
              hashTags.push(hashCheck[tag]);
            }
          }
          // newState.push({
          //   id: items[item].id,
          //   text: items[item].text,
          //   start: items[item].startDate,
          //   endDate: items[item].endDate,
          //   groupColor: items[item].groupColor,
          //   fkey: item,
          //   });
//            if(items[item].groupColor==null) {
//              var groupColor = "blue";
//            } else {
            var groupColor = items[item].groupColor;
//            }
//            if(items[item].startDate==null) {
//              const dateInMillis  = items[item].id;
//              var date = new Date(dateInMillis);
//            } else {
              const dateInMillis  = items[item].startDate;
              var date = new Date(dateInMillis);
//            }
            let dayStr = date;
//            const edateInMillis  = items[item].endDate;
//            var edate = new Date(edateInMillis);
//            let edayStr = edate;
            var addEvents =
              {
                id: createEventId(),
                title: items[item].text,
                start: dayStr,
                end:  items[item].endDate,
                allDay: true,
                backgroundColor: groupColor,
                fkey: item
              };
           this.state.currentEvents.push(addEvents);
          }
        }
        uniqueHash = [...new Set(hashTags)];
        hashTags = uniqueHash;
        for (let item in items) {
//          if(items[item].uid!==firebase.auth().currentUser.uid) {
          if(items[item].uid!==this.state.cuid) {
            for(let tag in hashTags) {
              if(items[item].text.indexOf(hashTags[tag])!==-1) {
                // newState.push({
                //   id: items[item].id,
                //   text: items[item].text,
                //   start: items[item].startDate,
                //   endDate: items[item].endDate,
                //   groupColor: items[item].groupColor,
                //   fkey: item,
                //   });
//                  if(items[item].groupColor==null) {
//                    groupColor = "blue";
//                  } else {
                    groupColor = items[item].groupColor;
//                  }
//                  if(items[item].startDate==null) {
  //                  const dateInMillis  = items[item].id;
  //                  date = new Date(dateInMillis);
  //                } else {
                    const dateInMillis  = items[item].startDate;
                    date = new Date(dateInMillis);
//                  }
                  let dayStr = date;
//                  const edateInMillis  = items[item].endDate;
//                  var edate = new Date(edateInMillis);
//                  let edayStr = edate;
                  addEvents =
                    {
                      id: createEventId(),
                      title: items[item].text + " (" + items[item].creator + ")",
                      start: dayStr,
                      end:  items[item].endDate,
                      allDay: true,
                      backgroundColor: groupColor,
                      fkey: item
                    };
                 this.state.currentEvents.push(addEvents);
              }
            }
          }
        }


      }
    });
//  }
}

componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user, cuid: ((firebase.auth().currentUser !== null) ? firebase.auth().currentUser.uid : "") })
  //    console.log("user", user)
    })
//    this._isMounted = true;
    this.loadDB();
}

componentDidUpdate(prevProps,prevState) {
//  if (this._isMounted) {
    if (this.state.isSignedIn !== prevState.isSignedIn) {
      this.setState({
        currentEvents: [],
        cuid: ((firebase.auth().currentUser !== null) ? firebase.auth().currentUser.uid : "")
      });
      this.loadDB();
    }
//  }
}


  render() {
      this.loadDB();
//    let calendarApi = this.view.calendar;
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
            //initialEvents={this.state.currentEvents}
            select={this.handleDateSelect}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents}
            eventChange={this.handleChange}
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

    // handleWeekendsToggle = () => {
    //   if (this._isMounted) {
    //     this.setState({
    //       weekendsVisible: !this.state.weekendsVisible
    //     })
    //   }
    // }

    handleDateSelect = (selectInfo) => {
      // let title = prompt('Please enter a new title for your task)
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
//    clickInfo.event.setProp("backgroundColor","purple");
      var ColorToInt = new Object();
      ColorToInt["blue"] = 0;
      ColorToInt["purple"] = 1;
      ColorToInt["red"] = 2;
      ColorToInt["orange"] = 3;
      ColorToInt["green"] = 4;
      var ColorKey = ColorToInt[clickInfo.event.backgroundColor];
      var IntToColor = ["blue", "purple", "red", "orange", "green"];
      var changeColor = IntToColor[(ColorKey +1) % 5];
      // alert(IntToColor[(ColorKey +1) % 5]);
      // switch(clickInfo.event.backgroundColor) {
      //   case 'blue':
      //     var changeColor = "purple";
      //     break;
      //   case 'purple':
      //     changeColor = "red";
      //     break;
      //   case 'red':
      //     changeColor = "orange";
      //     break;
      //   case 'orange':
      //     changeColor = "green";
      //     break;
      //   case 'green':
      //     changeColor = "blue";
      //     break;
      //   default:
      //     changeColor = "blue";
      //     break;
      // }
      clickInfo.event.setProp("backgroundColor",changeColor);
      for (let item in this.state.currentEvents) {
        if (clickInfo.event.id === this.state.currentEvents[item].id) {
          FirebaseApp.database().ref('/text/' + this.state.currentEvents[item].fkey).update({
          groupColor: changeColor
          });
        }
      }
    }


  handleEvents = (events) => {
      for (let item in events) {
          for (let itemb in this.state.currentEvents) {
            if (events[item].id === this.state.currentEvents[itemb].id) {
                if(events[item].start !== this.state.currentEvents[itemb].start) {
                  var sdate = new Date(events[item].start);
                  var sdatems = sdate.getTime();
                  FirebaseApp.database().ref('/text/' + this.state.currentEvents[itemb].fkey).update({
                  startDate: sdatems
                  });
                }
                if(events[item].end != null) {
                  var edate = new Date(events[item].end);
                  var edatems = edate.getTime();
                  FirebaseApp.database().ref('/text/' + this.state.currentEvents[itemb].fkey).update({
                    endDate: edatems
                    });
                  }
                }
              }
            }
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
