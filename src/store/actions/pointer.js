export const NEW_POINTER = 'NEW_POINTER';
export const SET_NAME = 'SET_NAME';
export const SELECT_POINTER = 'SELECT_POINTER';
export const EDIT_POINTER = 'EDIT_POINTER';
export const DELETE_POINTER = 'DELETE_POINTER';

export const newPointer = (x,y) => ({
    type: NEW_POINTER,
    pointer: getNewPointer(x,y)
});

export const setName = (id, name) => ({
    type: SET_NAME,
    id: id,
    name: name ? name : 'Unnamed'
});

export const selectPointer = id => ({
    type: SELECT_POINTER,
    id: id
});

export const editPointer = id => ({
    type: EDIT_POINTER,
    id: id
});

export const deletePointer = id => ({
    type: DELETE_POINTER,
    id: id
});

function getNewPointer(x,y){
    return {
        id: "" + x + y,
        x: x,
        y: y,
        name: "Unnamed",
        selected: false,
        active: true
    }
}