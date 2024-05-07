/* eslint-disable import/no-unresolved */
import axios from 'axios'
import {BASE_URL, DevConfig} from '../constants/constants'
const withoutAuthAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
        responseType: 'json',
    },
})

withoutAuthAxios.interceptors.request.use((config) => {
    if (DevConfig.ENABLE_CONSOLE_LOGS)
        console.log(
            `%c API REQUEST FOR : ${config?.url} `,
            'background: #222; color: #FFFF00',
            config
        )
    return config
})

withoutAuthAxios.interceptors.response.use(
    (res) => {
        if (DevConfig.ENABLE_CONSOLE_LOGS)
            console.log(
                `%c API SUCCESS RESPONSE FOR : ${res?.config?.url} `,
                'background: #222; color: #00FF00',
                res
            )
        return Promise.resolve(res?.data)
    },
    (error) => {
        if (DevConfig.ENABLE_CONSOLE_LOGS)
            console.log(
                `%c API ERROR RESPONSE FOR : ${error?.config?.url} `,
                'background: #222; color: #FF0000',
                error?.response ?? error
            )
        return Promise.reject(error?.response)
    }
)

export default withoutAuthAxios
