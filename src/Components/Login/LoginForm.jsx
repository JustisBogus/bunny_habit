import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderField } from '../../form';
import { connect } from 'react-redux';
import { userLoginAttempt } from '../../store/actions/auth';

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userLoginAttempt 
};

class LoginForm extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token) {
            if (prevProps.token !== this.props.token) {
                console.log('logged in');
            }
        }
    }

    onSubmit(values) {
        console.log(values);
        return this.props.userLoginAttempt(
            values.username,
            values.password
        );
    }

    render() {

        const { handleSubmit, error } = this.props;

        return (<div>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="username" label="Username" type="text" component={renderField} />
                <Field name="password" label="Password" type="password" component={renderField} />
                <button type="submit">Log In</button>
            </form>
        </div>)
    }
}

export default reduxForm({
    form: 'LoginForm'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));