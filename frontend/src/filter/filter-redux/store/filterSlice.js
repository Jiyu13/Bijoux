// 2. Defining the Slice (Actions and Reducers)

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    Sort: false,
    Collections: false,
    Material: false,
}

// createSlice accepts a single configuration obj parameter,
const filterSlice = createSlice({
    // a name of the slice, used as a prefix for the generated action type
    name: "filters",
    // the initial of the slice, state for the reducer, used when the app is initialized
    initialState,
    // an object of "case reducers", key names will be used to generate actions,
    reducers: {
        // reducer function within "reducers" obj, it takes 2 params
        toggleFilter: (state, action) => {
            // update the state, action.payload contains the name of the filter to be toggled
            // access the filter in the state using state[action.payload]
            // !state[action.payload]: toggle its value
            state[action.payload] = !state[action.payload]
        }
    }
})

// destructure "toggleFilter" from "filterSlice.actions",
export const { toggleFilter } = filterSlice.actions

// export the generated reducer, it will be used to handle actions related to this slice of the state in Redux store
export default filterSlice.reducer


