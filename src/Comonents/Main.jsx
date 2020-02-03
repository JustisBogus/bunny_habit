import React, { Component } from 'react';
import './Main.scss';
import HabitsContainer from './Habits/HabitsContainer';
import CalendarContainer from './Calendar/CalendarContainer';
import { connect } from 'react-redux';
import { click } from '../store/actions/habits';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        };

    }

    toggleClick() {
        let buttonClicked = this.props.clicked;
        if (buttonClicked) {
            buttonClicked = false
            document.body.style.background = "#eee"
        } else {
            buttonClicked = true;
            document.body.style.background = "#121212"
        }
        this.props.onButtonClicked(buttonClicked);
    }
        
    render() {

        return (
            <div>
                <div className="button" onClick={() => this.toggleClick()}>Click</div>
                <div className="main-contentContainer">
                    <HabitsContainer/>
                    <CalendarContainer/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clicked: state.habits.clicked
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClicked: (buttonClicked) => dispatch(click(buttonClicked))
    }
}
// #1e1e1e; #2d2d2d;

export default connect(mapStateToProps, mapDispatchToProps)(Main);