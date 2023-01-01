import moment from "moment/moment";

export const IsCurrentDay = (day) => moment().isSame(day, 'day');
export const isSelectedMonth = (day, today) => today.isSame(day, 'month');
export const isEventInCurrentDay = (event, dayItem) =>
    event.date >= dayItem.startOf('day').format('X')
    && event.date <= dayItem.clone().endOf('day').format('X');