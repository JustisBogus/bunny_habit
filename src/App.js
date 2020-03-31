import React from 'react';
import Main from './Components/Main';
import LoginForm from './Components/Login/LoginForm';
import './App.css';
import { requests } from './agent';
import { connect } from 'react-redux';
import { userProfileFetch } from './store/actions/auth';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = {
  userProfileFetch
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('jwtToken');

    if (token) {
      requests.setToken(token);
    }
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props

    if (prevProps.userId !== userId && userId !== null) {
      //userProfileFetch(userId);
    }
  }

  render () {

    let content;
    let { isAthenticated } = this.props;

    if (isAthenticated) {
      content = <LoginForm/>
    }
    if (!isAthenticated) {
      content = <Main/>
    }

    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
