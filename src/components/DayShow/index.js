import React from "react";
import {isEventInCurrentDay} from "../../tools";
import styled from "styled-components";
import {
    ButtonsWrapper, ButtonWrapper,
    EventDescription,
    EventItemWrapper,
    EventListItemWrapper,
    EventListWrapper,
    EventTitle
} from "../../containers/StyledComponents";


export const DayShowWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;
`;

export const EventsListWrapper = styled('div')`
  background-color: #1E1F21;
  color: #DDDDDD;
  flex-grow: 1;
`;

export const EventFormWrapper = styled('div')`
  background-color: #27282A;
  color: #DDDDDD;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648;
`;

export const NoEventMessage = styled('div')`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;


export const DayShow = ({events, today, selectedEvent,
    changeEventHandler, cancelButtonHandler, eventSaveHandler, method, eventRemoveHandler, eventFormHandler}) => {

    const eventList = events.filter(event => isEventInCurrentDay(event, today))

    return (
        <DayShowWrapper>
            <EventsListWrapper>
                <EventListWrapper>
                    {
                        eventList.map(event => (
                            <EventListItemWrapper key={event.id}>
                                <EventItemWrapper onClick={() => eventFormHandler('Update', event)}>
                                    {
                                        event.title
                                    }
                                </EventItemWrapper>
                            </EventListItemWrapper>
                        ))
                    }
                </EventListWrapper>
            </EventsListWrapper>
            <EventFormWrapper>
                {
                    selectedEvent ? (
                        <div>
                            <EventTitle
                                value={selectedEvent.title}
                                onChange={e => changeEventHandler(e.target.value, 'title')}
                                placeholder="Title"
                            />
                            <EventDescription
                                value={selectedEvent.description}
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
                        </div>
                    ) : (
                        <>
                            <div>
                                <button onClick={() =>
                                    eventFormHandler('Create', null, today)}>Create new event</button>
                            </div>
                            <NoEventMessage>No event selected</NoEventMessage>
                        </>
                    )
                }
            </EventFormWrapper>
        </DayShowWrapper>
    );
}