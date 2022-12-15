import React from "react";
import styled from 'styled-components';

import {CalendarGridHeader} from "../CalendarGridHeader";
import {DayList} from "../DayList";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color: ${props => props.isHeader ? '#1E1F21' : '#404040'};
  ${props => props.isHeader && 'border-bottom 1px solid #404040'};
`;


const CalendarGrid = ({startDay, today, totalDays, events, eventFormHandler}) => {
    return(
        <>
            <GridWrapper isHeader>
                <CalendarGridHeader />
            </GridWrapper>
            <GridWrapper>
                <DayList totalDays={totalDays} startDay={startDay}
                         events={events} eventFormHandler={eventFormHandler} today={today}/>
            </GridWrapper>
        </>
    );
};

export { CalendarGrid };