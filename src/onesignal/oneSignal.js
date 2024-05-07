import OneSignal from 'react-onesignal'
import {ENABLE_ONE_SIGNAL_PUSH_NOTIFICATION, ONE_SIGNAL_APP_ID} from '../constants/constants'

const oneSignal = {
    init: () => {
        if (ENABLE_ONE_SIGNAL_PUSH_NOTIFICATION) {
            OneSignal.init({
                appId: ONE_SIGNAL_APP_ID,
                allowLocalhostAsSecureOrigin: true,
            }).then(() => {
                console.log('One Signal Initiated')
                oneSignal.promptForNotificationPermission()
            })
        }
    },
    promptForNotificationPermission: () => {
        if (ENABLE_ONE_SIGNAL_PUSH_NOTIFICATION) {
            navigator.permissions.query({name: 'notifications'}).then((status) => {
                console.log('OneSignal Notification Status: ', status.state)
                if (['denied', 'prompt'].includes(status?.state)) {
                    OneSignal.showSlidedownPrompt({force: true})
                }
                oneSignal.getPlayerId().then((playerId) => {
                    console.log('OneSignal PlayerID: ', playerId)
                })
            })
        }
    },
    getPlayerId: () =>
        new Promise((resolve, reject) => {
            if (ENABLE_ONE_SIGNAL_PUSH_NOTIFICATION)
                OneSignal.getUserId().then(resolve).catch(reject)
            else resolve('')
        }),
    setExternalUserId: (userIds) => {
        const externalUserId = `${userIds}`
        OneSignal.setExternalUserId(externalUserId)
    },
    removeExternalUserId: () => OneSignal.removeExternalUserId(),
}

export default oneSignal
