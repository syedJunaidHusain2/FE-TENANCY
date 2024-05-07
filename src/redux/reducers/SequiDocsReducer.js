import {createSlice} from '@reduxjs/toolkit'

export const SequiDocsInitialState = {
    templateCategories: [],
}

const SequiDocsSlice = createSlice({
    name: 'SequiDocs',
    initialState: SequiDocsInitialState,
    reducers: {
        SET_TEMPLATE_CATEGORIES: (state, action) => {
            state.templateCategories = action.payload
        },
    },
})

const {actions, reducer: SequiDocsReducer} = SequiDocsSlice

export const {SET_TEMPLATE_CATEGORIES} = actions

export default SequiDocsReducer
