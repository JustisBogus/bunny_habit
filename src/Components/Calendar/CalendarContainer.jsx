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
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    componentDidMount() {
        this.props.onCompletedHabitsListFetch();
        console.log(this.props.compledHabits);
    }

    render() {

        const { completedHabits } = this.props;

        return (
            <div className="calendarContainer">
               <FullCalendar 
                    defaultView="dayGridMonth" 
                    plugins={[ dayGridPlugin ]} 
                    events={completedHabits}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);