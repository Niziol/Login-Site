import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { reducerActions } from '../../types/Enum';
import AuthContext from '../../store/auth-context';

const emailReducer = (state, action) => {
	switch (action.type) {
		case reducerActions.USER_INPUT:
			return { value: action.value, isValid: action.value.includes('@') };
		case reducerActions.INPUT_BLUR:
			return { value: state.value, isValid: state.value.includes('@') };
		default:
			return { value: '', isValid: false };
	}
};

const passwordReducer = (state, action) => {
	switch (action.type) {
		case reducerActions.USER_INPUT:
			return { value: action.value, isValid: action.value.trim().length > 6 };
		case reducerActions.INPUT_BLUR:
			return { value: state.value, isValid: state.value.trim().length > 6 };
		default:
			return { value: '', isValid: false };
	}
};

const Login = () => {
	const authCtx = useContext(AuthContext);
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwodIsValid } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking validity');
			setFormIsValid(emailState.isValid && passwordState.isValid);
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwodIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({
			type: reducerActions.USER_INPUT,
			value: event.target.value,
		});
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({
			type: reducerActions.USER_INPUT,
			value: event.target.value,
		});
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: reducerActions.INPUT_BLUR });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: reducerActions.INPUT_BLUR });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		authCtx.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
