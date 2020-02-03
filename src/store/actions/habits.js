import { CLICK, SHOW_NEW_HABIT, ADD_NEW_HABIT_INPUT, SHOW_NEW_HABIT_BUTTONS } from './actionTypes';

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