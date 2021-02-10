import loginReducer from './loginReducer';
import profileReducer from './profileReducer'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    loginReducer : loginReducer,
    profileReducer : profileReducer
})

export default allReducers