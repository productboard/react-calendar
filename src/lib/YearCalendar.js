import React, { Component } from 'react';
import PropTypes from 'prop-types';
import startOfWeek from 'date-fns/start_of_week';
import startOfMonth from 'date-fns/start_of_month';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import differenceInMonths from 'date-fns/difference_in_months'
// import classnames from 'classnames';

import Month from './components/Month';
import YearHeader from './YearHeader'

function getFormattedWeekDays(weekDayFormat) {
  const weekDays = [];
  const weekStart = startOfWeek(startOfMonth(new Date()));

  for (let i = 0; i < 7; i++) {
    weekDays.push(format(addDays(weekStart, i), weekDayFormat));
  }

  return weekDays;
}

export default class Calendar extends Component {
  constructor(props) {
    super(props);

    this.weekDays = getFormattedWeekDays(props.weekDayFormat);
  }

  static propTypes = {
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired,
    weekNumbers: PropTypes.bool,
    locale: PropTypes.string,
    month: PropTypes.array,
    yearHeaderFormat: PropTypes.string,
    events: PropTypes.object,
  };

  static defaultProps = {
    locale: 'en',
    yearHeaderFormat: 'YYYY',
  };

  getMonthRange(date, events) {
    const start = parse(this.props.startDate);
    const focus = startOfMonth(start);
    const end = parse(this.props.endDate);
    const size = differenceInMonths(end, start) + 1;

    const months = [];

    for (let i = 0; i < size; i++) {
      const date = addMonths(focus, i);

      months.push(
        <Month
          key={`month-${format(date, ['MMM'])}`}
          date={date}
          weekNumbers={this.props.weekNumbers}
          events={events}
        />
      );
    }

    return months;
  }

  render() {
    const { events } = this.props;

    return (
      <div className="rc-Calendar">
        <header className="rc-Calendar-header">
          {format(this.props.startDate, [this.props.yearHeaderFormat])}
        </header>
        {this.getMonthRange(events)}
      </div>
    );
  }
}