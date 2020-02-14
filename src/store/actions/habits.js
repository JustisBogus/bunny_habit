import { CLICK, SHOW_NEW_HABIT, HIDE_NEW_HABIT, ADD_NEW_HABIT_INPUT, 
    SHOW_NEW_HABIT_BUTTONS, SET_HABIT_COMPLETED, INCREASE_DAYS, 
    CHANGE_HABIT_TYPE, ADD_NEW_HABIT } from './actionTypes';

export const click = (buttonClicked) => {
    return {
        type: CLICK,
        buttonClicked
    };
};

export const newHabitInput = (newHabit) => {
    return {
        type: ADD_NEW_HABIT_INPUT,
        newHabit
    };
};

export const showNewHabitButtons = (showButtons) => {
    return {
        type: SHOW_NEW_HABIT_BUTTONS,
        showButtons
    };
};

export const showNewHabit = (showNewHabitInput) => {
    return {
        type: SHOW_NEW_HABIT,
        showNewHabitInput
    };
};

export const hideNewHabit = (hideNewHabitInput) => {
    return {
        type: HIDE_NEW_HABIT,
        hideNewHabitInput
    };
};

export const setHabitCompleted = (habit) => {
    return {
        type: SET_HABIT_COMPLETED,
        habit
    };
};

export const increaseDays = (value, newHabitButtons) => {
    return {
        type: INCREASE_DAYS,
        value,
        newHabitButtons
    };
};

export const changeHabitType = (value, newHabitButtons) => {
    return {
        type: CHANGE_HABIT_TYPE,
        value,
        newHabitButtons
    };
};

export const addNewHabit = (newHabit) => {
    return {
        type: ADD_NEW_HABIT,
        newHabit
    };
};