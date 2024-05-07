import {createSlice} from '@reduxjs/toolkit'

export const RequestApprovalInitialState = {
    requestList: [],
    approvalList: [],
    adjustmentType: [],
}

const RequestApprovalSlice = createSlice({
    name: 'requestApproval',
    initialState: RequestApprovalInitialState,
    reducers: {
        SET_ADJUSTMENT_TYPE: (state, action) => {
            state.adjustmentType = action.payload
        },
        SET_REQUEST_LIST: (state, action) => {
            state.requestList = action.payload
        },
        SET_APPROVAL_LIST: (state, action) => {
            state.approvalList = action.payload
        },
    },
})

const {actions, reducer: RequestApprovalReducer} = RequestApprovalSlice

export const {SET_REQUEST_LIST, SET_ADJUSTMENT_TYPE, SET_APPROVAL_LIST} = actions

export default RequestApprovalReducer
