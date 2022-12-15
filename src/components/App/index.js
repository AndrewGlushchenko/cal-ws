
import moment from 'moment';
import {Header} from "../Header";
import {Monitor} from "../Monitor";
import {CalendarGrid} from "../CalendarGrid";
import styled from 'styled-components';
import React, {useEffect, useState} from "react";

const ShadowWrapper = styled.div`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`;

const EventFormWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow: unset;
`;

const EventTitle = styled("input")`
  padding: 8px 14px;
  font-size:  .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventDescription = styled("textarea")`
  padding: 8px 14px;
  font-size:  .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

const ButtonsWrapper = styled("div")`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled("button")`
  color: ${props => props.danger ? '#f00' : '#27282A'};
  border: 1px solid ${props => props.danger ? '#f00' : '#27282A'};
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
`;

const url = 'http://localhost:3322';
const totalDays = 42;
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X')
};

function App(language, localeSpec) {
  moment.updateLocale('en', {week: {dow: 1}});

  const [today, setToday] = useState(moment())
  const startDay = today.clone().startOf('month').startOf('week');


  const prevHandler = () => setToday(prev => prev.clone().subtract(1,'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(next => next.clone().add(1,'month'));

  const [method, setMethod] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [event, setEvent] = useState(null);

  const [events, setEvents] = useState([]);

  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(totalDays, 'days').format('X');

  useEffect( () => {
        fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
            .then(res => res.json())
            .then(res => setEvents(res));
    }, [today]);

  const eventFormHandler = (methodName, eventForUpdate, dayItem) => {
      setShowForm(true);
      setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')});
      setMethod(methodName);
  };

  const cancelButtonHandler = () => {
      setShowForm(false);
      setEvent(null);
  };

  const changeEventHandler = (text, field) => {
      setEvent(prevState => ({
          ...prevState,
      [field]: text
      }))
  };

  const eventSaveHandler = () => {
      const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
      const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

      fetch(fetchUrl, {
          method: httpMethod,
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
      })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(method === 'Update') {
              setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl));
            } else {
              setEvents(prevState => [...prevState, res]);
            }
            cancelButtonHandler()
        })
  };

  const eventRemoveHandler = () => {
      const fetchUrl = `${url}/events/${event.id}`;
      const httpMethod = 'DELETE';

      fetch(fetchUrl, {
          method: httpMethod,
          headers:{
              'Content-Type': 'application/json'
          },
      })
          .then(res => res.json())
          .then(res => {
              console.log(res);
              setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id));
              cancelButtonHandler()
          })
  };

  return (
  <>
      {
          isShowForm ? (
              <EventFormWrapper onClick={cancelButtonHandler} >
                  <FormWrapper onClick={e => e.stopPropagation()} >
                      <EventTitle
                          value={event.title}
                          onChange={e => changeEventHandler(e.target.value, 'title')}
                          placeholder="Title"
                      />
                      <EventDescription
                          value={event.description}
                          onChange={e => changeEventHandler(e.target.value, 'description')}
                          placeholder="Description"
                      />
                      <ButtonsWrapper>
                          <ButtonWrapper onClick={cancelButtonHandler} >Cancel</ButtonWrapper>
                          <ButtonWrapper onClick={eventSaveHandler} >{method}</ButtonWrapper>
                          {
                              method === 'Update' ? (
                                  <ButtonWrapper danger onClick={eventRemoveHandler} >Remove</ButtonWrapper>
                              ) : null
                          }
                      </ButtonsWrapper>
                  </FormWrapper>
              </EventFormWrapper>
          ) : null
      }
      <ShadowWrapper >
          <Header />
          <Monitor
              today={today}
              prevHandler = {prevHandler}
              todayHandler = {todayHandler}
              nextHandler = {nextHandler}
          />
          <CalendarGrid startDay={startDay} today={today} totalDays={totalDays}
                        events={events} eventFormHandler={eventFormHandler}/>
      </ShadowWrapper>
  </>
  );
}

export default App;
