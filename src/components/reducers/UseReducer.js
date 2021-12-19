export const initialState = {
    showLogin: true,
    loginState: false
};

export const reducer = (state, action) => {

    if(action.type === "AUTH"){
        return {
            ...state,
            loginState: action.loginState
        }
    }
    if(action.type === "HOMEPAGE"){
    console.log(action.type)

        return {
            ...state,
            showLogin: action.showLogin
        }
    }

    return state;
}

