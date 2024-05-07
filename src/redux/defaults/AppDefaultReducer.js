import {AuthInitialState} from '../reducers/AuthReducer'
import {IntegrationInitialState} from '../reducers/IntegrationReducer'
import {PermissionsInitialState} from '../reducers/PermissionsReducer'
import {RequestApprovalInitialState} from '../reducers/RequestApprovalReducer'
import {SequiDocsInitialState} from '../reducers/SequiDocsReducer'
import {SettingInitialState} from '../reducers/SettingReducer'

const AppDefaultReducer = {
    auth: AuthInitialState,
    setting: SettingInitialState,
    sequiDocs: SequiDocsInitialState,
    integration: IntegrationInitialState,
    requestApproval: RequestApprovalInitialState,
    permissions: PermissionsInitialState,
}

export default AppDefaultReducer
