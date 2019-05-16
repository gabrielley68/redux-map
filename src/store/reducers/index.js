import {connectRouter} from "connected-react-router";
import {combineReducers} from 'redux'
import {text} from './text';
import {pointer} from './pointer';

export default (history) => combineReducers({
    text,
    pointer,
    router: connectRouter(history)
})