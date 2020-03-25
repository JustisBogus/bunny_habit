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
import { click, setHabitCompleted, showNewHabit, habitsListFetch, addNewCompletedHabit } from '../../store/actions/habits';

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
        onHabitsListFetch: () => dispatch(habitsListFetch()),
        onAddNewCompletedHabit: (newCompletedHabit, updatedHabits) => dispatch(addNewCompletedHabit(newCompletedHabit, updatedHabits))
    }
}

class HabitsContainer extends Component {

    componentDidMount() {
        this.props.onHabitsListFetch();
       // this.interval = setInterval(() => this.setState({ time: Date.now() }), 3600000);
    }
    
    handleButtonClick = (id) => {
        if (id === 3) {   
            this.props.onShowNewHabit(true);
        }
    }

    handleHabitClick = (id, completed) => {
        //const date = new Date(this.props.habits[1].createdDate).getDate();
        let habits = [...this.props.habits]
        if(!completed) {
            const updatedHabit = habits.find(habit => habit.id === id);
            updatedHabit.completed = true;
            const newCompletedHabit = {
                id: updatedHabit.id,
                habit: updatedHabit.habit,
                title: "⌒(｡･.･｡)⌒",
                comment: updatedHabit.comment,
                date: new Date(),
                type: updatedHabit.type,
                successive: 1
            }
            this.props.onAddNewCompletedHabit(newCompletedHabit, habits);
        }
    }
    

    render() {

        const { isFetching, habits } = this.props; 

        let newHabit;

        if (this.props.showNewHabit) {
            newHabit = <NewHabit/>
        }

        let habitsDo = habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitDo
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });

        let habitsDont = habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitDont
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });

        let habitsGoals = habits
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

        const loader = (
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