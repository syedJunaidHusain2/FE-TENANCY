import {createSlice} from '@reduxjs/toolkit'

export const IntegrationInitialState = {
    integrationList: [],
}

const IntegrationSlice = createSlice({
    name: 'integration',
    initialState: IntegrationInitialState,
    reducers: {
        SET_INTEGRATION_LIST: (state, action) => {
            state.integrationList = action.payload
        },
    },
})

const {actions, reducer: IntegrationReducer} = IntegrationSlice

export const {SET_INTEGRATION_LIST} = actions

export default IntegrationReducer
