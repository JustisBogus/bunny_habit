import React, { Component } from 'react';
import '../Main.scss';
import NewHabitButton from '../Buttons/NewHabitButton';
import CancelButton from '../Buttons/CancelButton';
import { connect } from 'react-redux';
import { click, newHabitInput, showNewHabitButtons, showNewHabit } from '../../store/actions/habits';

class Habit extends Component {

    handleNewHabitInput = (habit) => {
        let habitInput = habit;
        this.props.onNewHabitInput(habitInput);
        if (habit.length >= 3) {
            this.props.onShowNewHabitButtons(true);
        } else {
            this.props.onShowNewHabitButtons(false);
        }
    }

    hideNewHabit = () => {
        this.props.onShowNewHabit(false);
    }

    render() {

        let buttons;

        if (this.props.showNewHabitButtons) {
            buttons = this.props.newHabitButtons.map(button => {
            return <NewHabitButton
                key={button.id}
                button={button}
            />
        });
        } else {
            buttons = <CancelButton
                        onClick={this.hideNewHabit}
            />
        }

        return (
            <div className="newHabit-newHabitContainer">
                <div className="newHabit-inputContainer">
                    <input 
                        placeholder="My new habit" 
                        className="newHabit-input" 
                        onChange={(event) => this.handleNewHabitInput(event.target.value)} 
                        value={this.props.newHabit}
                        />
                </div>
                <div className="newHabit-buttonContainer">
                {buttons}
                </div>     
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clicked: state.habits.clicked,
        newHabit: state.habits.newHabit,
        showNewHabitButtons: state.habits.showNewHabitButtons,
        newHabitButtons: state.habits.newHabitButtons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClicked: (buttonClicked) => dispatch(click(buttonClicked)),
        onNewHabitInput: (habitInput) => dispatch(newHabitInput(habitInput)),
        onShowNewHabitButtons: (showButtons) => dispatch(showNewHabitButtons(showButtons)),
        onShowNewHabit: (showNewHabitInput) => dispatch(showNewHabit(showNewHabitInput))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habit);