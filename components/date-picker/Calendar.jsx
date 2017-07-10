import React from 'react';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import RcCalendar from 'rc-calendar';
import warning from 'warning';
export default class Calendar extends React.Component {
    render() {
        warning(false, 'DatePicker.Calendar is deprecated, use Calendar instead.');
        return <RcCalendar {...this.props}/>;
    }
}
Calendar.defaultProps = {
    locale: CalendarLocale,
    prefixCls: 'ant-calendar',
};
