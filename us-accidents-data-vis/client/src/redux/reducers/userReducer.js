const INITIAL_STATE = {
    user: 'USA',
password: '',
isLoggedIn: false,
loadingState: 'init',
};
        // action has two things, type and payload
const userReducer = (state = INITIAL_STATE, action) => {
        //type is required
    switch(action. type){
        case 'USER_SET_USER':
            return{
                ...state, // '...' is spread operator, it duplicates/copies
                            // coz React needs to have a different obj in order to know
                user: action.user,
            };
        case 'USER_SET_PASSWORD':
            return{
                ...state, // '...' is spread operator, it duplicates/copies
                            // coz React needs to have a different obj in order to know
                password: action.password,
            };
        case 'USER_SET_IS_LOGGED_IN':
            return{
                ...state, // '...' is spread operator, it duplicates/copies
                            // coz React needs to have a different obj in order to know
                isLoggedIn: action.isLoggedIn,
            };
        case 'USER_SET_LOADING_STATE':
            return{
                ...state, // '...' is spread operator, it duplicates/copies
                            // coz React needs to have a different obj in order to know
                loadingState: action.loadingState,
            };
            
        default:
            return state;        
    }
};

export default userReducer;
