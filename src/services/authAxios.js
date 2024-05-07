/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import axios from 'axios'
import {BASE_URL, DevConfig} from '../constants/constants'
import {logoutAction} from '../redux/actions/AuthActions'
import {getTokenSelector} from '../redux/selectors/AuthSelectors'
import {store} from '../redux/store'

const authAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
})

authAxios.interceptors.request.use(async (config) => {
    const state = store.getState()
    const token = getTokenSelector(state)
    config.headers['Authorization'] = `Bearer ${token}`
    if (DevConfig.ENABLE_CONSOLE_LOGS)
        console.log(
            `%c API REQUEST FOR : ${config?.url} `,
            'background: #222; color: #FFFF00',
            config
        )
    return config
})

authAxios.interceptors.response.use(
    (res) => {
        if (DevConfig.ENABLE_CONSOLE_LOGS)
            console.log(
                `%c API SUCCESS RESPONSE FOR : ${res?.config?.url} `,
                'background: #222; color: #00FF00',
                res
            )
        return Promise.resolve(res?.data)
    },
    async (error) => {
        if (DevConfig.ENABLE_CONSOLE_LOGS)
            console.log(
                `%c API ERROR RESPONSE FOR : ${error?.config?.url} `,
                'background: #222; color: #FF0000',
                error?.response ?? error
            )
        if (error?.response?.status === 401) store.dispatch(logoutAction(true))
        return Promise.reject(error?.response)
    }
)

export default authAxios
