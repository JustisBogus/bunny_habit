import React, { Component } from 'react';
import '../Main.scss';
import { connect } from 'react-redux';
import { click } from '../../store/actions/habits';

class CalendarContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        };

    }

    render() {

        return (
            <div className="calendarContainer-calendarContainer">
               Calendar Container
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clicked: state.habits.clicked
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClicked: (buttonClicked) => dispatch(click(buttonClicked))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer);