import * as actionTypes from '../actions/actionTypes';
import habitData from './habitData';
import newHabitButtonData from './newHabitButtonData';
import habitButtonData from './habitButtonData';

const initialState = {
    clicked: false,
    habits: habitData,
    completedHabits: null,
    isFetching: false,
    isFetchingCompleted: false,
    showNewHabit: false,
    newHabit: "",
    newHabitDayly: 1,
    newHabitType: 1,
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
        case actionTypes.HABITS_LIST_REQUEST:
            return {
                ...state,
                    isFetching: true,
            };
        case actionTypes.HABITS_LIST_RECEIVED:
            return {
                ...state,
                    habits: action.data,
                    isFetching: false
            };
        case actionTypes.HABITS_LIST_ERROR:
            return {
                ...state,
                    isFetching: false,
                    habits: null
            };
        case actionTypes.COMPLETED_HABITS_LIST_REQUEST:
            return {
                ...state,
                    isFetchingCompleted: true,
            };
        case actionTypes.COMPLETED_HABITS_LIST_RECEIVED:
            return {
                ...state,
                    completedHabits: action.data,
                    isFetching: false
            };
        case actionTypes.COMPLETED_HABITS_LIST_ERROR:
            return {
                ...state,
                    isFetchingCompleted: false,
                    completedHabits: null
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
        case actionTypes.HIDE_NEW_HABIT:
            return {
                ...state,
                    showNewHabit: action.hideNewHabitInput,
                    newHabit: ""
            };
        case actionTypes.SET_HABIT_COMPLETED:
            return {
                ...state,
                    habits: action.updatedHabits
            };
        case actionTypes.INCREASE_DAYS:
            return {
                ...state,
                    newHabitDayly: action.value.newValue,
                    newHabitButtons: action.newHabitButtons
            };
        case actionTypes.CHANGE_HABIT_TYPE:
            return {
                ...state,
                    newHabitType: action.value.newValue,
                    newHabitButtons: action.newHabitButtons
                };
        case actionTypes.CREATE_NEW_HABIT:
            return {
                ...state,
                    habits: [action.newHabit].concat(state.habits)
                };
        default: 
            return state;
    }
};

export default reducer;