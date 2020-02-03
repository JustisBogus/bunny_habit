import React, { useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSpring, animated } from 'react-spring';

const CancelButton = (props) =>  {
    const [state, toggle] = useState(true)
    const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 1000 } })
  return ( 
    <animated.div
        className="cancelButton"
      style={{
        opacity: x.interpolate({ range: [0, 1], output: [1, 1] }),
        transform: x
          .interpolate({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
          })
          .interpolate(x => `scale(${x})`)
      }}>
    <div onClick={() => {toggle(!state); props.onClick();}}>
        <FontAwesomeIcon icon={faTimes}/>
    </div>
    </animated.div>
  )
}
export default CancelButton;