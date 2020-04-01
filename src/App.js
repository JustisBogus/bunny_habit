import React from 'react';
import Main from './Components/Main';
import LoginForm from './Components/Login/LoginForm';
import './App.css';
import { requests } from './agent';
import { connect } from 'react-redux';
import { userProfileFetch, userSetId, userProfileError } from './store/actions/auth';

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = {
  userProfileFetch,
  userSetId
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('jwtToken');

    if (token) {
      requests.setToken(token);
    }
  }

  componentDidMount() {
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

  render () {

    let content;
    let { isAuthenticated, userData } = this.props;
    let token = window.localStorage.getItem('jwtToken');

    if (!isAuthenticated) {
      content = <LoginForm/>
    }
    if (isAuthenticated) {
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
