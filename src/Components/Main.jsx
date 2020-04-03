import React, { Component } from 'react';
import './Main.scss';
import HabitsContainer from './Habits/HabitsContainer';
import CalendarContainer from './Calendar/CalendarContainer';
import LoginForm from './Login/LoginForm';
import { connect } from 'react-redux';
import { requests } from '../agent';
import { click } from '../store/actions/habits';
import { userProfileFetch, userSetId, userProfileError } from '../store/actions/auth';


const mapStateToProps = state => ({
    ...state.auth
  });
  
  const mapDispatchToProps = {
    userProfileFetch,
    userSetId,
    click
  }

class Main extends Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

    if (token) {
      requests.setToken(token);
    }
}

    componentDidMount() {
        document.body.style.background = "#eee";
        const userId = window.localStorage.getItem('userId');
        const { userSetId } = this.props;

        if (userId) {
            //userSetId(userId);
        }
    }

    componentDidUpdate(prevProps) {
        const { userId, userData, userProfileFetch } = this.props

        if (prevProps.userId !== userId && userId !== null && userData === null) {
            //userProfileFetch(userId);
        }
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
        this.props.click(buttonClicked);
    }
    
    render() {

        let content;
        let { isAuthenticated, userData } = this.props;

        if (!isAuthenticated) {
            content = <LoginForm/>
          }
          if (isAuthenticated) {
            content = ( <React.Fragment>
                <HabitsContainer/>
                <CalendarContainer/>
            </React.Fragment>  
            )
          }

        return (
            <div>
                <div className="button" onClick={() => this.toggleClick()}>Click</div>
                <div className="main-contentContainer">
                    {content}
                </div>
            </div>
        );
    }
}

// #1e1e1e; #2d2d2d;

export default connect(mapStateToProps, mapDispatchToProps)(Main);