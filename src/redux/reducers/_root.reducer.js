import { combineReducers } from 'redux';
import pictureReducer from './pic.reducer';

const rootReducer = combineReducers({
    pictureReducer,
});

export default rootReducer;