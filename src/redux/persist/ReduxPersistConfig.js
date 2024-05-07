import storage from 'redux-persist/lib/storage'
const ReduxPersistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'setting', 'integration', 'requestApproval', 'permissions'],
}

export default ReduxPersistConfig
