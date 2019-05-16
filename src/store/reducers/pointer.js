import {NEW_POINTER, SET_NAME, SELECT_POINTER, EDIT_POINTER, DELETE_POINTER} from "../actions/pointer";

const initialPointer = {pointers : [], editing: false};

const pointer = (state = initialPointer, action) => {
    switch (action.type) {
        case NEW_POINTER :
            return {
                ...state,
                pointers: [...state.pointers, action.pointer],
                editing: action.pointer.id
            };
        case SET_NAME:
            return {
                ...state,
                pointers: state.pointers.map(item => {
                    if(item.id === action.id){
                        item.name = action.name;
                    }
                    return item;
                }),
                editing: false
            };
        case SELECT_POINTER:
            return {
                ...state,
                pointers: state.pointers.map(item => {
                    if(item.id === action.id){
                        item.selected = !item.selected;
                    } else {
                        item.selected = false;
                    }
                    return item;
                })
            };
        case EDIT_POINTER:
            return {
                ...state,
                editing: action.id
            };
        case DELETE_POINTER:
            return {
                ...state,
                pointers: state.pointers.map(item => {
                    if(item.id === action.id){
                        item.active = false
                    }
                    return item;
                }),
                editing: false
            };
        default:
            return state
    }
};

export const getPointers = state => state.pointer.pointers;
export const isEditing = state => !!state.pointer.editing;
export const getCurrentPointerId = state => !state.pointer.editing ? null : state.pointer.editing;

export {pointer}