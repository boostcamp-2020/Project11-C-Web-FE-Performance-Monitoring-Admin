import React from 'react';

class DateHelper {
  constructor() {}

  static getForm(date: string) {
    const newDate: Date = new Date(date);
    return String(
      newDate.getFullYear() +
        '-' +
        (newDate.getMonth() + 1) +
        '-' +
        newDate.getDate()
    );
  }

  static getDiff(date: string) {
    const now: number = new Date().getTime();
    const time: number = new Date(date).getTime();
    const dateDiff: number = Math.ceil((now - time) / (1000 * 3600 * 24));

    return dateDiff;
  }
  static getLast = (days: number) => {
    const date: Date = new Date();
    const last: Date = new Date(date.getTime() - days * 24 * 60 * 60 * 1000);

    return last;
  };

  static getLastDate = (days: number) => {
    const lastDay: number = DateHelper.getLast(days).getDate();

    return lastDay;
  };

  static getLastMonth = (days: number) => {
    const lastMonth: number = DateHelper.getLast(days).getMonth() + 1;

    return lastMonth;
  };

  static getLastYear = (days: number) => {
    const lastYear = DateHelper.getLast(days).getFullYear();

    return lastYear;
  };
}

export default DateHelper;
