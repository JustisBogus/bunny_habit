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
import { click, setHabitCompleted, showNewHabit, habitsListFetch, addNewCompletedHabit,
     resetHabits, resetHabit } from '../../store/actions/habits';

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
        onAddNewCompletedHabit: (newCompletedHabit, updatedHabits) => dispatch(addNewCompletedHabit(newCompletedHabit, updatedHabits)),
        onResetHabits: (habits) => dispatch(resetHabits(habits)),
        onResetHabit: (habits) => dispatch(resetHabit(habits)),
    }
}

class HabitsContainer extends Component {

    componentDidMount() {
        //console.log(window.localStorage.getItem('jwtToken'));
        this.props.onHabitsListFetch();
        this.interval = setInterval(() => {
            let date = new Date();
            if (date.getHours() === 0 && date.getMinutes() === 0) {
                this.props.onResetHabits(this.props.habits);
            }
        }, 60000);
    }
    
    handleButtonClick = (id) => {
        if (id === 3) {   
            this.props.onShowNewHabit(true);
        }
        if (id === 2) {
            const { habits } = this.props;
            for (let i=0; i<habits.length; i++) {
                habits[i].completed = false;
                habits[i].dateModified = new Date()
            }
            this.props.onResetHabit(habits);
            this.props.onResetHabits(habits);
        }
        if (id === 1) {
            const day = new Date().getDate();
            const { habits } = this.props;
            const olderHabits = habits.filter(habit => {
               return (new Date(habit.modifiedDate).getDate() < day)
            });
            console.log(day);
            console.log(habits);
            console.log(olderHabits);
        }
    }

    handleHabitClick = (id, completed) => {
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
       
        let habitsDo;
        let habitsDont;
        let habitsGoals;
        
        if (habits){
            habitsDo = habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitDo
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });

            habitsDont = habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitDont
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });

            habitsGoals = habits
            .sort((a, b) => a.id < b.id)
            .map(habit => {
                return <HabitGoals
                    key={habit.id}
                    habit={habit}
                    onClick={this.handleHabitClick}
                />
            });
        }

        if (!habits) {
            habitsDo = <div>Start creating new habits</div>
            habitsDont = <div>Start creating new habits</div>
            habitsGoals = <div>Start creating new habits</div>
        }
       
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