import {combineReducers} from '@reduxjs/toolkit'
import AuthReducer from './AuthReducer'
import {RESET_STORE} from '../types/ReduxTypes'
import AppDefaultReducer from '../defaults/AppDefaultReducer'
import SettingReducer from './SettingReducer'
import IntegrationReducer from './IntegrationReducer'
import SequiDocsReducer from './SequiDocsReducer'
import RequestApprovalReducer from './RequestApprovalReducer'
import PermissionsReducer from './PermissionsReducer'
import DashboardReducer from './DashboardReducer'

const appReducer = combineReducers({
    auth: AuthReducer,
    sequiDocs: SequiDocsReducer,
    setting: SettingReducer,
    integration: IntegrationReducer,
    requestApproval: RequestApprovalReducer,
    permissions: PermissionsReducer,
    dashboard: DashboardReducer,
})

export default function rootReducer(state, action) {
    let finalState = appReducer(state, action)
    if (action.type == RESET_STORE) {
        const defaultReducer = {...AppDefaultReducer, setting: finalState.setting}
        finalState = defaultReducer
    }
    return finalState
}
