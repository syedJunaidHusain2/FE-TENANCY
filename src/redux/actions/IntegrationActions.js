import {sendDataToReducer} from '../../helpers/CommonHelpers'
import {getIntegrationListService} from '../../services/Services'
import {SET_INTEGRATION_LIST} from '../reducers/IntegrationReducer'

// Change Flag
export const getIntegratioListnAction = () => (dispatch) =>
    new Promise((resolve, reject) => {
        getIntegrationListService()
            .then((res) => {
                sendDataToReducer(dispatch, SET_INTEGRATION_LIST, res?.data)
                resolve(res?.data)
            })
            .catch((e) => {
                reject(e)
            })
    })
