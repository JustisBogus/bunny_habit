import React, { Component } from 'react';
import '../Main.scss';
import NewHabit from './NewHabit';
import HabitButton from '../Buttons/HabitButton';
import Habit from './Habit';
import { connect } from 'react-redux';
import { click, showNewHabit } from '../../store/actions/habits';

class HabitsContainer extends Component {
    
    handleButtonClick = (id) => {
        if (id === 3) {   
            this.props.onShowNewHabit(true);
        } 
    }

    render() {

        let newHabit;

        if (this.props.showNewHabit) {
            newHabit = <div ref={this.newHabit}>
            <NewHabit/>
            </div>
        }

        let habits = this.props.habits.map(habit => {
            return <Habit
                key={habit.id}
                habit={habit}
            />
        });
        
        let buttons = this.props.habitButtons.map(button => {
            return <HabitButton
                key={button.id}
                button={button}
                onClick={this.handleButtonClick}
            />
            });

        return (
            <div className="habitsContainer">
                <div className="habitsContainer-habitButtonContainer">
                    {buttons}
                </div>
                {newHabit}
                <div className="habitsContainer-habitsContainer"> 
                    <div className="habitsContainer-title">
                        do
                    </div>
                {habits}
                </div>     
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clicked: state.habits.clicked,
        habits: state.habits.habits,
        showNewHabit: state.habits.showNewHabit,
        habitButtons: state.habits.habitButtons      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClicked: (buttonClicked) => dispatch(click(buttonClicked)),
        onShowNewHabit: (showNewHabitInput) => dispatch(showNewHabit(showNewHabitInput))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitsContainer);