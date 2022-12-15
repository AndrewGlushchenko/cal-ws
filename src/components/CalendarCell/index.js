import React from "react";
import {IsCurrentDay, isSelectedMonth} from "../../tools";
import {CellWrapper, RowInCell} from "../../containers/StyledComponents";
import styled from "styled-components";

const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;

const CDayWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EventItemWrapper = styled('button')`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  background: unset;
  color: #DDDDDD;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;

const EventListItemWrapper = styled('li')`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

export const CalendarCell = ({dayItem, today, eventFormHandler, events}) => {
    return (
        <CellWrapper
            isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
            key={dayItem.unix()}
            isSelectedMonth={isSelectedMonth(dayItem, today)}
        >
            <RowInCell justifyContent={'flex-end'}>
                <ShowDayWrapper>
                    <DayWrapper onDoubleClick={(e) =>
                        eventFormHandler('Create', null, dayItem)}>
                        {!IsCurrentDay(dayItem) ? dayItem.format('D') :
                            <CDayWrapper>{dayItem.format('D')}</CDayWrapper>}
                    </DayWrapper>
                </ShowDayWrapper>
                <EventListWrapper>{
                    events
                        .slice(0,2)
                        .map(event => (
                            <EventListItemWrapper key={event.id}>
                                <EventItemWrapper onDoubleClick={() =>
                                    eventFormHandler('Update', event)}>
                                    { event.title }
                                </EventItemWrapper>
                            </EventListItemWrapper>
                        ))
                }
                {
                    events.length > 2 ? (
                        <EventListItemWrapper key='show more'>
                            <EventItemWrapper>
                                show more...
                            </EventItemWrapper>
                        </EventListItemWrapper>
                    ) : null
                }
                </EventListWrapper>
            </RowInCell>
        </CellWrapper>
    )
};