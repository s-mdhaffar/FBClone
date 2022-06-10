const AuthReducer = (state, { type, payload }) => {
	switch (type) {
		case 'LOGIN_START':
			return {
				user       : null,
				isFetching : true,
				error      : false
			};

		case 'LOGIN_SUCCESS':
			return {
				user       : payload,
				isFetching : false,
				error      : false
			};

		case 'LOGIN_FAIL':
			return {
				user       : null,
				isFetching : false,
				error      : payload
			};

		case 'FOLLOW':
			return {
				...state,
				user : {
					...state.user,
					followings : [ ...state.user.followings, payload ]
				}
			};

		case 'UNFOLLOW':
			return {
				...state,
				user : {
					...state.user,
					followings : state.user.followings.filter((following) => following !== payload)
				}
			};
		default:
			return state;
	}
};

export default AuthReducer;
