import {createSlice} from '@reduxjs/toolkit'

export const AuthInitialState = {
    activeRole: null,
    token: null,
    isLoggedIn: false,
    userData: null,
    companyProfile: null,
    accessRights: null,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: AuthInitialState,
    reducers: {
        SET_TOKEN: (state, action) => {
            state.token = action.payload
        },
        SET_ACTIVE_ROLE: (state, action) => {
            state.activeRole = action.payload
        },

        USER_IS_LOGGED_IN: (state, action) => {
            state.isLoggedIn = action.payload
        },
        SET_USER_DATA: (state, action) => {
            state.userData = action.payload
        },
        SET_ACCESS_RIGHTS: (state, action) => {
            state.accessRights = action.payload
        },
    },
})

const {actions, reducer: AuthReducer} = AuthSlice

export const {SET_TOKEN, USER_IS_LOGGED_IN, SET_ACTIVE_ROLE, SET_ACCESS_RIGHTS, SET_USER_DATA} =
    actions

export default AuthReducer
