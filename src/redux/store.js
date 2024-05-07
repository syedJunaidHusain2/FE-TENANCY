import {configureStore} from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import {logger} from 'redux-logger'
import rootReducer from './reducers/rootReducer'
import ReduxPersistConfig from './persist/ReduxPersistConfig'
import {DevConfig} from '../constants/constants'

const persistedReducer = persistReducer(ReduxPersistConfig, rootReducer)

const bindMiddleware = (getDefaultMiddleware) => {
    const middleware = [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            warnTimeout: 100,
        }),
    ]

    if (DevConfig.ENABLE_CONSOLE_LOGS) {
        middleware.push(logger)
    }

    return middleware
}

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => bindMiddleware(getDefaultMiddleware),
})

const persistor = persistStore(store)

export {store, persistor}

// import {configureStore} from '@reduxjs/toolkit'
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist'
// import {logger} from 'redux-logger'
// import rootReducer from './reducers/rootReducer'
// import ReduxPersistConfig from './persist/ReduxPersistConfig'
// import {DevConfig} from '../constants/constants'

// const persistedReducer = persistReducer(ReduxPersistConfig, rootReducer)

// const bindMiddleware = (getDefaultMiddleware) => {
//     if (DevConfig.ENABLE_CONSOLE_LOGS)
//         return getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }).concat(logger)
//     return getDefaultMiddleware({
//         serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]},
//     })
// }

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: bindMiddleware,
// })

// const persistor = persistStore(store)

// export {store, persistor}
