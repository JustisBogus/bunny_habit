import { CLICK, HABITS_LIST_REQUEST, HABITS_LIST_RECEIVED, HABITS_LIST_ERROR, 
            COMPLETED_HABITS_LIST_REQUEST, COMPLETED_HABITS_LIST_RECEIVED, COMPLETED_HABITS_LIST_ERROR,
            SHOW_NEW_HABIT, HIDE_NEW_HABIT, ADD_NEW_HABIT_INPUT, SHOW_NEW_HABIT_BUTTONS, 
            SET_HABIT_COMPLETED, INCREASE_DAYS, CHANGE_HABIT_TYPE, RESET_HABIT, CREATE_NEW_HABIT,
            CREATE_NEW_COMPLETED_HABIT,
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

/*
export const filterOldHabits = (response) => {
        const olderHabits = response.filter(
            habit => {
                return new Date(habit.modifiedDate).getDate() < new Date().getDate()
        });
    return resetOldHabits(olderHabits);
}

export const resetOldHabits = (habits) => {
    return (dispatch) => {
        for (let i=0; i<habits.length; i++) {
            requests.put(`/habit/update/${habits[i].id}`, {
                completed: false,
                modified_date: new Date()
            })
        };
    };
}
*/

export const habitsListFetch = () => {
    return (dispatch) => {
        dispatch(habitsListRequest());
        return requests.get(`/`)
            .then(response => dispatch(habitsListReceived(response)))
            .catch(error => dispatch(habitsListError(error)));
    }
};

export const completedHabitsListRequest = () => ({
    type: COMPLETED_HABITS_LIST_REQUEST,
});

export const completedHabitsListError = (error) => ({
    type: COMPLETED_HABITS_LIST_ERROR,
    error
});

export const completedHabitsListReceived = (data) => ({
    type: COMPLETED_HABITS_LIST_RECEIVED,
    data
});

export const completedHabitsListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(completedHabitsListRequest());
        return requests.get(`/completed?page=${page}`)
            .then(response => dispatch(completedHabitsListReceived(response.data)))
            .catch(error => dispatch(completedHabitsListError(error)));
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

export const addNewCompletedHabit = (newCompletedHabit, updatedHabits) => {
    return (dispatch) => {
        return requests.post('/completed/add', {
            id: newCompletedHabit.id,
            habit: newCompletedHabit.habit,
            title: newCompletedHabit.title,
            comment: newCompletedHabit.comment,
            date: newCompletedHabit.date,
            type: newCompletedHabit.type,
            successive: newCompletedHabit.successive
        })
        .then(dispatch(setHabitCompleted(updatedHabits)))
        .then(dispatch(createNewCompletedHabit(newCompletedHabit)))
        .then(dispatch(updateHabitCompleted(newCompletedHabit.id)))
        .catch(error => {
            console.log(error)
        })
    }
}

export const createNewCompletedHabit = (newCompletedHabit) => {
    return {
        type: CREATE_NEW_COMPLETED_HABIT,
        newCompletedHabit
    }
}

export const updateHabitCompleted = (id) => {
    return () => {
        return requests.put(`/habit/update/${id}`, {
            completed: true,
            modified_date: new Date()
        });
    }
    
}

export const setHabitCompleted = (updatedHabits) => {
    return {
        type: SET_HABIT_COMPLETED,
        updatedHabits
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

export const resetHabits = (habits) => {
    return (dispatch) => {
        for (let i=0; i<habits.length; i++) {
            requests.put(`/habit/update/${habits[i].id}`, {
                completed: false,
                modified_date: new Date()
            })
        };
    };
}

export const resetHabit = (habits) => {
    return {
        type: RESET_HABIT,
        habits    
    };
}

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