import React from "react";

import { isEventInCurrentDay } from "../../tools";
import {CalendarCell} from "../CalendarCell";

export const DayList = ({startDay, totalDays, events, eventFormHandler, today}) => {
    const day = startDay.clone().subtract(1,'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1,'day').clone());

    return (
          daysArray.map((dayItem) => (
                    <CalendarCell today={today} events={events.filter(event => isEventInCurrentDay(event, dayItem))}
                                  eventFormHandler={eventFormHandler} dayItem={dayItem}/>
              )
          )
    )
}