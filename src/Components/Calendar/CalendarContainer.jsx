import React, { Component } from 'react';
import '../Main.scss';
import './Calendar.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { connect } from 'react-redux';
import { completedHabitsListFetch } from '../../store/actions/habits';

const mapStateToProps = state => {
    return {
        ...state.habits   
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCompletedHabitsListFetch: () => dispatch(completedHabitsListFetch())
    }
}

class CalendarContainer extends Component {

    componentDidMount() {
        this.props.onCompletedHabitsListFetch();
    }

    render() {

        const { isFetchingCompleted, completedHabits } = this.props;
        const loader = <div className="calendar-loaderContainer"><div className="lds-ripple"><div></div><div></div></div></div>;

        let content;

        if (isFetchingCompleted) {
            content = loader
        } else {
            content = <FullCalendar 
            defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin ]} 
            events={completedHabits}/>
        }

        return (
            <div className="calendarContainer">
               {content}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);