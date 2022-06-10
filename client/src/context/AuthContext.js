import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
	user       : JSON.parse(localStorage.getItem('user')) || null,
	// user       : {
	// 	_id            : '61efffe80bf8ad3fc10b1d07',
	// 	userName       : 'Sami',
	// 	email          : 'sami@gmail.com',
	// 	isAdmin        : false,
	// 	profilePicture : 'person/1.jpg',
	// 	coverPicture   : '',
	// 	followers      : [],
	// 	followings     : []
	// },
	isFetching : false,
	error      : false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(AuthReducer, INITIAL_STATE);

	useEffect(
		() => {
			localStorage.setItem('user', JSON.stringify(state.user));
		},
		[ state.user ]
	);

	return (
		<AuthContext.Provider
			value={{
				user       : state.user,
				isFetching : state.isFetching,
				error      : state.error,
				dispatch
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
