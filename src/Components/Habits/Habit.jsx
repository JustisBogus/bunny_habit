import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const Habbit = (props) => {
    const [state, toggle] = useState(true);
    const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 1000 } })
    return (
<animated.div 
    onClick={() => {toggle(!state); props.onClick(props.habit.id, props.habit.completed)}}
    className={props.habit.completed ? 
    "habit-habitContainer-completed" 
    : (!props.habit.completed && props.habit.dayly > 1 ? 
    "habit-habitContainer" 
    : "habit-habitContainer-today")}
    style={{
        opacity: x.interpolate({ range: [0, 1], output: [1, 1] }),
        transform: x
          .interpolate({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
          })
          .interpolate(x => `scale(${x})`)
        }}>
        {props.habit.habit}
        <span className="habit-check glow-green">{props.habit.completed ? "✔" : null}</span>
        <span className="habit-days glow-green">{(props.habit.dayly > 1 && !props.habit.completed) ? 
            props.habit.dayly : null} </span>
    </animated.div>
    );
}
export default Habbit;