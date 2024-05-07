import {createSlice} from '@reduxjs/toolkit'

export const PermissionsInitialState = {
    permissionGroupList: [],
    permissionPoliciesList: [],
    permissionGroupPolicyList: [],
}

const PermissionsSlice = createSlice({
    name: 'permissions',
    initialState: PermissionsInitialState,
    reducers: {
        SET_PERMISSION_GROUP_LIST: (state, action) => {
            state.permissionGroupList = action.payload
        },
        SET_PERMISSION_POLICIES_LIST: (state, action) => {
            state.permissionPoliciesList = action.payload
        },
        SET_PERMISSION_GROUP_POLICY_LIST: (state, action) => {
            state.permissionGroupPolicyList = action.payload
        },
    },
})

const {actions, reducer: PermissionsReducer} = PermissionsSlice

export const {
    SET_PERMISSION_GROUP_LIST,
    SET_PERMISSION_GROUP_POLICY_LIST,
    SET_PERMISSION_POLICIES_LIST,
} = actions

export default PermissionsReducer
