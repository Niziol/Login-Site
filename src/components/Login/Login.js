import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { reducerActions } from '../../types/Enum';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

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

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking validity');
			setFormIsValid(emailIsValid && passwodIsValid);
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
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else if (!passwodIsValid) {
			passwordInputRef.current.focus();
		} else {
			console.log('Validation error!');
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id="email"
					label="E-Mail"
					type="email"
					isValid={emailState.isValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					id="password"
					label="Password"
					type="password"
					isValid={passwordState.isValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
