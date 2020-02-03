import * as actionTypes from '../actions/actionTypes';
import habitData from './habitData';
import newHabitButtonData from './newHabitButtonData';
import habitButtonData from './habitButtonData';

const initialState = {
    clicked: false,
    habits: habitData,
    showNewHabit: false,
    newHabit: "",
    showNewHabitButtons: false,  
    newHabitButtons: newHabitButtonData,
    habitButtons: habitButtonData
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLICK:
            return {
                ...state,
                    clicked: action.buttonClicked
            };
        case actionTypes.ADD_NEW_HABIT_INPUT:
            return {
                ...state,
                    newHabit: action.newHabit
            };
        case actionTypes.SHOW_NEW_HABIT_BUTTONS:
            return {
                ...state,
                    showNewHabitButtons: action.showButtons
            };
        case actionTypes.SHOW_NEW_HABIT:
            return {
                ...state,
                     showNewHabit: action.showNewHabitInput
            };
        default: 
            return state;
    }
};

export default reducer;