import React, { Component } from 'react';
import '../Main.scss';
import NewHabitButton from '../Buttons/NewHabitButton';
import CancelButton from '../Buttons/CancelButton';
import { newHabitButtonFunctionDayly, newHabitButtonFunctionType } from './Functions/newHabitButtonFunctions';
import { connect } from 'react-redux';
import { click, newHabitInput, showNewHabitButtons, 
    showNewHabit, hideNewHabit, increaseDays, 
    changeHabitType, addNewHabit } from '../../store/actions/habits';

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

    handleNewHabitButtonClick = (id, value) => {
        let newHabitButtons = [...this.props.newHabitButtons]
        if (id === 1) {
            const newValue = newHabitButtonFunctionDayly(value);
            newHabitButtons[0].text = newValue.newText;
            newHabitButtons[0].value = newValue.newValue;
            this.props.onIncreaseDays(newValue, newHabitButtons);
        }
        if (id === 2) {
            let newHabit = {
                id: this.props.habits.length + 1,
                habit: this.props.newHabit,
                dayly: this.props.newHabitDayly,
                type: this.props.newHabitType,
                completed: false
            }
            this.props.onAddNewHabit(newHabit);
            this.hideNewHabit();
        }
        if (id === 3) {
            const newValue = newHabitButtonFunctionType(value);
            newHabitButtons[2].text = newValue.newText;
            newHabitButtons[2].value = newValue.newValue;
            this.props.onChangeHabitType(newValue, newHabitButtons);
        }
    }

    hideNewHabit = () => {
        this.props.onHideNewHabit(false);
    }

    render() {

        let buttons;

        if (this.props.showNewHabitButtons) {
            buttons = this.props.newHabitButtons.map(button => {
            return <NewHabitButton
                key={button.id}
                button={button}
                onClick={this.handleNewHabitButtonClick}
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
        habits: state.habits.habits,
        newHabit: state.habits.newHabit,
        newHabitDayly: state.habits.newHabitDayly,
        newHabitType: state.habits.newHabitType,
        showNewHabitButtons: state.habits.showNewHabitButtons,
        newHabitButtons: state.habits.newHabitButtons,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClicked: (buttonClicked) => dispatch(click(buttonClicked)),
        onNewHabitInput: (habitInput) => dispatch(newHabitInput(habitInput)),
        onShowNewHabitButtons: (showButtons) => dispatch(showNewHabitButtons(showButtons)),
        onShowNewHabit: (showNewHabitInput) => dispatch(showNewHabit(showNewHabitInput)),
        onHideNewHabit: (hideNewHabitInput) => dispatch(hideNewHabit(hideNewHabitInput)),
        onIncreaseDays: (value, newHabitButtons) => dispatch(increaseDays(value, newHabitButtons)),
        onChangeHabitType: (value, newHabitButtons) => dispatch(changeHabitType(value, newHabitButtons)),
        onAddNewHabit: (newHabit) => dispatch(addNewHabit(newHabit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Habit);