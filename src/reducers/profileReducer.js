//Reducer

const initialState={
    why:"Why are you not showing",
}
//I can't pass parameter userProfile to here
const profileReducer = (state = initialState, action, PROFILEHERE) => {
    switch(action.type){
      case "LOGIN_USER":
        return {...state, currentNow: PROFILEHERE, currentProfile:"Home"}; //...state, currentUser:"Hello"
      default:
        return state;
    }
}

export default profileReducer