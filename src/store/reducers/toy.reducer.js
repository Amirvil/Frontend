export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOYS = 'REMOVE_TOYS'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

const initialState = {
    toys: []
}

export function toyReducer(state = initialState, action) {
    let toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOYS:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        default:
            return state
    }
}