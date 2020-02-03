import React from 'react';

const habbit = (props) => (
<div className={props.habit.completed ? 
    "habit-habitContainer-completed" 
    : (!props.habit.completed && props.habit.dayly > 1 ? 
    "habit-habitContainer" 
    : "habit-habitContainer-today")}>
        {props.habit.habit} 
        <span className="habit-check">{props.habit.completed ? "✔" : null}</span>
        <span className="habit-days">{(props.habit.dayly > 1 && !props.habit.completed) ? 
            props.habit.dayly : null} </span>
    </div>
);

export default habbit;