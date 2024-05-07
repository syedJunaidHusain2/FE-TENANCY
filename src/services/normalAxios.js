import axios from 'axios'
import {DevConfig} from '../constants/constants'

const normalAxios = axios.create({
    timeout: 60000,
})

normalAxios.interceptors.request.use((config) => {
    DevConfig.ENABLE_CONSOLE_LOGS &&
        console.log(
            `%c API REQUEST FOR : ${config?.url} `,
            'background: #222; color: #FFFF00',
            config
        )
    return config
})

normalAxios.interceptors.response.use(
    (res) => {
        DevConfig.ENABLE_CONSOLE_LOGS &&
            console.log(
                `%c API SUCCESS RESPONSE FOR : ${res?.config?.url} `,
                'background: #222; color: #00FF00',
                res
            )
        return res?.data
    },
    (error) => {
        DevConfig.ENABLE_CONSOLE_LOGS &&
            console.log(
                `%c API ERROR RESPONSE FOR : ${error?.config?.url} `,
                'background: #222; color: #FF0000',
                error?.response
            )
        return Promise.reject(error?.response)
    }
)

export default normalAxios
