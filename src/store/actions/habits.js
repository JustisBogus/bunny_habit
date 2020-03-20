import { CLICK, HABITS_LIST_RECEIVED, HABITS_LIST_ERROR, SHOW_NEW_HABIT, 
    HIDE_NEW_HABIT, ADD_NEW_HABIT_INPUT, SHOW_NEW_HABIT_BUTTONS, 
    SET_HABIT_COMPLETED, INCREASE_DAYS, CHANGE_HABIT_TYPE, CREATE_NEW_HABIT, HABITS_LIST_REQUEST 
    } from './actionTypes';
import { requests } from '../../agent';

export const click = (buttonClicked) => {
    return {
        type: CLICK,
        buttonClicked
    };
};

export const habitsListRequest = () => ({
    type: HABITS_LIST_REQUEST,
});

export const habitsListError = (error) => ({
    type: HABITS_LIST_ERROR,
    error
});

export const habitsListReceived = (data) => ({
    type: HABITS_LIST_RECEIVED,
    data
});

export const habitsListFetch = () => {
    return (dispatch) => {
        dispatch(habitsListRequest());
        return requests.get('/')
            .then(response => dispatch(habitsListReceived(response)))
            .catch(error => dispatch(habitsListError(error)));
    }
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
        return (dispatch) => {
            return requests.post('/habit/add', {
                id: newHabit.id,
                habit: newHabit.habit,
                dayly: newHabit.dayly,
                type: newHabit.type,
                comment: newHabit.comment,
                created_date: newHabit.created_date,
                modified_date: newHabit.modified_date,
                completed: newHabit.completed  
    })
    .then(dispatch(createNewHabit(newHabit))) 
    .catch(error => {
        console.log(error)
    }
    )};
}

export const createNewHabit = (newHabit) => {
    return {
        type: CREATE_NEW_HABIT,
        newHabit
    };
};