export const newHabitButtonFunctionDayly = (value) => {
    let newValue;
    let newText;
        if (value === 7) {
        newValue = 1;
        }
        else {
        newValue = value + 1;
        }
        if (newValue === 1) {
        newText = "dayly";
        }
        if (newValue === 7) {
        newText = "weekly";
        } 
        if (newValue === 2 || newValue === 3 || newValue === 4 || newValue === 5 || newValue === 6) {
        newText = ("7 / " + newValue);
        }
    return ({
        newValue,
        newText
    });
}

export const newHabitButtonFunctionType = (value) => {
    let newValue;
    let newText;
        if (value === 3) {
            newValue = 1
        }
        else {
            newValue = value + 1
        }
        if (newValue === 1) {
            newText = "do"
        }
        if (newValue === 2) {
            newText = "don't"
        }
        if (newValue === 3) {
            newText = "goal"
        }
    return ({
        newValue,
        newText
    });    
}