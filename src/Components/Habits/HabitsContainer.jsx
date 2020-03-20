import React, { Component } from 'react';
import '../Main.scss';
import '../Transitions.scss';
import NewHabit from './NewHabit';
import HabitButton from '../Buttons/HabitButton';
import HabitDo from './HabitDo';
import HabitDont from './HabitDont';
import HabitGoals from './HabitGoals';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { click, setHabitCompleted, showNewHabit, habitsListFetch } from '../../store/actions/habits';

const mapStateToProps = state => {
    return {
        ...state.habits   
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onButtonClicked: (buttonClicked) => dispatch(click(buttonClicked)),
        onSetHabitCompleted: (habit) => dispatch(setHabitCompleted(habit)),
        onShowNewHabit: (showNewHabitInput) => dispatch(showNewHabit(showNewHabitInput)),
        onHabitsListFetch: () => dispatch(habitsListFetch())
    }
}

class HabitsContainer extends Component {

    componentDidMount() {
        this.props.onHabitsListFetch();
    }
    
    handleButtonClick = (id) => {
        if (id === 3) {   
            this.props.onShowNewHabit(true);
        } 
    }

    handleHabitClick = (id, completed) => {
        let habits = [...this.props.habits]
        if(!completed) {
            for (var i=0; i < habits.length; i++) {
                if (habits[i].id===id) {
                    habits[i].completed = true;
                    this.props.onSetHabitCompleted(habits);
                }
            }
        }
    }

    render() {

        const { isFetching } = this.props; 

        let newHabit;

        if (this.props.showNewHabit) {
            newHabit = <NewHabit/>
        }

        let habitsDo = this.props.habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitDo
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });

        let habitsDont = this.props.habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitDont
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });

        let habitsGoals = this.props.habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitGoals
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });

        let buttons = this.props.habitButtons.map(button => {
            return <HabitButton
                key={button.id}
                button={button}
                onClick={this.handleButtonClick}
            />
            });

        let loader = (
            <div className="lds-ripple"><div></div><div></div></div>
            );

        return (
            <div className="habitsContainer">
                <div className="habitsContainer-habitButtonContainer">
                    {buttons}
                </div>
                <ReactCSSTransitionGroup
                    transitionName={"fade"}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {newHabit}
                </ReactCSSTransitionGroup>
                <div className="habitsContainer-habitsContainer"> 
                    <div className="habitsContainer-title-first">
                        Do
                    </div>
                    { isFetching ? loader : habitsDo }
                    <div className="habitsContainer-separator glow-white">
                    </div>
                    <div className="habitsContainer-title">
                        Don't
                    </div>
                    { isFetching ? loader : habitsDont}           
                    </div>
                    <div className="habitsContainer-separator glow-white">
                    </div>
                    <div className="habitsContainer-title">
                        Goals
                    </div>
                    { isFetching ? loader : habitsGoals} 
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HabitsContainer);